export declare class CreateConfigurationDto {
    libraryTitle: string;
    description: string;
    email: string;
    contactNumber: string;
    openingDays: string[];
    openingTime: string;
    closingTime: string;
    maxBooksPerUser: number;
    borrowDurationDays: number;
    finePerDay: number;
    isActive: boolean;
}
export declare class UpdateConfigurationDto extends CreateConfigurationDto {
}
