import {Api} from './api.js';

export {UserApi, Credentials, UserData, ValidateCredentials};

class UserApi {
    static get url() {
        return `${Api.baseUrl}/users`;
    }

    static async login(credentials, controller) {
        const result = await Api.post(`${UserApi.url}/login`, false, credentials, controller);
        Api.token = result.token;
        localStorage.setItem('securityToken', Api.token);
    }

    static async logout(controller) {
        await Api.post(`${UserApi.url}/logout`, true, controller);
        Api.token = undefined;
        localStorage.removeItem('securityToken');
    }

    static async register(data, controller) {
        const response =  await Api.post(`${UserApi.url}`, false, data, controller);
        data.id = response.id;
    }

    static async verifyEmail(verification, controller) {
        return await Api.post(`${UserApi.url}/verify_email`, false, verification, controller);
    }

    static async resendVerification(credentials, controller) {
        return await Api.post(`${UserApi.url}/resend_verification`, false, credentials, controller);
    }

    static async getCurrentUserData(controller) {
        return await Api.get(`${UserApi.url}/current`, true, controller);
    }

}

class Credentials {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

class ValidateCredentials {
    constructor(email, code) {
        this.email = email;
        this.code = code;
    }
}

class UserData{
    constructor(username, password, firstName, lastName, gender, birthdate, email, phone, avatarUrl){
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.birthdate = birthdate;
        this.email = email;
        this.phone = phone;
        this.avatarUrl = avatarUrl;
        this.id = null;
    }
}