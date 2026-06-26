import { useParams } from 'react-router-dom'
import patientService from '../services/patients'
import { Patient, Diagnose, Entry } from '../types';
import { useState, useEffect } from 'react';
import PatientEntry from '../components/PatientEntry'
import EntryForm from '../components/EntryForm';
const PatientPage=()=>{
   const [diagnoses , setDiagnoses]=useState<Diagnose[]>([]);
   const [notification, setNotification]=useState('');
   const [showForm , setShowForm]=useState(false);
    const {id}=useParams();
    const [patient, setPatient]=useState<Patient | null>(null);
    useEffect(()=>{
        const fetchDiagnosisList = async()=>{
          const diagnoses =await patientService.getDiagnose();
          setDiagnoses(diagnoses);
        };
        void fetchDiagnosisList();
      } , []);
    useEffect( ()=>{
        if(!id)return;
        patientService.getUser(id).then((res)=>{
            setPatient(res);
        });
    },[id] );
    const handleEntryAdded = (entry: Entry) => {
        console.log("Before:", patient?.entries.length);
        setPatient(prev =>
            prev? {
                ...prev,
                entries: [...prev.entries, entry],
            }
            : prev
        );
    };
    if(patient===null)return(<p>Loading patient info</p>);
    return(
    <div>
        <h2>{patient.name}</h2>
        <p>date of birth : {patient.dateOfBirth}</p>
        <p>Occupation : {patient.occupation}</p>
        <p>ssn : {patient.ssn}</p>
        <p>gender : {patient.gender}</p>
        <PatientEntry entries={patient.entries} diagnoses={diagnoses}/>
        <p>{notification}</p>
        {!showForm && <button onClick={()=>setShowForm(true)}>ADD NEW ENTRY</button>}
        {showForm && <EntryForm setShowForm={setShowForm} id={patient.id}
        setNotification={setNotification}
         onEntryAdded={handleEntryAdded}/>}

    </div>
    )
}
export default PatientPage