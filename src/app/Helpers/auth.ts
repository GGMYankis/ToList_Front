export function setToken(token: any) {
    return localStorage.setItem('token', token)
}

export function setInfoUser(userInfo: any) {
    return localStorage.setItem('userInfo', userInfo)
}


export function getToken() {
    return localStorage.getItem('token')
}
export function deleteToken() {
    return localStorage.removeItem('token')
}

export function getUser(): any {
    const user = localStorage.getItem('userInfo');
    if (user) {
        return JSON.parse(user);
    } else {
        return null
    }

}



