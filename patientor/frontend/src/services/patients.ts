import axios from "axios";
import { Diagnose,  Patient, PatientFormValues ,EntryWithoutId, Entry} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};
const getUser = async(id : string | undefined)=>{
  const response= await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return response.data;
};
const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );
  return data;
};
const getDiagnose=async()=>{
  const response= await axios.get<Diagnose[]>(
    `${apiBaseUrl}/diagnoses`
  );
  return response.data;
};
const createEntry = async (id: string, entry: EntryWithoutId) => {
  try {
    const response = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${id}/entries`,
      entry
    );
    return response.data;
  }catch (error) {
    if (axios.isAxiosError(error))throw error.response?.data?.error ?? error.message;
    if (error instanceof Error) {
      throw error.message;
    }
    throw "Unknown error";
  }
};
export default {
  getAll, create,getUser,getDiagnose,createEntry
};

