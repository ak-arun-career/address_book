import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ContactStore from 'Store/Contacts';
import Contact from './Contact';

export const Contacts = ({ editContact }) => {
    const dispatch = useDispatch();
    const [listOfContacts, setListOfContacts] = useState([]);

    /** Fetch contacts on page load */
    useEffect(() => {
        dispatch(ContactStore.actions.fetchContacts());
    }, []);

    const ContactsArray = useSelector(state => {
        return state.Contacts
    });

    /** Set list of contacts when list is updated */
    useEffect(() => {
        setListOfContacts(ContactsArray.contacts);
        setActive(statuses[0]);
    }, [ContactsArray.contacts]);

    /** Status filter tabs */
    const statuses = ['All', 'Private', 'Work'];
    const [active, setActive] = useState(statuses[0]);

    /** Function to fetch filtered list of contacts based on status selected */
    const fetchContactsBasedOnTabSelected = (status) => {
        setActive(status);

        const tempContactsArray = ContactsArray.contacts.filter(contact => {
            if (status !== 'All') {
                return contact.status === status
            }
            return contact;
        });
        setListOfContacts(tempContactsArray);
    }

    /**
     * Function to display the list of contacts
     * Returns a message when no contacts are found
     */
    const list = () => {
        if (listOfContacts.length > 0) {
            return (
                <ContactList>
                    {
                        listOfContacts.map(contact => (
                            <Contact
                                key={contact.id}
                                details={contact}
                                editContact={(data) => editContact(data)}
                            />
                        ))
                    }
                </ContactList>
            )
        } else {
            return <Message>No Contacts found!!</Message>
        }
    }

    return (
        <>
            <Tabs>
                {statuses.map((status) => (
                    <Tab
                        key={status}
                        active={active === status}
                        onClick={() => fetchContactsBasedOnTabSelected(status)}
                        className={(active === status) && 'selected'}>
                        {status}
                    </Tab>
                ))}
            </Tabs>

            { list() }
        </>
    );
}

const ContactList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    @media screen and (max-width: 1024px) {
        & {
            grid-template-columns: 1fr 1fr;
            justify-items: center;
        }
    }
    @media screen and (max-width: 480px) {
        & {
            grid-template-columns: 1fr;
            justify-items: center;
        }
    }
`;

const Tabs = styled.div`
    display: flex;
    justify-content: center;
    padding: 12px 0;
    background: lightgray;;
`;

const Tab = styled.button`
    min-width: 5rem;
    height: 2rem;
    background: transparent;
    border: 0;
    color: darkslategray;
    font-size: 1rem;
    margin: 0 4px;
    border-radius: 6px;

    &.selected {
        background: lightseagreen;
        color: lavender;
    }
`;

const Message = styled.div`
    text-align: center;
    padding: 6px 0;
`;