import { decodeAndRetrieve } from "./functions";
import axios from "axios";
import { APIdefaultTypes } from "./types";
import { U } from "chart.js/dist/chunks/helpers.core";

export const ENDPOINT = 'http://127.0.0.1:8081';


const token = decodeAndRetrieve('token');

export async function API(options: APIdefaultTypes) {  
  options.headers.authorization = `Bearer ${token}`;
  options.url = ENDPOINT +'/api/'+ options.url;
  
  console.log(options)
  const res = await axios.request(options);
  return res.data;
};


