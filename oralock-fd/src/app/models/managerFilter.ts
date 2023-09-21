import { ObjectType } from "./objectType";
import { Schema } from "./schema";

export interface ManagerFilter {
    schema: Schema,
    type: ObjectType,
    user: string,
    name: string
}