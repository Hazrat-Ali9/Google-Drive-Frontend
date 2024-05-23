import Cookie from 'js-cookie';
export const logOut = () => {
    Cookie.remove('authToken')
    window.location.href = '/login'
}