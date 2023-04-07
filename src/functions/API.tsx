import { decodeAndRetrieve } from "./functions";
import axios from "axios";
import { APIdefaultTypes } from "./types";

export const ENDPOINT = 'https://flashstudy.razvanpoienariu.net/api/';

const token = decodeAndRetrieve('token');

export async function API(options: APIdefaultTypes) {  
  options.headers.authorization = `Bearer ${token}`;
  options.url = ENDPOINT + options.url;
  
  const res = await axios.request(options);
  return res.data;
};


