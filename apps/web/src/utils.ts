import axios from "axios";
import * as nprogress from "nprogress";
import "nprogress/nprogress.css";

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
  baseURL: `${process.env.API_URI}/v1/`,
  withCredentials: true
});

nprogress.configure({
  showSpinner: false
});
instance.interceptors.request.use(
  config => {
    nprogress.start();
    return config;
  },
  error => {
    nprogress.done();
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  response => {
    nprogress.done();
    return response;
  },
  error => {
    nprogress.done();
    return Promise.reject(error);
  }
);

export const http = instance;
