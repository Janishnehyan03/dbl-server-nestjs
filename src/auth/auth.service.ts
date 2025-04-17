import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async registerUser(
    username: string,
    refNumber: string,
    password: string,
    role: string,
  ) {
    if (!username || !password || !role || !refNumber) {
      throw new BadRequestException('Please provide all required fields.');
    }

    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      throw new BadRequestException('User already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      username,
      refNumber,
      password: hashedPassword,
      role,
    });
    await user.save();
    return user;
  }

  async loginUser(username: string, password: string) {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is not set.');
    }
    if (!username || !password) {
      throw new UnauthorizedException('Please provide username and password.');
    }

    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password.');
    }

    const token = this.jwtService.sign({
      id: user._id,
      username: user.username,
      role: user.role,
    });

    user.password = '';
    return { token, user };
  }

  async validateUserByToken(token: string) {
    if (!token) {
      throw new BadRequestException('Token is required.');
    }

    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.userModel.findById(decoded.id);
      if (!user) {
        throw new UnauthorizedException('Invalid token.');
      }

      user.password = '';
      return { loggedIn: true, user };
    } catch (error) {
      throw new UnauthorizedException('Invalid token.');
    }
  }
}
