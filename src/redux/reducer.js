import { combineReducers } from "redux";
import ContactActions from './Contacts';

export default combineReducers({
    Contacts: ContactActions.reducer
})