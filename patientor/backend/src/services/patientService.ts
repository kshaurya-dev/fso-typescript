import patientData from "../../data/patients.js";
import type { Patient , nonSensitivePatient,NewPatient } from "../types.js";
import { v4 as uuidv4 } from 'uuid';
const getPatients = ():Patient[]=>{
    return patientData;
};
const getNonSensitivePatients=():nonSensitivePatient[]=>{
    return patientData.map( ({id,name,dateOfBirth,gender,occupation})=>(
        {
            id,name,dateOfBirth,gender,occupation
        }
    ));
};
const findPatient=(id : string):Patient | undefined=>{
    const patient = patientData.find(p=>p.id===id);
    return patient;
};
const addPatient = (patient : NewPatient)=>{
    const newId= uuidv4();
    const newPatient : Patient ={...patient , id:newId};
    patientData.push(newPatient);
    return newPatient;
};
export default {getPatients , addPatient,getNonSensitivePatients , findPatient};