import { Gender } from "./types.js";
import { z } from 'zod';
export const NewPatientSchema = z.object({
    name: z.string(),
    ssn: z.string(),
    dateOfBirth: z.string(),
    occupation: z.string(),
    gender: z.enum(Gender),
});
const parseNewPatientEntry = (object) => {
    return NewPatientSchema.parse(object);
};
export default parseNewPatientEntry;
