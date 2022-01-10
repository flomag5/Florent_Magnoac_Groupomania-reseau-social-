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
        return http.get(`/comment/${id}`);
    }
    Createcomment(id, data) {
        return http.post(`/posts/${id}/comment`, data)
    }
    modifyComment(id, comment) {
        return http.put(`/comment/${id}`, { comment: comment })
    }
    deleteComment(commentId) {
        return http.delete('/comment/' + commentId)
    }
}

export default new PostDataService();