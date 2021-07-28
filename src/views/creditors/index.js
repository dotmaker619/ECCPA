import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Button, Table } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { ToggleModal } from "actions/modalAction";
import { getCreditor, deleteCreditor } from "actions/creditorActions";
import swal from 'sweetalert';
import formatMoney from 'views/utils';


class Creditors extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    toggleModal = () => {
        this.props.ToggleModal('creditor')
    }

    editField = (data) => {
        this.props.ToggleModal('creditor', data)
    }

    deleteItem = (id) => {
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.props.deleteCreditor(id)
                }
            });
    };

    UNSAFE_componentWillMount() {
        this.props.getCreditor();
    }

    render() {
        let { data } = this.props;
        let activeData = [];
        if (data.status) {
            activeData = data.data.filter(x => { return x.status === 'ACTIVE' })
        }
        let tablebody = activeData.map((item, index) => (
            <tr key={index}>
                <td>{item.creditor}</td>
                <td>{item.creditorTypeName}</td>
                <td>${(item.balance).toFixed(0)}</td>
                <td>{parseFloat(formatMoney(item.apr)).toFixed(2)}%</td>
                <td>{item.date}</td>
                <td className="text-center">${parseFloat(formatMoney(item.payment)).toFixed(1)}</td>
                <td>${parseFloat(formatMoney(item.creditLimit)).toFixed(1)}</td>
                <td>${parseFloat(formatMoney(item.marketValue)).toFixed(1)}</td>
                <td>{parseFloat(formatMoney(item.yearsToPayOff)).toFixed(1)}</td>
                <td>{parseFloat(formatMoney(item.proxy)).toFixed(0)}</td>
                <td className="d-flex">
                    <i className="fas fa-pencil-alt table-action" onClick={() => this.editField(item)}></i>
                    <i className="fas fa-trash-alt m-auto table-action" onClick={() => this.deleteItem(item.creditorId)}></i>
                </td>
            </tr>
        ))
        return (
            <div className="content">
                <Card className="main-area">
                    <CardHeader className="d-flex align-items-center">
                        <h5 className="card-category">Creditors</h5>
                        <Button color="primary" className="ml-auto" onClick={this.toggleModal}>
                            Add New Creditor
                    </Button>
                    </CardHeader>
                    <CardBody>
                        {/* <div className="main-area"> */}
                        {tablebody.length ?
                            (<Table hover className="creditor-table">
                                <thead>
                                    <tr>
                                        <th>creditor</th>
                                        <th>Type</th>
                                        <th>Balance</th>
                                        <th>APR</th>
                                        <th>date</th>
                                        <th>monthly payment</th>
                                        <th>limit</th>
                                        <th>market value</th>
                                        <th>years to payoff</th>
                                        <th>proxy</th>
                                        <th>actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tablebody}
                                </tbody>
                            </Table>) : 'There are no result'}
                        {/* </div> */}
                    </CardBody>
                </Card>
            </div>
        )
    }
}

Creditors.propsTypes = {
    ToggleModal: PropTypes.func.isRequired,
    getCreditor: PropTypes.func.isRequired,
    deleteCreditor: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapDispatchToProps = {
    ToggleModal,
    getCreditor,
    deleteCreditor
}
const mapStateToProps = (state) => ({
    data: state.creditor,
    types: state.types
})



const CreditorsMapped = connect(mapStateToProps, mapDispatchToProps)(Creditors);

export default CreditorsMapped