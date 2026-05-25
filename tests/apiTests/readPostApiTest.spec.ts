import { expect, test } from '@playwright/test'
import { PostsApi } from '../../api/pages/posts.api'
import { defaultPostData } from '../../api/testData/posts.data'


test.describe('READ POSTS', () => {


    //передать переменную после крейта поста и использовать ее для получения поста по id (охранять глобально в отдельны файл))
    test('Should get post by id', async ({ request }) => {

        const postsApi = new PostsApi(request)

        const createResponse = await postsApi.createPost(defaultPostData)

        const createdPost = await createResponse.json()

        console.log('Post ID to get:', createdPost.id)

        const response = await postsApi.getPostById(createdPost.id)

        const body = await response.json()

        expect(body.id).toBe(createdPost.id)
        expect(body).toHaveProperty('title')
        expect(body).toHaveProperty('content')
    })
})