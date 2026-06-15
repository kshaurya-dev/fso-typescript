import diagnosesService from '../services/diagnosesService.js';
import express from 'express';
const router = express.Router();

router.get('/' , (_req , res)=>{
    res.send(diagnosesService.getDiagnoses());
});

router.post('/' , (_req , res)=>{
    res.send('adding a diagnoses');
});

export default router;
