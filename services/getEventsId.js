import axios from "axios";
import { BASE_URL_API } from "@env";
const apiUrl = BASE_URL_API + "events/";

export default async function getEventsId(id) {
  try {
    const resp = await axios.get(apiUrl + id);
    return resp.data;
  } catch (error) {
    return error;
  }
}
