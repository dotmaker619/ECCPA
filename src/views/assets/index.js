import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Button, Table } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { ToggleModal } from "actions/modalAction";
import { getAssets, deleteAssets } from "actions/assetsAcction";
import swal from 'sweetalert';
import formatMoney from 'views/utils'

class Assets extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    toggleModal = () => {
        this.props.ToggleModal('Asset')
    }

    editField = (data) => {
        this.props.ToggleModal('Asset', data)
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
                    this.props.deleteAssets(id)
                }
            });
    }

    UNSAFE_componentWillMount() {
        this.props.getAssets();
    }
    render() {
        let { data } = this.props;
        let activeData = data.data.filter(x => { return x.status === 'ACTIVE' })
        let tablebody = activeData.map((item, index) => (
            <tr key={index}>
                <td>{item.institution}</td>
                <td>{item.assetTypeName}</td>
                <td>$ {formatMoney(item.balance)}</td>
                <td className="d-flex">
                    <i className="fas fa-pencil-alt table-action" onClick={() => this.editField(item)}></i>
                    <i className="fas fa-trash-alt m-auto table-action" onClick={() => this.deleteItem(item.assetId)}></i>
                </td>
            </tr>
        ))
        return (
            <div className="content">
                <Card className="main-area">
                    <CardHeader className="d-flex align-items-center">
                        <h5 className="card-category">Assets</h5>
                        <Button color="primary" className="ml-auto" onClick={this.toggleModal}>
                            Add New Asset
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
                                                    <th>Institution</th>
                                                    <th>Account Type</th>
                                                    <th>Balance</th>
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

Assets.propsTypes = {
    ToggleModal: PropTypes.func.isRequired,
    getAssets: PropTypes.func.isRequired,
    deleteAssets: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapDispatchToProps = {
    ToggleModal,
    getAssets,
    deleteAssets
}

const mapStateToProps = (state) => ({
    data: state.assets,
    types: state.types
})


const AssetsMapped = connect(mapStateToProps, mapDispatchToProps)(Assets)

export default AssetsMapped