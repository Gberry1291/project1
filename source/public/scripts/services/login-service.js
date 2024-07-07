import makeRequest from "./http-services.js";

export default class LoginService {
    static loginUser(thebody) {
        return makeRequest('/login',thebody)
    }

}