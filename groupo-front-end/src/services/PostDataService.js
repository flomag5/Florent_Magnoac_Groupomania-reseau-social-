import http from "../http-common";

class PostDataService {
    getAllPosts() {
        return http.get("/posts");
    }

    getOnePost(id) {
        return http.get(`/posts/${id}`);
    }

    createPost(data) {
        return http.post("/posts", data);
    }

    modifyPost(id, data) {
        return http.put(`/posts/${id}`, data);
    }

    deletePost(id) {
        return http.delete(`/posts/${id}`);
    }

    likePost(id) {
        return http.post(`/posts/${id}/like`);
    }

    unlikePost(id) {
        return http.delete(`/posts/${id}/unlike`);
    }

    getOneComment(id) {
        return api.get(`/comment/${id}`, { headers: auth() });
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