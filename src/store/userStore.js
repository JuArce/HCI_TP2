export {UserStore};

import {UserApi} from "./api/user";
import {Credentials, UserData, UserNoPassword, ValidateCredentials} from "./api/user";

const UserStore = {
    async loginUser(username, password) {
        const credentials = new Credentials(username, password);
        await UserApi.login(credentials);
    },

    async verifyUser(email, code) {
        let credentials = new ValidateCredentials(email, code);
        await UserApi.verifyEmail(credentials);
    },

    async logOutUser() {
        await UserApi.logout();
    },

    async registerUser(username, password, firstName, lastName, gender, birthdate, email, phone, avatarUrl) {
        let userData = new UserData(username, password, firstName, lastName, gender, birthdate, email, phone, avatarUrl);
        await UserApi.register(userData);
    },

    async getCurrentUserData() {
        return await UserApi.getCurrentUserData();
    },
    
    async getAllUsers(data){
        return await UserApi.getUsers(data);
    },

    async modifyUser(username, firstName, lastName, email, phone, avatarUrl) {
        let userData = new UserNoPassword(username, firstName, lastName, 'other', 1602139940660, email, phone, avatarUrl);
        await UserApi.modifyCurrent(userData);
    },

    async getCurrentUserRoutines(data){
        return await UserApi.getCurrentRoutines(data);
    },

    async getOtherUserData(id){
        return await UserApi.getOtherData(id);
    },

    async getOtherUserRoutines(id, data){
        return await UserApi.getOtherRoutines(id, data);
    }

}