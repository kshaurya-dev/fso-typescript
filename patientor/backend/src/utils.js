import { z } from "zod";
import { Gender } from "./types.js";
const BaseEntrySchema = z.object({
    description: z.string(),
    date: z.string(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
});
const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.union([
        z.literal(0),
        z.literal(1),
        z.literal(2),
        z.literal(3),
    ]),
});
const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: z.object({
        date: z.string(),
        criteria: z.string(),
    }),
});
const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: z
        .object({
        startDate: z.string(),
        endDate: z.string(),
    })
        .optional(),
});
export const NewEntrySchema = z.discriminatedUnion("type", [
    HealthCheckEntrySchema,
    HospitalEntrySchema,
    OccupationalHealthcareEntrySchema,
]);
export const NewPatientSchema = z.object({
    name: z.string(),
    ssn: z.string(),
    dateOfBirth: z.string(),
    occupation: z.string(),
    gender: z.enum(Gender),
});
export const parseNewEntry = (object) => {
    return NewEntrySchema.parse(object);
};
const parseNewPatientEntry = (object) => {
    return NewPatientSchema.parse(object);
};
export default parseNewPatientEntry;
