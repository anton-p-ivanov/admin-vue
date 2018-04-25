/* globals localStorage */
import axios from 'axios';

const AUTH_CLIENT_ID = 'a354f75b-0352-42d0-b1a5-168f2cb04a7f';
const AUTH_CLIENT_SECRET = 'client_secret';

export default {
    login (email, pass, callback) {
        if (this.getToken()) {
            if (callback) {
                callback(true);
            }

            this.onChange(true);

            return;
        }

        console.debug('Sending access token request ...');

        axios
            .post('/auth/token', {
                'grant_type': 'password',
                'client_id': AUTH_CLIENT_ID,
                'client_secret': AUTH_CLIENT_SECRET,
                'username': email,
                'password': pass
            })
            .then(response => {
                let success = response.status === 200;
                if (success) {
                    console.debug('Access token successfully fetched.');
                    this.setToken(response.data);
                }

                if (callback) {
                    callback(success);
                }
            })
            .catch(() => {
                console.debug('Could not fetch access token.');

                if (callback) {
                    callback(false);
                }
            })
    },

    setToken (data) {
        localStorage.auth = JSON.stringify({
            access_token: data['access_token'],
            refresh_token: data['refresh_token'],
            expired: Math.floor((new Date()).getTime() / 1000 + data['expires_in'])
        });
    },

    getToken () {
        if (this.loggedIn()) {
            return JSON.parse(localStorage.auth).access_token;
        }

        return null;
    },

    logout (callback) {
        axios
            .delete('/auth/delete')
            .then(response => {
                if (response.status === 200) {
                    console.debug('Access token successfully removed.');
                }
            })
            .catch(() => {
                console.debug('Could not delete access token.');
            });

        delete localStorage.auth;

        if (callback) {
            callback();
        }

        console.debug('User has been signed out. Access token removed.');
    },

    loggedIn () {
        if (localStorage.auth) {
            let auth = JSON.parse(localStorage.auth),
                now = Math.floor((new Date()).getTime() / 1000);

            return now < auth.expired;
        }

        return false;
    },
}