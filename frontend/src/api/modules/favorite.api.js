import privateClient from "../client/private.client";

const favoriteEndpoints = {
   list: 'user/favorites',
   add: 'user/favorites',
   remove: ({ favoriteId }) => `user/favorite/${favoriteId}`
}

const favoriteApi = {
   getList: async () => {
      try {
         const response = await privateClient.get(favoriteEndpoints.list)

         return { response }
      } catch (error) {
         return {error}
      }
   },

   add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, mediaRate }) => {
      try {
         const response = await privateClient.post(
            favoriteEndpoints.add,
            { mediaId, mediaPoster, mediaTitle, mediaType, mediaRate }
         )

         return { response }
      } catch (error) {
         return {error}
      }
   },

   remove: async () => {
      try {
         const response = await privateClient.delete(favoriteEndpoints.remove({ favoriteId }));

         return { response }
      } catch (error) {
         return {error}
      }
   },
}

export default favoriteApi