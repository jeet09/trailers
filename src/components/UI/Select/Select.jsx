import React from 'react';
import { Form } from 'react-bootstrap';

const uiselect = (props) => (
    <>
        {props.options.length > 0 ? 
            <Form>
                <Form.Group controlId={props.formControlID}>
                    {props.label ? <Form.Label>{props.label}</Form.Label>: <></>}
                    <Form.Control as="select" onChange={props.onChange} value={props.selectedValue}>
                        {
                            props.options.map((v,k) => {
                                return <option key={k}>{v}</option>
                            })
                        }               
                    </Form.Control>
                </Form.Group>
            </Form> : <></> }
    </>
);

export default uiselect;