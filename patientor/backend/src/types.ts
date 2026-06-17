import { NewPatientSchema } from "./utils.js";
import {z} from 'zod';
export interface Diagnose{
    "code" : string;
    "name":string;
    "latin" ?:string
};
export interface Patient{
    "id":string , 
    "name":string,
    "dateOfBirth":string,
    "ssn":string,
    "gender":string,
    "occupation":string
};
export const Gender={
    Male:'male',
    Female : 'female',
    Other : 'other'
}as const;
export type Gender= typeof Gender[keyof typeof Gender];
export type NewPatient = z.infer<typeof NewPatientSchema>; 
export type nonSensitivePatient=Omit<Patient , 'ssn'>;