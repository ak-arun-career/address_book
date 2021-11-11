import { takeEvery } from 'redux-saga/effects';
import { runSaga } from 'redux-saga';
import Contacts from 'Store/Contacts';
import api from 'Store/api';

/**
 * Contacts store action tests
 * */
describe('Contacts store actions tests', () => {
    it('should return an action to fetch contacts', () => {
        const expectedAction = {
            type: Contacts.types.FETCH_CONTACTS
        };

        expect(Contacts.actions.fetchContacts()).toEqual(expectedAction);
    });

    it('should return an action when fetching contacts is succeeded', () => {
        const contacts = [
            {
                "id": "q123",
                "name": {
                    "first": "Cristiano",
                    "last": "Ronaldo"
                },
                "email": "cristiano.ronaldo@example.com",
                "phone": "0681234567",
                "status": "Work"
            }
        ];

        const expectedAction = {
            type: Contacts.types.FETCH_CONTACTS_SUCCESS,
            contacts
        };

        expect(Contacts.actions.fetchContactsSuccess(contacts)).toEqual(expectedAction);
    });
});


/**
 * Contacts store saga tests
 * */
describe('Contacts store saga', () => {
    const genObject = Contacts.saga();

    it("should wait for every FETCH_CONTACTS action and call getContacts", () => {
        expect(genObject.next().value)
            .toEqual(takeEvery('FETCH_CONTACTS', Contacts.getContacts));
    });

    it('should be done on next iteration', () => {
        expect(genObject.next().done).toBeTruthy();
    });
});

describe('Contacts store getContacts saga', () => {
    it('should call api and dispatch success action', async () => {
        const contacts = [
            {
                "id": "q123",
                "name": {
                    "first": "Cristiano",
                    "last": "Ronaldo"
                },
                "email": "cristiano.ronaldo@example.com",
                "phone": "0681234567",
                "status": "Work"
            }
        ];

        const requestContacts = jest.spyOn(api, 'callContacts')
            .mockImplementation(() => Promise.resolve({ body: contacts }));

        const dispatched = [];

        await runSaga({
            dispatch: (action) => dispatched.push(action),
        }, Contacts.getContacts);

        expect(requestContacts).toHaveBeenCalledTimes(1);

        expect(dispatched).toEqual([Contacts.actions.fetchContactsSuccess(contacts)]);

        requestContacts.mockClear();
    });
});
