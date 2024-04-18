import axios from "../../utils/request"
import path from "../path"

const api = {
    register(formData) {
        return axios({
            url: path.baseUrl + "code",
            method: "post",
            data: formData,
        })
    },
}

export default api;