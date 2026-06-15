import express from 'express';
import patientService from '../services/patientService.js';
const router = express.Router();
router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});
router.post('/', (_req, res) => {
    res.send('patient added');
});
export default router;
