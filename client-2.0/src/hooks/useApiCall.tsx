import { useState, useCallback, useContext } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { UserContext } from '@pages/_app';

interface ApiCallResult<T> {
  loading: boolean;
  error: string | null;
  data: T | null;
  makeApiCall: (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endPoint: string,
    body?: any,
    refetchAPIName?: string[] | undefined
  ) => Promise<T>;
}

const useApiCall = <T = any>(): ApiCallResult<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  const { setRefetchAPIName } = useContext(UserContext) as any;
  const url = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  // Retrieve token from localStorage
  const localStorageData = localStorage.getItem('login-user');
  const { token } = localStorageData ? JSON.parse(localStorageData) : "";

  // Prepare headers
  const headers: AxiosRequestConfig['headers'] = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const makeApiCall = useCallback(
    async (method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', endPoint: string, body: any = null, refetchAPIName: string[] | undefined) => {
      setLoading(true);
      setError(null);
      const fullURL = url + endPoint;

      try {
        // Configure the request
        const response: AxiosResponse<T> = await axios({
          method,
          url: fullURL,
          data: body,
          headers,
          timeout: 5000, // Example configuration (you can adjust this)
        });
        setData(response.data);
        
        // Handle refetch API names
        if (refetchAPIName) {
          setRefetchAPIName(refetchAPIName);
        }
        return response.data;
      } catch (err) {
        const axiosError = err as AxiosError;
        const errorMessage = axiosError.response?.data
          ? JSON.stringify(axiosError.response.data)
          : axiosError.message || 'Network Error';
        setError(errorMessage);
        throw axiosError;
      } finally {
        setLoading(false);
      }
    },
    [url, headers, setRefetchAPIName] // Added dependencies for useCallback
  );

  return { loading, error, data, makeApiCall };
};

export default useApiCall;
