import fetcher from './fetcher';

export function get(id) {
    return fetcher(`/user_sessions/${id}.json`);
}

export function create(email, password) {
    return fetcher('/user_sessions.json', {
        method: 'POST',
        body: {
            email,
            password
        }
    });
}

export function logout(id) {
    return fetcher(`/user_sessions/${id}.json`, {
        method: 'DELETE'
    });
}
