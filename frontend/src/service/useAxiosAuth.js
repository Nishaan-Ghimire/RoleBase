import axios from 'axios';
import { useContext } from 'react';
import useAuth  from '../context/useAuth';

const useAxiosAuth = () => {
  const { accessToken } = useAuth();

  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosAuth;
