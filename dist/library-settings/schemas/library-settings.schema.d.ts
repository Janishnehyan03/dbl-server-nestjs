import { Document, Schema as MongooseSchema } from 'mongoose';
export declare class Fine {
    role: String;
    amount: number;
    period: string;
}
export declare class MaximumIssue {
    role: String;
    maxCount: number;
}
export declare class MaximumRenewal {
    role: String;
    maxRenewals: number;
}
export declare class IssuePolicy {
    maximumIssues: MaximumIssue[];
    maximumIssueDays: number;
}
export declare class RenewalPolicy {
    maximumRenewals: MaximumRenewal[];
    renewalDays: number;
}
export declare class LibrarySettings extends Document {
    libraryName: string;
    description: string;
    fines: Fine[];
    issuePolicy: IssuePolicy;
    renewalPolicy: RenewalPolicy;
    isClosed: boolean;
}
export declare const LibrarySettingsSchema: MongooseSchema<LibrarySettings, import("mongoose").Model<LibrarySettings, any, any, any, Document<unknown, any, LibrarySettings> & LibrarySettings & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LibrarySettings, Document<unknown, {}, import("mongoose").FlatRecord<LibrarySettings>> & import("mongoose").FlatRecord<LibrarySettings> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
