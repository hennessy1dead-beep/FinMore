import { APIRequestContext } from '@playwright/test'

import { ENDPOINTS } from '../client/apiClient'

import { getAuthHeaders } from '../utils/auth'
 
export class PostsApi {
 
    constructor(private request: APIRequestContext) { }
 
    async createPost(data: any) {

        return await this.request.post(ENDPOINTS.posts, {

            headers: getAuthHeaders(),

            data

        })

    }
 
    async getPostById(postId: number) {

        return await this.request.get(`${ENDPOINTS.posts}/${postId}`)

    }
 
    async getAllPosts() {

        return await this.request.get(ENDPOINTS.posts)

    }
 
    async updatePost(postId: number, data: any) {

        return await this.request.put(`${ENDPOINTS.posts}/${postId}`, {

            headers: getAuthHeaders(),

            data

        })

    }
 
    async patchPost(postId: number, data: any) {

        return await this.request.patch(`${ENDPOINTS.posts}/${postId}`, {

            headers: getAuthHeaders(),

            data

        })

    }
 
    async deletePost(postId: number) {

        return await this.request.delete(`${ENDPOINTS.posts}/${postId}?force=true`, {

            headers: getAuthHeaders()

        })

    }
 
    async createWithoutAuth(data: any) {

        return await this.request.post(ENDPOINTS.posts, {

            data

        })

    }

}
 