import request from 'superagent';

const url = 'http://localhost:3000';

const endPoints = {
    CONTACTS: '/contacts'
};

const api = {
    callContacts: () => {
        console.log("inside api");
        return request(`${url}${endPoints.CONTACTS}`);
    }
}

export default api;