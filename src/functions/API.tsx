import { decodeAndRetrieve } from "./functions";
import axios from "axios";

export const ENDPOINT = 'http://trphost.go.ro:8081/api/';
export type MethodsType = 'POST' | 'GET' | 'PUT' | 'DELETE';

const token = decodeAndRetrieve('token');

export function API(options: {
  method: MethodsType,
  url: string,
  data: any,
  headers: {
    authorization: string,
  }
}) {
  options.headers.authorization = `Bearer ${token}`;
  options.url = ENDPOINT + options.url;
  
  return axios.request(options).then((res) => res.data)
};