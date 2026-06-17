import patientData from "../../data/patients.js";
import { v4 as uuidv4 } from 'uuid';
const getPatients = () => {
    return patientData;
};
const getNonSensitivePatients = () => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};
const findPatient = (id) => {
    const patient = patientData.find(p => p.id === id);
    return patient;
};
const addPatient = (patient) => {
    const newId = uuidv4();
    const newPatient = { ...patient, id: newId };
    patientData.push(newPatient);
    return newPatient;
};
export default { getPatients, addPatient, getNonSensitivePatients, findPatient };
