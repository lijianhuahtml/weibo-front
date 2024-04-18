import axios from "../../utils/request"
import path from "../path"

const api = {
    login(formData) {
        return axios({
            url: path.baseUrl + "login",
            method: "post",
            data: formData,
        })
    },
}

export default api;