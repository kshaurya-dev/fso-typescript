import express from 'express';
import patientService from '../services/patientService.js';
import parseNewPatientEntry from '../utils.js';
import { parseNewEntry } from '../utils.js';
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
        console.log(req.body);
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
router.post('/:id/entries', (req, res) => {
    try {
        const userId = req.params.id;
        console.log(req.body);
        const entryObject = parseNewEntry(req.body);
        const addedEntry = patientService.addEntry(entryObject, userId);
        res.status(200).json(addedEntry);
    }
    catch (error) {
        if (error instanceof z.ZodError)
            res.status(400).send({ error: error.issues });
        else
            res.status(400).send({ error: 'unknown issue' });
    }
});
export default router;
