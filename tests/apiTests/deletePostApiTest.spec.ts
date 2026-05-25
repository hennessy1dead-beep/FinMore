import { expect, test } from '@playwright/test'
import { PostsApi } from '../../api/pages/posts.api'
import { defaultPostData } from '../../api/testData/posts.data'

 
test.describe('DELETE POSTS', () => {
 
    test('Should delete post', async ({ request }) => {
 
        const postsApi = new PostsApi(request)
 
        const createResponse = await postsApi.createPost(defaultPostData)
 
        const createdPost = await createResponse.json()

        console.log('Post ID to delete:', createdPost.id)
 
        const deleteResponse = await postsApi.deletePost(createdPost.id)
 
        expect(deleteResponse.ok()).toBeTruthy()
 
        const getResponse = await postsApi.getPostById(createdPost.id)
 
        expect(getResponse.status()).toBe(404)

        console.log('Post deleted')

    })
})