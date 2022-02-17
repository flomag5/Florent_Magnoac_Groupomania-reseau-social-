import { createStore } from 'vuex'

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/user/'
});

let user = localStorage.getItem('user');
if (!user) {
    user = {
        UserId: -1,
        token: '',
    };
} else {
    try {
        user = JSON.parse(user);
        instance.defaults.headers.common['Authorization'] = user.token;
    } catch (err) {
        user = {
            userId: -1,
            token: '',
        };
    }
}
// Création d'une nouvelle instance de store
const store = createStore({
    state: {
        status: '',
        user: user,
        userLog: user.token,
        userData: {
            lastName: '',
            firstName: '',
            email: '',
            avatar: '',
            isAdmin: null
        },
        posts: [],
        post: {
            title: '',
            content: '',
            image: '',
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
        getUserData: ({ commit }) => {
            instance.get('/id')
                .then(function (response) {
                    commit('userData', response.data);
                })
                .catch(function () {

                });
        }
    }
})

export default store;