import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Patron, PatronDocument } from './patron.schema';

@Injectable()
export class PatronService {
  constructor(
    @InjectModel(Patron.name)
    private readonly patronModel: Model<PatronDocument>,
  ) {}

  // 🔹 Bulk Insert Patrons (Insert Many)
  async createBulk(patrons: {
    type: string;
    data: Partial<Patron>[];
    metadata: any;
  }): Promise<Patron[]> {
    try {
      const patronsToInsert = patrons.data.map((patron) => ({
        ...patron,
        ...patrons.metadata,
      }));
      return (await this.patronModel.insertMany(patronsToInsert)) as Patron[];
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        `Failed to insert patrons: ${error.message}`,
      );
    }
  }

  // 🔹 Find All Patrons (With Optional Filters)
  async findAll(filter: any = {}): Promise<Patron[]> {
    let patrons = await this.patronModel
      .find(filter)
      .populate(['section', 'division', 'department', 'class', 'role'])
      .exec();
    if (!patrons.length) throw new NotFoundException(`No patrons found.`);

    return patrons;
  }

  // 🔹 Find Patron by ID
  async findById(id: string): Promise<Patron> {
    const patron = await this.patronModel
      .findById(id)
      .populate(['section', 'division', 'department', 'class', 'role'])
      .exec();
    if (!patron) throw new NotFoundException(`Patron with ID ${id} not found.`);
    return patron;
  }

  // 🔹 Update Patron by ID
  async update(id: string, updateData: Partial<Patron>): Promise<Patron> {
    const updatedPatron = await this.patronModel
      .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .exec();
    if (!updatedPatron)
      throw new NotFoundException(`Patron with ID ${id} not found.`);
    return updatedPatron;
  }

  async searchPatron(admissionNumber: string): Promise<Patron> {
    if (!admissionNumber?.trim()) {
      throw new BadRequestException('Admission number is required.');
    }

    // Trim and normalize the input
    const normalizedAdmissionNumber = admissionNumber.trim();

    try {
      const patron = await this.patronModel
        .findOne({
          admissionNumber: {
            $regex: new RegExp(`^${normalizedAdmissionNumber}$`, 'i'),
          },
        })
        .populate(['section', 'division', 'department', 'class', 'role'])
        .lean<Patron>()
        .exec();

      if (!patron) {
        throw new NotFoundException(
          `Patron with admission number "${normalizedAdmissionNumber}" not found.`,
        );
      }

      return patron;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error searching for patron');
    }
  }
  // 🔹 Delete Patron by ID
  async delete(id: string): Promise<{ message: string }> {
    const result = await this.patronModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Patron with ID ${id} not found.`);
    return { message: 'Patron deleted successfully' };
  }
}
