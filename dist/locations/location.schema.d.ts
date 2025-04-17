import { Document } from 'mongoose';
export declare class Location extends Document {
    name: string;
    description?: string;
    phone: string;
}
export declare const LocationSchema: import("mongoose").Schema<Location, import("mongoose").Model<Location, any, any, any, Document<unknown, any, Location> & Location & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Location, Document<unknown, {}, import("mongoose").FlatRecord<Location>> & import("mongoose").FlatRecord<Location> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
