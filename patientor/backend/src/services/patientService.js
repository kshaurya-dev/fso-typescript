import patientData from "../../data/patients.js";
import { v4 as uuidv4 } from 'uuid';
const getPatients = () => {
    return patientData;
};
const getNonSensitivePatients = () => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id, name, dateOfBirth, gender, occupation, entries
    }));
};
const findPatient = (id) => {
    const patient = patientData.find(p => p.id === id);
    return patient;
};
const addPatient = (patient) => {
    const newId = uuidv4();
    const newPatient = { ...patient, id: newId, entries: [] };
    patientData.push(newPatient);
    return newPatient;
};
const addEntry = (entry, userId) => {
    const newId = uuidv4();
    const newEntry = { ...entry, id: newId };
    patientData.find(p => p.id === userId)?.entries.push(newEntry);
    console.log(patientData);
    return newEntry;
};
export default { getPatients, addPatient, getNonSensitivePatients, findPatient, addEntry };
