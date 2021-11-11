import { fork, all } from "redux-saga/effects";
import map from "lodash/map";

import Contacts from './Contacts';

const combinedSagas = [
    Contacts.saga
];

export default function* root() {
    yield all(map(combinedSagas, fork));
}