//jsons to use in tests related to Create


export const defaultPostData = {
    title: 'Test Post from Playwright',
    content: 'This is test content created via API automation',
    status: 'publish',
    excerpt: 'Test excerpt'
}
 
export const scheduledPostData = {
    title: 'Scheduled Post',
    content: 'Future content',
    status: 'future',
    date_gmt: '2027-05-08T13:00:00.000Z',
    sticky: true
}

export const updatedPostData = {
    title: 'Updated Title',
    content: 'Updated Content'
}