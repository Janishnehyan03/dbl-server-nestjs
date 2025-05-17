import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

// Enum for valid roles
enum RoleEnum {
  Student = 'STUDENT',
  Teacher = 'TEACHER',
}

/**
 * Schema for fine settings per role
 */
@Schema({ _id: false, timestamps: false })
export class Fine {
  @Prop({
    type: String,
    required: true,
    enum: RoleEnum,
  })
  role: String;

  @Prop({ required: true, min: 0 })
  amount: number;

  @Prop({ required: true, enum: ['daily', 'weekly'], default: 'daily' })
  period: string;
}

/**
 * Schema for maximum issue limits per role
 */
@Schema({ _id: false, timestamps: false })
export class MaximumIssue {
  @Prop({
    type: String,
    required: true,
    enum: RoleEnum,
  })
  role: String;

  @Prop({ required: true, min: 1 })
  maxCount: number;
}

/**
 * Schema for maximum renewal limits per role
 */
@Schema({ _id: false, timestamps: false })
export class MaximumRenewal {
  @Prop({
    type: String,
    required: true,
    enum: RoleEnum,
  })
  role: String;

  @Prop({ required: true, min: 0 })
  maxRenewals: number;
}

/**
 * Schema for issue policy
 */
@Schema({ _id: false })
export class IssuePolicy {
  @Prop({
    type: [MaximumIssue],
    required: true,
    validate: {
      validator: (issues: MaximumIssue[]) => {
        const roles = issues.map((issue) => issue.role.toString());
        return roles.length === new Set(roles).size; // Ensure unique roles
      },
      message: 'Duplicate roles found in maximumIssues',
    },
  })
  maximumIssues: MaximumIssue[];

  @Prop({ required: true, min: 1 })
  maximumIssueDays: number;
}

/**
 * Schema for renewal policy
 */
@Schema({ _id: false })
export class RenewalPolicy {
  @Prop({
    type: [MaximumRenewal],
    required: true,
    validate: {
      validator: (renewals: MaximumRenewal[]) => {
        const roles = renewals.map((renewal) => renewal.role.toString());
        return roles.length === new Set(roles).size; // Ensure unique roles
      },
      message: 'Duplicate roles found in maximumRenewals',
    },
  })
  maximumRenewals: MaximumRenewal[];

  @Prop({ required: true, min: 1 })
  renewalDays: number;
}

/**
 * Main schema for library settings
 */
@Schema({ collection: 'library_settings', timestamps: true })
export class LibrarySettings extends Document {
  @Prop({ required: true, trim: true, index: true })
  libraryName: string;

  @Prop({ trim: true, default: '' })
  description: string;

  @Prop({
    type: [Fine],
    default: [],
    validate: {
      validator: (fines: Fine[]) => {
        const roles = fines.map((fine) => fine.role.toString());
        return roles.length === new Set(roles).size; // Ensure unique roles
      },
      message: 'Duplicate roles found in fines',
    },
  })
  fines: Fine[];

  @Prop({ type: IssuePolicy, required: true })
  issuePolicy: IssuePolicy;

  @Prop({ type: RenewalPolicy, required: true })
  renewalPolicy: RenewalPolicy;

  @Prop({ default: false })
  isClosed: boolean;
}

// Create schema and add indexes
export const LibrarySettingsSchema =
  SchemaFactory.createForClass(LibrarySettings);

// Add compound index for efficient querying
LibrarySettingsSchema.index({ libraryName: 1, isClosed: 1 });

// Pre-save hook to enforce stricter student policies
LibrarySettingsSchema.pre('save', function (next) {
  const studentIssue = this.issuePolicy.maximumIssues.find(
    (issue) => issue.role.toString() === RoleEnum.Student,
  );
  const teacherIssue = this.issuePolicy.maximumIssues.find(
    (issue) => issue.role.toString() === RoleEnum.Teacher,
  );
  const studentRenewal = this.renewalPolicy.maximumRenewals.find(
    (renewal) => renewal.role.toString() === RoleEnum.Student,
  );
  const teacherRenewal = this.renewalPolicy.maximumRenewals.find(
    (renewal) => renewal.role.toString() === RoleEnum.Teacher,
  );

  if (
    studentIssue &&
    teacherIssue &&
    studentIssue.maxCount > teacherIssue.maxCount
  ) {
    throw new Error(
      'Student max issue count cannot exceed teacher max issue count',
    );
  }

  if (
    studentRenewal &&
    teacherRenewal &&
    studentRenewal.maxRenewals > teacherRenewal.maxRenewals
  ) {
    throw new Error('Student max renewals cannot exceed teacher max renewals');
  }

  next();
});
