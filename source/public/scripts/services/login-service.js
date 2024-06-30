import MakeRequest from "./http-services.js";

export default class LoginService {
    static async loginUser(thebody) {
        return MakeRequest('/login',thebody)
    }

}