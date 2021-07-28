import React, { Component } from 'react'
import { Row, Col, Form, FormGroup, Input } from "reactstrap";

export default class IncomeModalForm extends Component {

    onChange = (e) => {
        this.props.onChange(e, 'income')
    }
    render() {
        let { data, editMode, options } = this.props
        let optionData = options.map((item, index) => (
            <option value={item.id} key={index} selected={editMode && data.incomeType === item.id}>{item.category}</option>
        ))
        return (
            <div>
                <Form>
                    <Row className="align-items-center">
                        <Col md="4" className="field-name">
                            <FormGroup>
                                Company
                            </FormGroup>
                        </Col>
                        <Col md="8">
                            <FormGroup>
                                <Input
                                    type="text" id="company"
                                    defaultValue={editMode ? data.company : ''}
                                    name="company"
                                    placeholder="Company"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="4" className="field-name">
                            <FormGroup>
                                Type
                            </FormGroup>
                        </Col>
                        <Col md="8">
                            <FormGroup>
                                <Input type="select" id="incomeType" name="incomeType" placeholder="Income Type" onChange={this.onChange}>
                                    {optionData}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="4" className="field-name">
                            <FormGroup>
                                Net Amount
                            </FormGroup>
                        </Col>
                        <Col md="8">
                            <FormGroup>
                                <Input
                                    type="number" min="0"
                                    defaultValue={editMode ? data.netAmount : ''}
                                    id="netAmount"
                                    name="netAmount"
                                    placeholder="Net Amount"
                                    onChange={this.onChange}
                                />
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
