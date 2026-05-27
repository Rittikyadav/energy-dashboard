import axios from "axios"

import plantConfig from "../config/plantConfig"

export const getSunData = async () => {

    try {

        const response = await axios.get(

            `https://api.sunrise-sunset.org/json?lat=${plantConfig.latitude}&lng=${plantConfig.longitude}&formatted=0`

        )

        return response.data.results

    } catch (error) {

        console.log(error)

        return null

    }

}