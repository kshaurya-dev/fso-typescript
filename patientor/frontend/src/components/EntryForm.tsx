import { useState } from "react";
import patientService from "../services/patients";
import type { Entry, EntryWithoutId, HealthCheckRating } from "../types";

const diagnosisOptions = [
  { code: "S62.5", name: "Fracture of thumb" },
  { code: "Z57.1", name: "Occupational exposure to radiation" },
  { code: "Z74.3", name: "Need for continuous supervision" },
  {
    code: "M51.2",
    name: "Other specified intervertebral disc displacement",
  },
  {
    code: "H35.29",
    name: "Other proliferative retinopathy",
  },
  {
    code: "F43.2",
    name: "Adjustment disorders",
  },
  {
    code: "L20",
    name: "Atopic dermatitis",
  },
  {
    code: "L60.1",
    name: "Onycholysis",
  },
  {
    code: "J03.0",
    name: "Streptococcal tonsillitis",
  },
  {
    code: "H54.7",
    name: "Unspecified visual loss",
  },
  {
    code: "N30.0",
    name: "Acute cystitis",
  },
  {
    code: "J06.9",
    name: "Acute upper respiratory infection, unspecified",
  },
  {
    code: "J10.1",
    name: "Influenza with other respiratory manifestations",
  },
  {
    code: "S03.5",
    name: "Sprain and strain of joints and ligaments of head",
  },
  {
    code: "M24.2",
    name: "Disorder of ligament",
  },
] as const;

type EntryType =
  | "HealthCheck"
  | "Hospital"
  | "OccupationalHealthcare";

type EntryFormProps = {
  setShowForm: (show: boolean) => void;
  id: string;
  setNotification: React.Dispatch<React.SetStateAction<string>>;
  onEntryAdded:(entry : Entry)=>void;
};

const EntryForm = ({
  setShowForm,
  id,
  setNotification,onEntryAdded
}: EntryFormProps) => {
  const [entryType, setEntryType] =useState<EntryType>("HealthCheck");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] =useState<HealthCheckRating>(0);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newEntry: EntryWithoutId;
    switch (entryType) {
        case "HealthCheck":
            newEntry = {type: "HealthCheck",date,description,specialist,diagnosisCodes,healthCheckRating,};
            break;
        case "Hospital":
            newEntry = {type: "Hospital",date,description,specialist,diagnosisCodes,discharge: {date: dischargeDate,criteria: dischargeCriteria,},};
            break;
        case "OccupationalHealthcare":
            newEntry = {type: "OccupationalHealthcare",date,description,specialist,diagnosisCodes,employerName,sickLeave:sickLeaveStart && sickLeaveEnd? {
                startDate: sickLeaveStart,
                endDate: sickLeaveEnd,
              }: undefined,};
            break;
            default:
                return;
            }

  try {
    const addedEntry =await patientService.createEntry(id, newEntry);
    console.log("Added entry", addedEntry.id);
    onEntryAdded(addedEntry);
    setShowForm(false);
  } catch (error) {
    console.error(error);
    setNotification(error as string);
  }
};

    return (
  <>
    <style>{`
      .entry-form {
        border: 2px dashed #777;
        padding: 16px;
        max-width: 700px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .entry-form label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-weight: 500;
      }

      .entry-form input,
      .entry-form select,
      .entry-form textarea {
        padding: 8px;
        font-size: 15px;
      }

      .entry-form select[multiple] {
        height: 140px;
      }

      .buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 12px;
      }

      .buttons button {
        padding: 8px 18px;
        cursor: pointer;
      }
    `}</style>

    <form className="entry-form" onSubmit={handleSubmit}>
      <h2>New Entry</h2>

      <label>
        Entry Type
        <select
          value={entryType}
          onChange={(e) =>
            setEntryType(e.target.value as EntryType)
          }
        >
          <option value="HealthCheck">Health Check</option>
          <option value="Hospital">Hospital</option>
          <option value="OccupationalHealthcare">
            Occupational Healthcare
          </option>
        </select>
      </label>

      <label>
        Date
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <label>
        Description
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <label>
        Specialist
        <input
          type="text"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
      </label>

      <label>Diagnosis Codes</label>

{diagnosisOptions.map((diagnosis) => (
  <label
    key={diagnosis.code}
    style={{
      display: "block",
      fontWeight: "normal",
      marginBottom: "4px",
    }}
  >
    <input
      type="checkbox"
      checked={diagnosisCodes.includes(diagnosis.code)}
      onChange={(e) => {
        if (e.target.checked) {
          setDiagnosisCodes([...diagnosisCodes, diagnosis.code]);
        } else {
          setDiagnosisCodes(
            diagnosisCodes.filter((c) => c !== diagnosis.code)
          );
        }
      }}
    />

    {" "}
    <strong>{diagnosis.code}</strong> — {diagnosis.name}
  </label>
))}

      {entryType === "HealthCheck" && (
        <label>
          Health Rating
          <select
            value={healthCheckRating}
            onChange={(e) =>
              setHealthCheckRating(
                Number(e.target.value) as HealthCheckRating
              )
            }
          >
            <option value={0}>0 - Healthy</option>
            <option value={1}>1 - Low Risk</option>
            <option value={2}>2 - High Risk</option>
            <option value={3}>3 - Critical Risk</option>
          </select>
        </label>
      )}

      {entryType === "Hospital" && (
        <>
          <label>
            Discharge Date
            <input
              type="date"
              value={dischargeDate}
              onChange={(e) =>
                setDischargeDate(e.target.value)
              }
            />
          </label>

          <label>
            Discharge Criteria
            <input
              type="text"
              value={dischargeCriteria}
              onChange={(e) =>
                setDischargeCriteria(e.target.value)
              }
            />
          </label>
        </>
      )}

      {entryType === "OccupationalHealthcare" && (
        <>
          <label>
            Employer Name
            <input
              type="text"
              value={employerName}
              onChange={(e) =>
                setEmployerName(e.target.value)
              }
            />
          </label>

          <label>
            Sick Leave Start
            <input
              type="date"
              value={sickLeaveStart}
              onChange={(e) =>
                setSickLeaveStart(e.target.value)
              }
            />
          </label>

          <label>
            Sick Leave End
            <input
              type="date"
              value={sickLeaveEnd}
              onChange={(e) =>
                setSickLeaveEnd(e.target.value)
              }
            />
          </label>
        </>
      )}

      <div className="buttons">
        <button type="submit">
          ADD
        </button>

        <button
          type="button"
          onClick={() => setShowForm(false)}
        >
          CANCEL
        </button>
      </div>
    </form>
  </>
    );
    };

    export default EntryForm;