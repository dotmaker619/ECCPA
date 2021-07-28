import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Button, Table } from "reactstrap";

import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { ToggleModal } from "actions/modalAction";
import { getExpenditure, deleteExpenditure } from "actions/expenditureActions";
import swal from 'sweetalert';
import formatMoney from 'views/utils'

class Expenditure extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    toggleModal = () => {
        this.props.ToggleModal('expenditure')
    }

    editField = (data) => {
        this.props.ToggleModal('expenditure', data)
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
                    this.props.deleteExpenditure(id)
                }
            });
    };

    UNSAFE_componentWillMount() {
        this.props.getExpenditure();
    }

    render() {
        let { data } = this.props
        let activeData = data.data.filter(x => { return x.status === 'ACTIVE' })
        let tablebody = activeData.map((item, index) => (
            <tr key={index}>
                <td>{item.expense}</td>
                <td>{item.expenditureTypeName}</td>
                <td> {item.date}</td>
                <td>$ {formatMoney(item.amount)}</td>
                <td className="d-flex">
                    <i className="fas fa-pencil-alt table-action" onClick={() => this.editField(item)}></i>
                    <i className="fas fa-trash-alt m-auto table-action" onClick={() => this.deleteItem(item.expenditureId)}></i>
                </td>
            </tr>
        ))
        return (
            <div className="content">
                <Card className="main-area">
                    <CardHeader className="d-flex align-items-center">
                        <h5 className="card-category">Expenditure</h5>
                        <Button color="primary" className="ml-auto" onClick={this.toggleModal}>
                            Add New Expenditure
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
                                                    <th>Expense</th>
                                                    <th>type</th>
                                                    <th>Date</th>
                                                    <th>Amount</th>
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

Expenditure.propsTypes = {
    data: PropTypes.object.isRequired,
    ToggleModal: PropTypes.func.isRequired,
    getExpenditure: PropTypes.func.isRequired,
    deleteExpenditure: PropTypes.func.isRequired,
    types: PropTypes.object.isRequired
}

const mapDispatchToProps = {
    ToggleModal,
    getExpenditure,
    deleteExpenditure
}

const mapStateToProps = (state) => ({
    data: state.expenditure,
    types: state.types
})


const ExpenditureMapped = connect(mapStateToProps, mapDispatchToProps)(Expenditure)

export default ExpenditureMapped