import axios from "axios";
import queryString from "query-string";

const baseURL = "http://localhost:1500/api/v1/";

const publicClient = axios.create({
   baseURL,
   paramsSerializer: {
      encode: params => queryString.stringify(params)
   }
});

publicClient.interceptors.request.use(async config => {
   return {
      ...config,
      headers: {
         "content-Type": "application/json",
      }
   }
});

publicClient.interceptors.response.use((response) => {
   if (response && response.data) {
      return response.data;
   }

   return response
}, (error) => {
   throw error.response.data
});

export default publicClient;