import { Types } from "mongoose";
const { ObjectId } = Types;

export function validateAndParseObjectId(objectId) {
    return ObjectId.isValid(objectId) ? new ObjectId(objectId) : null
}
