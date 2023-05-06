import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";

/* person detail */
const PersonDetail = async (req, res) => {
    try {
        const { personId } = req.params;

        const person = await tmdbApi.personDetail({ personId });

        responseHandler.okay(res, person);

    } catch{
        responseHandler.error(res)
    }
}

/* person medias */
const PersonMedias = async (req, res) => {
    try {
        const { personId } = req.params;

        const medias = await tmdbApi.personDetail({ personId })

        responseHandler.okay(res, medias)
    } catch {
        responseHandler.error(res)
    }
}

export default {
    PersonDetail, PersonMedias
}