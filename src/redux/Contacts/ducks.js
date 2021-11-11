import { takeEvery, call, put, StrictEffect, takeLatest } from "redux-saga/effects";
import request from "superagent";
import api from '../api';

export const types = {
    FETCH_CONTACTS: 'FETCH_CONTACTS',
    FETCH_CONTACTS_SUCCESS: 'FETCH_CONTACTS_SUCCESS',
    ERROR: 'ERROR',
    ADD_CONTACT: 'ADD_CONTACT',
    ADD_TO_EDIT: 'ADD_TO_EDIT',
    CLEAR_AFTER_EDIT: 'CLEAR_AFTER_EDIT',
    EDIT_CONTACT: 'EDIT_CONTACT',
    DELETE_CONTACT: 'DELETE_CONTACT'
}

export const actions = {
    fetchContacts: () => ({
        type: types.FETCH_CONTACTS
    }),
    fetchContactsSuccess: (contacts) => ({
        type: types.FETCH_CONTACTS_SUCCESS,
        contacts
    }),
    errorScenario: (error) => ({
        type: types.ERROR,
        error
    }),
    addContact: (contact) => ({
        type: types.ADD_CONTACT,
        contact
    }),
    addToEdit: (contact) => ({
        type: types.ADD_TO_EDIT,
        contact
    }),
    clearAfterEdit: () => ({
        type: types.CLEAR_AFTER_EDIT,
    }),
    editContact: (contact) => ({
        type: types.EDIT_CONTACT,
        contact
    }),
    deleteContact: (contact) => ({
        type: types.DELETE_CONTACT,
        contact
    })
};

const initialState = {
    contacts: [],
    contactToEdit: {},
    error: ""
};

export default function contactReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_CONTACTS: {
            return {
                ...state
            }
        }
        case types.FETCH_CONTACTS_SUCCESS: {
            return {
                ...state,
                contacts: action.contacts
            }
        }

        case types.ERROR:
            return {
                ...state,
                error: action.error
            }

        case types.ADD_CONTACT:
            return {
                ...state,
                contacts: [
                    ...state.contacts,
                    action.contact
                ]
            };

        case types.ADD_TO_EDIT:
            return {
                ...state,
                contactToEdit: action.contact
            }

        case types.CLEAR_AFTER_EDIT:
            return {
                ...state,
                contactToEdit: {}
            }

        case types.EDIT_CONTACT:
            return {
                ...state,
                contacts: [
                    ...state.contacts.map(contact => {
                        if (contact.id === action.contact.id) {
                            return action.contact
                        }
                        else {
                            return contact
                        }
                    })
                ]
            }

        case types.DELETE_CONTACT:
            return {
                ...state,
                contacts: [
                    ...state.contacts.filter(contact => (contact.id !== action.contact))
                ]
            };

        default: return state;
    }
}

export function* saga() {
    yield takeEvery(types.FETCH_CONTACTS, getContacts);
}

export function* getContacts() {
    try {
        const response = yield call(api.callContacts);
        yield put(actions.fetchContactsSuccess(response.body));
    }
    catch (error) {
        yield put(actions.errorScenario("Error"));
    }
}
