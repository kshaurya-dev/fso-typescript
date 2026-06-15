import patientData from "../../data/patients.js";
const getPatients = () => {
    return patientData;
};
const getNonSensitivePatients = () => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};
const addPatient = () => {
    return null;
};
export default { getPatients, addPatient, getNonSensitivePatients };
