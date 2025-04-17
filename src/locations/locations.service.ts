import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from './location.schema';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    return this.locationModel.create(createLocationDto);
  }

  async findAll(): Promise<Location[]> {
    return this.locationModel.find().exec();
  }

  async findOne(id: string): Promise<Location> {
    const location = await this.locationModel.findById(id).exec();
    if (!location) throw new NotFoundException('Location not found');
    return location;
  }

  async update(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    const updatedLocation = await this.locationModel
      .findByIdAndUpdate(id, updateLocationDto, { new: true })
      .exec();
    if (!updatedLocation) throw new NotFoundException('Location not found');
    return updatedLocation;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletedLocation = await this.locationModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedLocation) throw new NotFoundException('Location not found');
    return { message: 'Location deleted successfully' };
  }
}
