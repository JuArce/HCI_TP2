export {UserStore};

import {UserApi} from "./api/user";
import {Credentials} from "./api/user";
import {router} from "../main";

const UserStore = {
    async loginUser(username, password) {
        try {
            const credentials = new Credentials(username, password);
            await UserApi.login(credentials);
            await router.replace("/Home");
        } catch (error) {
            return -1;
        }
    },

    async logOutUser() {
        try {
            await UserApi.logout();
        } catch (error) {
            return -1;
        }
    }
}