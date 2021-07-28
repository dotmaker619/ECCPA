import axios from 'axios';
import env from './env';

class ServiceUtils {

    ApiGET(endpoint) {
        let token = localStorage.getItem('token')
        if (!token) {
            return window.location.href = '/auth/login'
        }
        token = JSON.parse(token).token;
        const url = `${env.BASE_URL}${endpoint}`;
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': `Bearer ${token}`
            }
        }

        return axios.get(url, config).then((result) => {
            return result.data
        }).catch((err) => {
            if (err.message === 'Request failed with status code 401') {
                localStorage.removeItem('token')
                window.location.href = '/auth/login'
                return
            }
            throw err
        });
    }

    ApiPOST(endpoint, payload) {
        let token = localStorage.getItem('token')
        if (!token) {
            return window.location.href = '/auth/register'
        }
        token = JSON.parse(token).token;
        const url = '${env.BASE_URL}${endpoint]';
    }

    ApiPOST(endpoint, payload) {
        let token = localStorage.getItem('token')
        if (!token) {
            return window.location.href = '/auth/login'
        }
        token = JSON.parse(token).token;
        const url = `${env.BASE_URL}${endpoint}`;
        let config = {
            method: 'post',
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': `Bearer ${token}`
            },
            data: JSON.stringify(payload)

        }

        return axios(config).then((result) => {
            return result.data
        }).catch((err) => {
            if (err.message === 'Request failed with status code 401') {
                localStorage.removeItem('token')
                window.location.href = '/auth/login'
                return
            }
            throw err
        });
    }

    ApiPUT(endpoint, payload) {
        let token = localStorage.getItem('token')
        if (!token) {
            return window.location.href = '/auth/login'
        }
        token = JSON.parse(token).token;
        const url = `${env.BASE_URL}${endpoint}`;
        let config = {
            method: 'put',
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': `Bearer ${token}`
            },
            data: JSON.stringify(payload)
        }

        return axios(config).then((result) => {
            return result.data
        }).catch((err) => {
            if (err.message === 'Request failed with status code 401') {
                localStorage.removeItem('token')
                window.location.href = '/auth/login'
                return
            }
            throw err
        });
    }

    ApiDELETE(endpoint) {
        let token = localStorage.getItem('token')
        if (!token) {
            return window.location.href = '/auth/login'
        }
        token = JSON.parse(token).token;
        const url = `${env.BASE_URL}${endpoint}`;
        let config = {
            method: 'delete',
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': `Bearer ${token}`
            },
        }

        return axios(config).then((result) => {
            return result.data
        }).catch((err) => {
            if (err.message === 'Request failed with status code 401') {
                localStorage.removeItem('token')
                window.location.href = '/auth/login'
                return
            }
            throw err
        });
    }
}

export default ServiceUtils;