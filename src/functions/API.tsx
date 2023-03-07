import { decodeAndRetrieve } from "./functions";
import axios from "axios";
import { APIdefaultTypes } from "./types";

export const ENDPOINT = 'https://flashstudy.razvanpoienariu.net/api/';

const token = decodeAndRetrieve('token');

export async function API(options: APIdefaultTypes) {

  // if(options.method === 'POST') {
  //   const formData = new FormData()

  //   Object.entries(options.data).forEach((data) => {
  //   const [key, value]: [string, any] = data;      
  //     formData.append(key, value)
  //   })
    
  //   options.data = formData;    
  // }
  
  
  options.headers.authorization = `Bearer ${token}`;
  options.url = ENDPOINT + options.url;
  
  const res = await axios.request(options);
  return res.data;
};