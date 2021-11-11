import React from 'react';
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ContactForm = ({ submitForm, cancelForm }) => {
    const contactForEditing = useSelector(state => {
        return state.Contacts.contactToEdit
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: contactForEditing
    });

    const onSubmit = data => submitForm(data);

    return (
        <Mask>
            <Container>
                <TitleBar>{ (Object.keys(contactForEditing).length > 0) ? `Edit` : `Add` } Contact </TitleBar>
                <Form>
                    <VerticalSpacer>
                        <Label className={'mandatory-field'}>First Name:</Label>
                        <input
                            placeholder='First Name'
                            type='text'
                            {...register("firstName", { required: true })} />
                        {errors.firstName && <ErrorMsg>This field is required</ErrorMsg>}
                    </VerticalSpacer>
                    <VerticalSpacer>
                        <Label>Last Name:</Label>
                        <input
                            placeholder='Last Name'
                            type='text'
                            {...register("lastName")} />
                    </VerticalSpacer>
                    <VerticalSpacer>
                        <Label>Email: </Label>
                        <input
                            placeholder='Email'
                            type='text'
                            {...register("email", { pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/ })} />
                        {errors.email && <ErrorMsg>Please enter a valid email id</ErrorMsg>}
                    </VerticalSpacer>
                    <VerticalSpacer>
                        <Label>Phone: </Label>
                        <input
                            placeholder='Phone'
                            type='tel'
                            maxLength={10}
                            {...register("phone", { pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ })} />
                        {errors.phone && <ErrorMsg>Please enter a 10-digit phone number</ErrorMsg>}
                    </VerticalSpacer>
                    <VerticalSpacer>
                        <Label className={"mandatory-field"}>Status:</Label>
                        <select
                            placeholder='Status'
                            {...register("status", { required: true })}
                        >
                            <option value=''></option>
                            <option value='Private'>Private</option>
                            <option value='Work'>Work</option>
                        </select>
                        {errors.status && <ErrorMsg>This field is required</ErrorMsg>}
                    </VerticalSpacer>
                    <Footer>
                        <ActionButton onClick={handleSubmit(onSubmit)}>OK</ActionButton>
                        <CancelButton onClick={cancelForm()}>Cancel</CancelButton>
                    </Footer>
                </Form>
            </Container>
        </Mask>
    );
};

export default ContactForm;

const Mask = styled.div`
    position: absolute;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
`;

const Container = styled.div`
    background: white;
    position: absolute;
    z-index: 3;
    border-radius: 6px;
    box-shadow: 0 0 6px 2px lightgray;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 250px;
    margin-left: -150px;
    margin-top: -125px;
`;

const TitleBar = styled.div`
    padding: 6px;
    background: darkslategray;
    color: white;
    border-radius: 6px 6px 0 0;
    text-align: center;
`;

const Form = styled.form`
    padding: 6px;
`;

const VerticalSpacer = styled.div`
    padding: 3px 0;
`;

const Label = styled.label`
    display: inline-block;
    min-width: 100px;
    color: darkslategray;

    &.mandatory-field::after {
        content: '*';
        color: red;
    }
`;

const ErrorMsg = styled.div`
    color: red;
    font-size: 0.7rem;
`;

const Footer = styled.div`
    position: absolute;
    right: 6px;
    bottom: 6px;
`;

const ActionButton = styled.button`
    background: lightseagreen;
    border: 0;
    padding: 2px 4px;
    margin: 0 2px;
    color: white;
    font-size: 1rem;

    &:hover {
        cursor: pointer;
    }
`;

const CancelButton = styled.button`
    background: transparent;
    border: 0;
    padding: 2px 4px;
    margin: 0 2px;
    color: darkslategray;
    font-size: 1rem;
    border: 1px solid transparent;

    &:hover {
        cursor: pointer;
    border-color: darkslategray;
    }
`;