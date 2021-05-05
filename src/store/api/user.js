import {Api} from './api.js';

export {UserApi, Credentials};

class UserApi {
    static get url() {
        return `${Api.baseUrl}/users`;
    }

    static async login(credentials, controller) {
        const result = await Api.post(`${UserApi.url}/login`, false, credentials, controller);
        Api.token = result.token;
    }

    static async logout(controller) {
        await Api.post(`${UserApi.url}/logout`, true, controller);
        Api.token = undefined;
    }

    static async register(credentials, controller) {
        const response =  await Api.post(`${UserApi.url}`, false, credentials, controller);
        credentials.id = response.id;
    }

    static async verifyEmail(verification, controller) {
        return await Api.post(`${UserApi.url}/verify_email`, false, verification, controller);
    }

    static async resendVerification(credentials, controller) {
        return await Api.post(`${UserApi.url}/resend_verification`, false, credentials, controller);
    }

}

class Credentials {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}