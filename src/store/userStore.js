export {UserStore};

import {UserApi} from "./api/user";
import {Credentials, UserData, ValidateCredentials} from "./api/user";

const UserStore = {
    async loginUser(username, password) {
        try {
            const credentials = new Credentials(username, password);
            await UserApi.login(credentials);
        } catch (error) {
            return -1;
        }
    },

    async verifyUser(email, code){
        let credentials = new ValidateCredentials(email, code);
        await UserApi.verifyEmail(credentials);
    },

    async logOutUser() {
        try {
            await UserApi.logout();
        } catch (error) {
            return -1;
        }
    },

    async registerUser(username, password, firstName, lastName, gender, birthdate, email, phone, avatarUrl) {
        try {
            let userData = new UserData(username, password, firstName, lastName, gender, birthdate, email, phone, avatarUrl);
            await UserApi.register(userData);
        }
        catch(error) {
            return -1;
        }
    },

    async getCurrentUserData() {
        return await UserApi.getCurrentUserData();
    }

}