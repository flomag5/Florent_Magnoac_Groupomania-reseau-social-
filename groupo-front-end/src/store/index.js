import { createStore } from 'vuex'

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/user/'
});

let user = localStorage.getItem('user');
if (!user) {
    user = {
        id: -1,
        token: '',
    };
} else {
    try {
        user = JSON.parse(user);
        instance.defaults.headers.common['Authorization'] = user.token;
    } catch (err) {
        user = {
            id: -1,
            token: '',
        };
    }
}
// Création d'une nouvelle instance de store
const store = createStore({
    state: {
        status: '',
        user: user,
        userData: {
            lastName: '',
            firstName: '',
            email: '',
            avatar: '',
        }
    },
    mutations: {
        setStatus: function (state, status) {
            state.status = status
        },
        logUser: function (state, user) {
            instance.defaults.headers.common['Authorization'] = user.token;
            localStorage.setItem('user', JSON.stringify(user));
            state.user = user;
        },
        userData: function (state, userData) {
            state.userData = userData;
        },
        logout: function (state) {
            state.user = {
                userId: -1,
                token: '',
            }
            localStorage.removeItem('user');
        }
    },
    actions: {
        login: ({ commit }, userData) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                instance.post('/login', userData)
                    .then(function (response) {
                        commit('setStatus', '');
                        commit('logUser', response.data);
                        resolve(response);
                    })
                    .catch(function (error) {
                        commit('setStatus', 'error_login');
                        reject(error);
                    });
            });
        },
        createAccount: ({ commit }, userData) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                commit;
                instance.post('/signup', userData)
                    .then(function (response) {
                        commit('setStatus', 'created');
                        resolve(response);
                    })
                    .catch(function (error) {
                        commit('setStatus', 'error_create');
                        reject(error);
                    });
            });
        },
        /* getUserData: ({ commit }) => {
             instance.post(`/${data.user.id}`)
                 .then(function (response) {
                     commit('userData', response.data);
                 })
                 .catch(function () {
 
                 });
         }*/
        getUserData: ({ commit }, userData) => {
            return new Promise((resolve, reject) => {
                instance.get('/user/' + userData.id, { headers: { Authorization: 'bearer ' + userData.token } })
                    .then(function (response) {
                        commit('getUserData', response.data);
                        commit('connected', userData); resolve(response)
                    })
                    .catch(function (error) { commit('setStatus', 'errorGetUser'); reject(error) })
            });
        },
    }
})

export default store;