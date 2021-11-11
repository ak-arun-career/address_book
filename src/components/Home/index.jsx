import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactActions from '../../redux/Contacts';
import { Contacts } from '../Contacts';
import ContactForm from '../Contacts/ContactForm';
import Header from '../Header';

export const Home = () => {
    const [showContactForm, setShowContactForm] = useState(false);
    const [formAction, setFormAction] = useState(null);
    const dispatch = useDispatch();

    /** Function to display the contact form
     * In case a contact is edited, the form comes pre-filled with the contact details
     */
    const showForm = (data, action) => {
        if (action === 'edit') {
            dispatch(ContactActions.actions.addToEdit(data))
        }
        setShowContactForm(true);
        setFormAction(action);
    };

    /** Function to generate a unique id to be used while adding a contact */
    const generateUniqueId = (length = 4) => {
        return nanoid(length);
    };

    /** Submit form */
    const onSubmitContactForm = data => {
        closeForm();

        const contactData = {
            "id": (data.id || generateUniqueId()),
            "name": {
                "first": data.firstName,
                "last": data.lastName
            },
            "email": data.email,
            "phone": data.phone,
            "status": data.status
        };

        /* Dispatch respective action based on formAction */
        (formAction === 'edit') ? dispatch(ContactActions.actions.editContact(contactData)) : dispatch(ContactActions.actions.addContact(contactData));
    };

    /** Function to close the contact form */
    const closeForm = () => {
        setShowContactForm(false);
        dispatch(ContactActions.actions.clearAfterEdit());
    };

    return (
        <>
            <Header showForm={() => showForm({}, 'add')} />

            {showContactForm &&
                <ContactForm
                    submitForm={(data) => onSubmitContactForm(data)}
                    cancelForm={() => closeForm}
                />
            }

            <Contacts
                editContact={(data) => showForm(data, 'edit')}
            />
        </>
    );
};