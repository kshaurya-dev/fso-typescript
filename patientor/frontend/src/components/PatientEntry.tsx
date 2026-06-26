    import { Entry , Diagnose, HealthCheckEntry , 
        OccupationalHealthcareEntry , HospitalEntry
    } from "../types";

    interface Props{
        entries:Entry[],
        diagnoses: Diagnose[]
    };
    const HealthCheck = ({entry , d}:{entry : HealthCheckEntry , d:Diagnose[]})=>{
        return (
            <>
            <p>{entry.date}</p>
            <p>{entry.description}</p>
            <p>rating : {entry.healthCheckRating}</p>
            {entry.diagnosisCodes?.map(c=><p key={c}>{c} - {d.find(o=>o.code===c)?.name}</p>)}
            <p>diagnose by {entry.specialist}</p>
            <p>_________________________________________________________________</p>
            </>
        );
    };
    const Hospital = ({entry , d}:{entry : HospitalEntry , d:Diagnose[]})=>{
        return (
             <>
      <p>{entry.date}</p>
      <p>{entry.description}</p>

      <p>Discharge: {entry.discharge.criteria}</p>

      {entry.diagnosisCodes?.map(c => (
        <p key={c}>
          {c} - {d.find(o => o.code === c)?.name}
        </p>
      ))}

      <p>Diagnosed by {entry.specialist}</p>
      <p>_________________________________________________________________</p>
    </>
        );
    };
    const OccupationalHealthcare= ({entry , d}:{entry : OccupationalHealthcareEntry , d:Diagnose[]})=>{
        return (
            <>
            <p>{entry.date}</p>
            <p>{entry.description}</p>
            <p>works at - {entry.employerName}</p>
            {entry.diagnosisCodes?.map(c=><p>{c} - {d.find(o=>o.code===c)?.name}</p>)}
            <p>diagnose by {entry.specialist}</p>
            <p>_________________________________________________________________</p>
            </>
        );
    };
    const PatientEntry=({entries, diagnoses} : Props)=>{
        return(
            <>
            <h3>Entries:</h3>
            {entries.map(e=>{
                switch(e.type){
                    case "HealthCheck": return <HealthCheck key={e.id}entry={e} d={diagnoses}/>
                    case "Hospital" : return <Hospital key={e.id} entry ={e} d={diagnoses}/>
                    case "OccupationalHealthcare": return <OccupationalHealthcare key={e.id} entry={e} d={diagnoses}/>
                }
            })}
            </>
        );
    }
    export default PatientEntry;