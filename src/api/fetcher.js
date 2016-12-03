function fetcher(...args) {
    return fetch(...args)
            .then(response => {
                if (response.status === 401)
                    return Promise.reject({
                        unauthorized: true
                    });

                return response.json();
            })
            .catch(err => {
                console.error('failed fetching', err);
                throw err;
            });
}

fetcher.post = (url, body) => {
    return fetcher(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
};

export default fetcher;
