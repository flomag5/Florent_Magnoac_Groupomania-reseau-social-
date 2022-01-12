import http from "../http-common";

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
        return api.get(`/user/${id}`);
    }

    modifyUser(id, data) {
        return http.put(`/user/${id}`, data, { headers: auth() });
    }

    deleteUser(id) {
        return http.delete(`/user/${id}`, { headers: auth() });
    }

}

export default new UserDataService();