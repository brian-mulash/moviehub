import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
   register: "user/register",
   login: "user/login",
   getInfo: "user/info",
   passwordUpdate: "user/update-password",
   getFavorites: "user/favorites",
   addFavorite: "user/favorites"
}

const userApi = {
   login: async ({ username, password }) => {
      try {
         const response = await publicClient.post(
            userEndpoints.login,
            { username, password }
         )

         return { response }
      } catch (error) {
         return {error}
      }
   },

   register: async ({ username, displayName, password, confirmPassword }) => {
      try {
         const response = await publicClient.post(
            userEndpoints.register,
            { username, displayName, password, confirmPassword }
         )

         return { response }
      } catch (error) {
         return {error}
      }
   },

   getInfo: async () => {
      try {
         const response = await privateClient.get(userEndpoints.getInfo)

         return { response }
      } catch (error) {
         return {error}
      }
   },

   passwordUpdate: async ({ password, newPassword, confirmPassword }) => {
      try {
         const response = await privateClient.put(
            userEndpoints.passwordUpdate,
            { password, newPassword, confirmPassword }
         )
      } catch (error) {
         return {error}
      }
   },

}

export default userApi