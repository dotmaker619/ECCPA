import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Input } from "reactstrap";

export default class AssetsModalForm extends Component {

    onChange = (e) => {
        this.props.onChange(e, 'asset');
    }
    render() {
        let { data, editMode, options } = this.props;
        let optionData = options.map((item, index) => (
            <option value={item.id} key={index} selected={editMode && data.assetType === item.id}>{item.category}</option>
        ))
        return (
            <div>
                <Form>
                    <Row className="align-items-center">
                        <Col md="4" className="field-name">
                            <FormGroup>
                                Institution
                            </FormGroup>
                        </Col>
                        <Col md="8">
                            <FormGroup>
                                <Input type="text" id="institution" name="institution" defaultValue={editMode ? data.institution : ''} placeholder="Institution" onChange={this.onChange} />
                            </FormGroup>
                        </Col>
                        <Col md="4" className="field-name">
                            <FormGroup>
                                Account Type
                            </FormGroup>
                        </Col>
                        <Col md="8">
                            <FormGroup>
                                <Input type="select" id="assetType" name="assetType" onChange={this.onChange} >
                                    {optionData}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="4" className="field-name">
                            <FormGroup>
                                Balance
                            </FormGroup>
                        </Col>
                        <Col md="8">
                            <FormGroup>
                                <Input type="number" min="0" id="balance" name="balance" placeholder="Balance" defaultValue={editMode ? data.balance : ''} onChange={this.onChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
