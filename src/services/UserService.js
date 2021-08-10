import HttpService from './HttpService'

export default {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    loginGoogle,
    getFormattedTime,
    addUser
}

function addUser(user) {
    return HttpService.post('user',user)
}

async function login(creds) {
    const user = await HttpService.post('auth/login', creds)
    return user
}

function _saveInStorage(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}

function getById(userId) {
    return HttpService.get(`user/${userId}`)
}
function remove(userId) {
    return HttpService.delete(`user/${userId}`)
}

async function update(user) {
    const updatedUser = await HttpService.put(`user/${user._id}`, user)
    return _saveInStorage(updatedUser)
}


async function loginGoogle(id_token) {
    const res = await HttpService.post('auth/logingoogle', id_token)
    return res;
}

async function signup(creds) {
    const user = await HttpService.post('auth/signup', creds)
    return _saveInStorage(user)
}

async function logout() {
    await HttpService.post('auth/logout');
    sessionStorage.clear();
}
function getUsers() {
    return HttpService.get('user')
}

function getFormattedTime() {
    var currDate = new Date();

    var formatDate = '';
    formatDate += currDate.getFullYear();
    formatDate += ' 0' + currDate.getMonth();
    formatDate += ' ' + currDate.getDate();
    formatDate += ' ' + currDate.getHours();
    formatDate += ':' + currDate.getMinutes();
    return formatDate;
}