import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Button, Table } from 'reactstrap';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { ToggleModal } from "actions/modalAction";
import { getIncome, deleteIncome } from "actions/incomeActions";
import swal from 'sweetalert';
import formatMoney from 'views/utils'


class Income extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
    }

    toggleModal = () => {
        this.props.ToggleModal('Income')
    }

    editField = (data) => {
        this.props.ToggleModal('Income', data)
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
                    this.props.deleteIncome(id)
                }
            });
    }

    UNSAFE_componentWillMount() {
        this.props.getIncome()
    }
    getTypes(id) {
        try {
            return this.props.types.data.filter(x => { return x.id === id })[0].category
        } catch (error) {
            return 'Unknown'
        }
    }

    render() {
        let { data } = this.props;
        let activeData = data.data.filter(x => { return x.status === 'ACTIVE' });
        let tablebody = activeData.map((item, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.company}</td>
                <td>{item.incomeTypeName}</td>
                <td>$ {formatMoney(item.netAmount)}</td>
                <td>{item.date}</td>
                <td className="d-flex">
                    <i className="fas fa-pencil-alt table-action" onClick={() => this.editField(item)}></i>
                    <i className="fas fa-trash-alt m-auto table-action" onClick={() => this.deleteItem(item.incomeId)}></i>
                </td>
            </tr>
        ))
        return (
            <div className="content">
                <Card className="main-area">
                    <CardHeader className="d-flex align-items-center">
                        <h5 className="card-category">Income</h5>
                        <Button color="primary" className="ml-auto" onClick={this.toggleModal}>
                            Add New Income
                        </Button>
                    </CardHeader>
                    <CardBody>
                        <div className="main-area">
                            {data.status ?
                                (
                                    activeData.length ?
                                        (<Table hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Company</th>
                                                    <th>Type</th>
                                                    <th>Amount</th>
                                                    <th>Date</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tablebody}
                                            </tbody>
                                        </Table>) : (
                                            <p>
                                                There are no result.
                                            </p>)
                                )
                                : ''
                            }
                        </div>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

Income.propsTypes = {
    ToggleModal: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    getIncome: PropTypes.func.isRequired,
    deleteIncome: PropTypes.func.isRequired
}

const mapDispatchToProps = {
    ToggleModal,
    getIncome,
    deleteIncome
}

const mapStateToProps = (state) => ({
    data: state.income,
    types: state.types
})



const IncomeMapped = connect(mapStateToProps, mapDispatchToProps)(Income)
export default IncomeMapped