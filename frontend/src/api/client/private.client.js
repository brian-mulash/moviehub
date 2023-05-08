import axios from "axios";
import queryString from "query-string";

const baseURL = "http://localhost:1500/api/v1/";

const privateClient = axios.create({
   baseURL,
   paramsSerializer: {
      encode: params => queryString.stringify(params)
   }
});

privateClient.interceptors.request.use(async config => {
   return {
      ...config,
      headers: {
         "content-Type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem('actkn')}`
      }
   }
});

privateClient.interceptors.response.use((response) => {
   if (response && response.data) {
      return response.data;
   }

   return response
}, (error) => {
   throw error.response.data
});

export default privateClient;