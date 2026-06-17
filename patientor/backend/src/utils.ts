import  { type NewPatient , Gender } from "./types.js";
import {z} from 'zod';
export const NewPatientSchema = z.object({
    name:z.string(),
    ssn:z.string(),
    dateOfBirth:z.string(),
    occupation:z.string(),
    gender:z.enum(Gender),
});
const parseNewPatientEntry=(object : unknown):NewPatient=>{
    return NewPatientSchema.parse(object);
};
export default parseNewPatientEntry;