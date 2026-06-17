import express from 'express';
import patientService from '../services/patientService.js';
import parseNewPatientEntry from '../utils.js';
import z from 'zod';
const router = express.Router();
router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});
router.get('/:id', (req, res) => {
    const patient = patientService.findPatient(req.params.id);
    if (patient) {
        return res.status(200).json(patient);
    }
    else
        return res.status(404).json({ error: 'Patient not found' });
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = parseNewPatientEntry(req.body);
        const addedPatient = patientService.addPatient(newPatientEntry);
        res.status(200).json(addedPatient);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues });
        }
        else {
            res.status(400).send({ error: 'unknown error' });
        }
    }
});
export default router;
