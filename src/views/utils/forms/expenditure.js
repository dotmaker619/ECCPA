import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Input } from "reactstrap";

export default class ExpenditureModalForm extends Component {

    onChange = (e) => {
        this.props.onChange(e, 'expenditure');
    }
    render() {
        let { data, editMode, options } = this.props
        let optionData = options.map((item, index) => (
            <option value={item.id} key={index} selected={editMode && item.id === data.expenditureType}>{item.category}</option>
        ))
        return (
            <div>
                <Form>
                    <Row className="align-items-center">
                        <Col md="4" className="field-name">
                            <FormGroup>
                                Expense
                            </FormGroup>
                        </Col>
                        <Col md="8">
                            <FormGroup>
                                <Input type="text" id="expense" name="expense" defaultValue={editMode ? data.expense : ''} placeholder="Expense" onChange={this.onChange} />
                            </FormGroup>
                        </Col>
                        <Col md="4" className="field-name">
                            <FormGroup>
                                Type
                            </FormGroup>
                        </Col>
                        <Col md="8">
                            <FormGroup>
                                <Input type="select" id="expenditureType" name="expenditureType" onChange={this.onChange} >
                                    {optionData}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="4" className="field-name">
                            <FormGroup>
                                Amount
                            </FormGroup>
                        </Col>
                        <Col md="8">
                            <FormGroup>
                                <Input type="number" min="0" id="amount" name="amount" placeholder="Amount" defaultValue={editMode ? data.amount : ''} onChange={this.onChange} />
                            </FormGroup>
                        </Col>
                        <Col md="4" className="field-name">
                            <FormGroup>
                                Date
                            </FormGroup>
                        </Col>
                        <Col md="8">
                            <FormGroup>
                                <Input type="date" id="payDay" name="date" placeholder="Pay Day" defaultValue={editMode ? data.date : 0} onChange={this.onChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
