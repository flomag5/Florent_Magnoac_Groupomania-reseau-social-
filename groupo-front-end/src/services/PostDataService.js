//--- Méthodes pour envoyer des requêtes HTTP à l'Api pour "post" ---//

import http from "../http-common";
import auth from './auth';

class PostDataService {
    getAllPosts() {
        return http.get("/posts", { headers: auth() });
    }

    getOnePost(id) {
        return http.get(`/posts/${id}`, { headers: auth() });
    }

    createPost(data) {
        return http.post("/posts/", data, { headers: auth() });
    }

    modifyPost(id, data) {
        return http.put(`/posts/${id}`, data, { headers: auth() });
    }

    deletePost(id) {
        return http.delete(`/posts/${id}`, { headers: auth() });
    }

    likePost(id) {
        return http.post(`/posts/${id}/like`);
    }

    unlikePost(id) {
        return http.delete(`/posts/${id}/unlike`);
    }

    getOneComment(id) {
        return http.get(`/comment/${id}`);
    }
    getComments(id, data) {
        return http.get(`/posts/${id}/comments`, data)
    }
    Createcomment(id, data) {
        return http.post(`/posts/${id}/comment`, data, { headers: auth() })
    }
    modifyComment(id, comment) {
        return http.put(`/comment/${id}`, { comment: comment }, { headers: auth() })
    }
    deleteComment(commentId) {
        return http.delete('/comment/' + commentId, { headers: auth() })
    }
}

export default new PostDataService();