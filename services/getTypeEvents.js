import axios from "axios";
import { BASE_URL } from "@env";
const apiUrl = BASE_URL + "bitacora/tipoEvents/";
export default async function getTypeEvents() {
  try {
    const resp = await axios.get(apiUrl);
    console.log("RESPP", resp);
    return resp.data;
  } catch (error) {
    console.log("ERRORP", error);
    return error;
  }
}
