import diagnosesEntries from '../../data/diagnoses.js';
import type { Diagnose } from '../types.js';

const getDiagnoses=(): Diagnose[]=>{
    return diagnosesEntries;
};
const addDiagnoses=()=>{
    return null;
};
export default { getDiagnoses , addDiagnoses};
