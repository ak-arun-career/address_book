import React from "react";
import styled from 'styled-components';
import { FaEnvelope, FaPencilAlt, FaPhoneAlt, FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import ContactActions from 'Store/Contacts';

const Contact = ({ details, editContact }) => {
    const dispatch = useDispatch();
    
    /** Function to modify details according to form layout and edit the contact */
    const editAContact = () => {
        const updatedContactDetails = {
            id: details.id,
            firstName: details.name.first,
            lastName: details.name.last,
            phone: details.phone,
            email: details.email,
            status: details.status
        };

        return editContact(updatedContactDetails);
    };

    /** Function to call a delete */
    const delContact = (id) => dispatch(ContactActions.actions.deleteContact(id));

    return (
        <Container>
            <TitlePanel>
                <div>
                    <Name>{details.name.first} {details.name.last}</Name>
                    <Status className={details.status}>{details.status}</Status>
                </div>
                <div>
                    <ActionButton onClick={() => editAContact()}>
                        <FaPencilAlt color={"green"}/>
                    </ActionButton>
                    <ActionButton onClick={() => delContact(details.id)}>
                        <FaTrashAlt color={"red"}/>
                    </ActionButton>
                </div>
            </TitlePanel>
            <SubContainer>
                <Info>
                    <FaPhoneAlt />
                    <Label>{details.phone}</Label>
                </Info>
                <Info>
                    <FaEnvelope />
                    <Label>{details.email}</Label>
                </Info>
            </SubContainer>
        </Container>
    )
};

const Container = styled.div`
    margin: 2px 0;
    padding: 6px;
    min-width: 16rem;;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    background: white;
    border-radius: 6px;
    box-shadow: 0 0 6px 4px gainsboro;
    margin: 12px;
    color: darkslategray;
`;

const TitlePanel = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 6px;
`;

const SubContainer = styled.div`
    border-top: 1px solid darkslategray;
    box-shadow: 0 -1px 0 lightgray;
    padding: 6px;
`;

const Name = styled.a`
    display: inline-block;
    font-weight: bold;
    margin: 0;
    padding: 0;
`;

const Label = styled.span`
    display: inline-block;
    padding-left: 0.25rem;
`;

const Status = styled.span`
    font-size: 0.6rem;
    border-radius: 2px;
    margin: 0 4px;
    padding: 2px 2px;
    color: lightgray;

    &.Work {
        background: darkslateblue;
    }

    &.Private {
        background: darkolivegreen
    }
`;

const Info = styled.div`
    font-size: 0.9rem;

    & svg {
        display: inline-block;
        margin-top: 2px;
    }
`;

const ActionButton = styled.button`
    background: transparent;
    border: 0;   
    padding: 2px;
    margin: 0 2px;
    color: darkslategray;

    &:hover {
        cursor: pointer;
    }
`;

export default Contact;