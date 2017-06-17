import axios from "axios";
import * as nprogress from "nprogress";

/**
 * Return random number in range
 * @param min min value
 * @param max max value
 */
export function random(min: number, max: number) {
  return Math.round(Math.random() * (max - min)) + min;
}

/**
 * initialize axios
 */
const instance = axios.create({
  baseURL: `${process.env.API_URI}/v1/`
});

instance.interceptors.request.use(config => {
  nprogress.start();
  return config;
});
instance.interceptors.response.use(response => {
  nprogress.done();
  return response;
});

export const http = instance;
