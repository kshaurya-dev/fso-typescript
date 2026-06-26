import patientData from "../../data/patients.js";
import type { Patient , nonSensitivePatient,NewPatient, EntryWithoutId ,Entry} from "../types.js";
import { v4 as uuidv4 } from 'uuid';
const getPatients = ():Patient[]=>{
    return patientData;
};
const getNonSensitivePatients=():nonSensitivePatient[]=>{
    return patientData.map( ({id,name,dateOfBirth,gender,occupation , entries})=>(
        {
            id,name,dateOfBirth,gender,occupation,entries
        }
    ));
};
const findPatient=(id : string):Patient | undefined=>{
    const patient = patientData.find(p=>p.id===id);
    return patient;
};
const addPatient = (patient : NewPatient)=>{
    const newId= uuidv4();
    const newPatient : Patient ={...patient , id:newId , entries:[]};
    patientData.push(newPatient);
    return newPatient;
};
const addEntry=(entry : EntryWithoutId , userId:string)=>{
    const newId=uuidv4();
    const newEntry : Entry ={...entry, id:newId};
    patientData.find(p=>p.id===userId)?.entries.push(newEntry);
    console.log(patientData);
    return newEntry;
};
export default {getPatients , addPatient,getNonSensitivePatients , findPatient , addEntry};