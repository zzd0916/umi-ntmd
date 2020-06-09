export default {
    setLogin(data:object) {
        localStorage.setItem('login_data', JSON.stringify(data))
        localStorage.setItem('isLogin', "true")
    },
    isLogin():boolean{
        return localStorage.get('isLogin') === 'true' ? true : false
    },
    getLoginInfo(): object {
        return JSON.parse(localStorage.get('login_data'))
    }
}