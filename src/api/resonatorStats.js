import fetcher from './fetcher';

export function get(resonatorId) {
    return fetcher(`/criteria/stats/reminders/${resonatorId}.json`);
}

export function getCsvFile(resonatorId) {
    return fetcher.download(`/criteria/stats/reminders/${resonatorId}/download`);
}

export function getGroupCsvFile(followerGroupId) {
    return fetcher.download(`/criteria/stats/followerGroups/${followerGroupId}/download`);
}
