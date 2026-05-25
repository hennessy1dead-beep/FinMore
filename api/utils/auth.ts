export const AUTH = {
    username: 'admin',
    password: 'Engineer_123'
}
 
export const getAuthHeaders = () => {
    const credentials = `${AUTH.username}:${AUTH.password}`
 
    const base64 = typeof globalThis.btoa === 'function'
        ? globalThis.btoa(credentials)
        : Buffer.from(credentials).toString('base64')
 
    return {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json'
    }
}