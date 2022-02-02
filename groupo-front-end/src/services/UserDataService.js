//--- Méthodes pour envoyer des requêtes HTTP à l'Api pour "user" ---//

import http from "../http-common";
import auth from "./auth";

class UserDataService {
    signup(data) {
        return http.post("/user/signup", data);
    }

    login(data) {
        return http.post("/user/login", data);
    }

    getAllUsers() {
        return http.get('/user', { headers: auth() });
    }
    getOneUser(id) {
        return http.get(`/user/${id}`);
    }

    modifyUser(id, data) {
        return http.put(`/user/${id}`, data);
    }

    deleteUser(id) {
        return http.delete(`/user/${id}`);
    }

}

export default new UserDataService();