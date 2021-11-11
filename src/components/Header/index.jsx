import React from "react";
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

const Header = ({ showForm }) => (
    <Container>
        <PageTitle>Address Book</PageTitle>

        <ActionButton onClick={() => showForm()}>
            <FaPlus /> Add Contact
        </ActionButton>
    </Container>
);

export default Header;

const Container = styled.div`
    background: darkslategray;
    padding: 1rem;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const PageTitle = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: lightgray;
`;

const ActionButton = styled.button`
    background: lightseagreen;
    color: white;
    border-radius: 6px; 
    border: 0;
    font-size: 1rem;
    transition: box-shadow 0.4s ease-in-out;
    padding: 6px;

    &:hover {
        cursor: pointer;
        box-shadow: 0 0 2px 2px black;
    }
`;