import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Input } from "reactstrap";

export default class CreditorModalForm extends Component {

    onChange = (e) => {
        let value = e.target.value;
        if (e.target.type === 'select-one' && e.target.name === 'creditorType') {
            if (value === '404') {
                console.log(true)
                this.props.changeForm(true)
            } else {
                console.log(false)
                this.props.changeForm(false)
            }
        }
        this.props.onChange(e, 'creditor');
    }
    render() {
        let { data, editMode, options } = this.props;
        console.log("CreditorModalForm -> render -> data", data)
        let optionData = options.map((item, index) => (
            <option value={item.id} key={index} selected={editMode && item.id === data.creditorType}>{item.category}</option>
        ));
        let tlData = [
            'ALWAYS',
            'NEVER',
            'OCCASIONALLY']
        let timesLateOptionData = tlData.map((item, index) => (
            <option value={item} key={index} selected={editMode && item === data.numberOfTimesLate} > {item}</option>
        ))
        let dateData = [];
        for (let i = 1; i < 32; i++) {
            dateData.push(<option key={i} value={i}>{i}</option>)
        }
        return (
            <div>
                <Form>
                    <Row className="align-items-center">
                        <Col md="12">
                            <Row className="align-items-center">
                                <Col md="4" className="field-name">
                                    <FormGroup>
                                        Creditor
                            </FormGroup>
                                </Col>
                                <Col md="8">
                                    <FormGroup>
                                        <Input type="text" id="creditor" name="creditor" defaultValue={editMode ? data.creditor : ''} placeholder="Creditor" onChange={this.onChange} />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="12">
                            <Row className="align-items-center">
                                <Col md="4" className="field-name">
                                    <FormGroup>
                                        Type
                            </FormGroup>
                                </Col>
                                <Col md="8">
                                    <FormGroup>
                                        <Input type="select" id="creditorType" name="creditorType" onChange={this.onChange} >
                                            {optionData}
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="12">
                            <Row className="align-items-center">
                                <Col md="4" className="field-name">
                                    <FormGroup>
                                        Balance
                            </FormGroup>
                                </Col>
                                <Col md="8">
                                    <FormGroup>
                                        <Input
                                            type="number" min="0"
                                            id="balance" name="balance"
                                            placeholder="Balance"
                                            defaultValue={editMode ? data.balance : ''}
                                            onChange={this.onChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="12">
                            <Row className="align-items-center">
                                <Col md="4" className="field-name">
                                    <FormGroup>
                                        APR
                            </FormGroup>
                                </Col>
                                <Col md="8">
                                    <FormGroup>
                                        <Input
                                            type="number"
                                            min="0" id="apr"
                                            name="apr"
                                            onChange={this.onChange}
                                            defaultValue={editMode ? data.apr : ''}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="12" className={this.props.creditCard ||
                            (editMode && data.creditorTypeName === 'Credit Card') ||
                            (editMode && data.creditorTypeName !== 'Credit Card' && this.props.creditCard) ? '' : 'd-none'}>
                            <Row className="align-items-center">
                                <Col md="4" className="field-name">
                                    <FormGroup>
                                        Credit Card Limit
                                        </FormGroup>
                                </Col>
                                <Col md="8">
                                    <FormGroup>
                                        <Input
                                            type="number" min="0"
                                            id="creditLimit" name="creditLimit"
                                            placeholder="limit"
                                            defaultValue={editMode ? data.creditLimit : ''}
                                            onChange={this.onChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="12" className={this.props.creditCard ||
                            (editMode && data.creditorType === 404) ||
                            (editMode && data.creditorType !== 404 && this.props.creditCard) ? 'd-none' : ''}>
                            <Row className="align-items-center">
                                <Col md="4" className="field-name">
                                    <FormGroup>
                                        Original Amount
                                            </FormGroup>
                                </Col>
                                <Col md="8">
                                    <FormGroup>
                                        <Input
                                            type="number" min="0"
                                            id="originalLoanAmount" name="originalLoanAmount"
                                            placeholder="Original Loan Amount"
                                            defaultValue={editMode ? data.originalLoanAmount : ''}
                                            onChange={this.onChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="12">
                            <Row className="align-items-center">
                                <Col md="4" className="field-name">
                                    <FormGroup>
                                        Times Late
                            </FormGroup>
                                </Col>
                                <Col md="8">
                                    <FormGroup>
                                        <Input
                                            type="select"
                                            id="numberOfTimesLate" name="numberOfTimesLate"
                                            placeholder="Number of Times Late"
                                            onChange={this.onChange}
                                        >
                                            {timesLateOptionData}
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="12">
                            <Row className="align-items-center">
                                <Col md="4" className="field-name">
                                    <FormGroup>
                                        Monthly Payment
                            </FormGroup>
                                </Col>
                                <Col md="8">
                                    <FormGroup>
                                        <Input
                                            type="number" min="0"
                                            id="payment" name="payment"
                                            placeholder="payment"
                                            defaultValue={editMode ? data.payment : ''}
                                            onChange={this.onChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="12">
                            <Row className="align-items-center">
                                <Col md="4" className="field-name">
                                    <FormGroup>
                                        Date
                            </FormGroup>
                                </Col>
                                <Col md="8">
                                    <FormGroup>
                                        <Input type="date" id="date" name="date" defaultValue={editMode ? data.date : 0} onChange={this.onChange} />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="12">
                            <Row className="align-items-center">
                                <Col md="4" className="field-name">
                                    <FormGroup>
                                        Years Paying
                            </FormGroup>
                                </Col>
                                <Col md="8">
                                    <FormGroup>
                                        <Input
                                            type="number" min="0"
                                            id="numberOfYearsPaying" name="numberOfYearsPaying"
                                            placeholder="Number of Years Paying"
                                            defaultValue={editMode ? data.numberOfYearsPaying : ''}
                                            onChange={this.onChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        {this.props.creditCard || (editMode && data.creditorType === 404) ? '' : (
                            <Col md="12">
                                <Row className="align-items-center">
                                    <Col md="4" className="field-name">
                                        <FormGroup>
                                            Market Value
                            </FormGroup>
                                    </Col>
                                    <Col md="8">
                                        <FormGroup>
                                            <Input
                                                type="number" min="0"
                                                id="marketValue" name="marketValue"
                                                placeholder="Market Value"
                                                defaultValue={editMode ? data.marketValue : ''}
                                                onChange={this.onChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                        )}
                    </Row>
                </Form>
            </div>
        )
    }
}
