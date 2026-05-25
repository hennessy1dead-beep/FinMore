import { expect, test } from '@playwright/test'
import { PostsApi } from '../../api/pages/posts.api'
import { updatedPostData } from '../../api/testData/posts.data'
 
test.describe('UPDATE POSTS', () => {
 
    test('Should update post', async ({ request }) => {
 
        const postsApi = new PostsApi(request)
 
        const createResponse = await postsApi.createPost(updatedPostData)
 
        const createdPost = await createResponse.json()
 
        const updateResponse = await postsApi.updatePost(
            createdPost.id,
            updatedPostData
        )
 
        expect(updateResponse.ok()).toBeTruthy()
 
        const updatedBody = await updateResponse.json()
 
        expect(updatedBody.title.rendered)
            .toBe(updatedPostData.title)
    })
})