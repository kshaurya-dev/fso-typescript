import patientData from "../../data/patients.js";
import type { Patient , nonSensitivePatient } from "../types.js";

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
const addPatient = ()=>{
    return null;
};
export default {getPatients , addPatient,getNonSensitivePatients};