import { expect, test } from '@playwright/test'
import { PostsApi } from '../../api/pages/posts.api'
import { defaultPostData, scheduledPostData } from '../../api/testData/posts.data'


test.describe('CREATE POSTS', () => {

let postId: number

    test('Should create post', async ({ request }) => {

        const postsApi = new PostsApi(request)

        const response = await postsApi.createPost(defaultPostData)

        expect(response.ok()).toBeTruthy()

        expect(response.status()).toBe(201)

        const body = await response.json()

        expect(body.id).toBeDefined()

        expect(body.title.rendered).toBe(defaultPostData.title)

        expect(body.status).toBe('publish')

        console.log('Created Post ID:', body.id)

        postId = body.id

    })

    test('Should create scheduled sticky post', async ({ request }) => {

        const postsApi = new PostsApi(request)

        const response = await postsApi.createPost(scheduledPostData)

        expect(response.ok()).toBeTruthy()

        const body = await response.json()

        expect(body.status).toBe('future')

        expect(body.sticky).toBe(true)

    })

    test('Should not create without auth', async ({ request }) => {

        const postsApi = new PostsApi(request)

        const response = await postsApi.createWithoutAuth(defaultPostData)

        expect(response.status()).toBe(401)

    })

    test('Should not create post with invalid data', async ({ request }) => {

        const postsApi = new PostsApi(request)

    })

})

