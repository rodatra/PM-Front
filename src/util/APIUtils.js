import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {

    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function login(loginRequest) {
    let param = "username=" + encodeURIComponent(loginRequest.username) + "&password=" + encodeURIComponent(loginRequest.password) + "&code=" + loginRequest.code;
    let options = {
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: new URLSearchParams(param)
    };

    let request = Object.assign({}, options);

    return fetch(options.url, request).then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
}

export async function getResponse(params) {
    let param = {
        url: params[0],
        method: params[1],
        header: params[2],
        param: params[3],
    }
    return request({
        url: API_BASE_URL + "/debugHandler/requestHandling",
        method: 'POST',
        body: JSON.stringify(param)
    });
}

export async function postResponse(params) {
    let param = {
        url: params[0],
        method: params[1],
        header: params[2],
        param: params[3],
        postBody: params[4],
    }
    return request({
        url: API_BASE_URL + "/debugHandler/requestHandling",
        method: 'POST',
        body: JSON.stringify(param)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/user/registration",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function changePass(pass) {
    return request({
        url: API_BASE_URL + "/user/savePassword",
        method: 'POST',
        body: JSON.stringify(pass)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export function getDebugHistory() {
    return request({
        url: API_BASE_URL + "/debugHandler/getHistory",
        method: 'GET'
    });
}

export function validateRegToken(token) {
    return request({
        url: API_BASE_URL + "/validateRegToken?token=" + token,
        method: 'GET'
    });
}

export function validateLocToken(token) {
    return request({
        url: API_BASE_URL + "/enableNewLoc?token=" + token,
        method: 'GET'
    });
}

export function validatePassToken(token) {
    return request({
        url: API_BASE_URL + "/user/validateChangePassToken?token=" + token,
        method: 'GET'
    });
}

export function enable2Factor(status) {
    return request({
        url: API_BASE_URL + "/user/update2fa?isUsing2FA=" + status,
        method: 'GET'
    });
}

export function resetPassword(email) {
    return request({
        url: API_BASE_URL + "/user/resetPassword",
        method: 'POST',
        body: JSON.stringify(email)
    });
}