import axios from 'axios';
import NProgress from 'nprogress';

const apiBaseUrl =`${process.env.REACT_APP_API_URL}`;

/**
 * Axios basic configuration
 * Some general configuration can be added like timeout, headers, params etc. More details can be found on https://github.com/axios/axios
 * */
const baseConfig = {
  baseURL: apiBaseUrl,
};

/**
 * Creating the instance of Axios
 * It is because, in large scale application we may need to consume APIs from more than single server,
 * So, may need to create multiple http client with different config
 * Only this client will be used rather than axios in the application
 * */
const httpClient = axios.create(baseConfig);

/**
 * Auth interceptors
 * @description Configuration related to AUTH token can be done in interceptors.
 * @param {*} config
 */
const authInterceptor = (config) => {
  /** add auth token */
  return config;
};

const loggerInterceptor = (config) => {
  /** Add logging here */
  return config;
};

const requestProgress = (config) => {
  NProgress.start();
  return config;
};

/** Adding the request interceptors */
httpClient.interceptors.request.use(authInterceptor);
httpClient.interceptors.request.use(loggerInterceptor);
httpClient.interceptors.request.use(requestProgress);

/** Adding the response interceptors */
httpClient.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response.data;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error.response);
  },
);

export { httpClient };
