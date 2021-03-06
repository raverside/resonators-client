import fetcher from './fetcher';

export function get() {
    return fetcher('/leader_followers');
}

export function create({name, email, password, clinic}) {
    return fetcher.post('/leader_followers.json', {
        name,
        email,
        password,
        clinic_id: clinic
    });
}

export function edit({
    id,
    name,
    email
}) {
    return fetcher.put(`/leader_followers/${id}`, {
        id,
        user: {
            name,
            email
        }
    });
}

export function deleteFollower(id) {
    return fetcher.delete(`/leader_followers/${id}`);
}

export function freezeFollower(id) {
    return fetcher.post(`/leader_followers/${id}/freeze`);
}

export function unfreezeFollower(id) {
    return fetcher.post(`/leader_followers/${id}/unfreeze`);
}

export function deleteResonator(followerId, resonatorId) {
    return fetcher.delete(`/leader_followers/${followerId}/reminders/${resonatorId}`);
}

export function getResonators(followerId) {
    return fetcher(`/leader_followers/${followerId}/reminders.json`);
}
