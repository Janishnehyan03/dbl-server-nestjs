import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsNumber,
  Min,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

enum RoleEnum {
  Student = 'STUDENT',
  Teacher = 'TEACHER',
}

class FineDto {
  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsEnum(['daily', 'weekly'])
  period: string;
}

class MaximumIssueDto {
  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsNumber()
  @Min(1)
  maxCount: number;
}

class MaximumRenewalDto {
  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsNumber()
  @Min(0)
  maxRenewals: number;
}

class IssuePolicyDto {
  @IsArray()
  @Type(() => MaximumIssueDto)
  maximumIssues: MaximumIssueDto[];

  @IsNumber()
  @Min(1)
  maximumIssueDays: number;
}

class RenewalPolicyDto {
  @IsArray()
  @Type(() => MaximumRenewalDto)
  maximumRenewals: MaximumRenewalDto[];

  @IsNumber()
  @Min(1)
  renewalDays: number;
}

export class CreateLibrarySettingsDto {
  @IsString()
  libraryName: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @Type(() => FineDto)
  fines: FineDto[];

  @Type(() => IssuePolicyDto)
  issuePolicy: IssuePolicyDto;

  @Type(() => RenewalPolicyDto)
  renewalPolicy: RenewalPolicyDto;

  @IsOptional()
  @IsBoolean()
  isClosed?: boolean;
}

export class UpdateLibrarySettingsDto {
  @IsOptional()
  @IsString()
  libraryName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @Type(() => FineDto)
  fines?: FineDto[];

  @IsOptional()
  @Type(() => IssuePolicyDto)
  issuePolicy?: IssuePolicyDto;

  @IsOptional()
  @Type(() => RenewalPolicyDto)
  renewalPolicy?: RenewalPolicyDto;

  @IsOptional()
  @IsBoolean()
  isClosed?: boolean;
}
