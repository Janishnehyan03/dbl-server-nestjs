declare enum RoleEnum {
    Student = "STUDENT",
    Teacher = "TEACHER"
}
declare class FineDto {
    role: RoleEnum;
    amount: number;
    period: string;
}
declare class MaximumIssueDto {
    role: RoleEnum;
    maxCount: number;
}
declare class MaximumRenewalDto {
    role: RoleEnum;
    maxRenewals: number;
}
declare class IssuePolicyDto {
    maximumIssues: MaximumIssueDto[];
    maximumIssueDays: number;
}
declare class RenewalPolicyDto {
    maximumRenewals: MaximumRenewalDto[];
    renewalDays: number;
}
export declare class CreateLibrarySettingsDto {
    libraryName: string;
    description?: string;
    fines: FineDto[];
    issuePolicy: IssuePolicyDto;
    renewalPolicy: RenewalPolicyDto;
    isClosed?: boolean;
}
export declare class UpdateLibrarySettingsDto {
    libraryName?: string;
    description?: string;
    fines?: FineDto[];
    issuePolicy?: IssuePolicyDto;
    renewalPolicy?: RenewalPolicyDto;
    isClosed?: boolean;
}
export {};
