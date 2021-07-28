import React, {
    Component
} from 'react'
import {
    Modal,
    Button,
    ModalBody
} from "reactstrap";

import {
    connect
} from "react-redux";
import PropTypes from 'prop-types';
import {
    ToggleModal
} from "actions/modalAction";
import {
    createAssets,
    editAssets
} from "actions/assetsAcction"
import {
    createIncome,
    editIncome
} from "actions/incomeActions"
import {
    createExpenditure,
    editExpenditure
} from "actions/expenditureActions";
import {
    createCreditor,
    editCreditor
} from "actions/creditorActions";
//modal Forms
import Assets from './forms/assets';
import Income from './forms/income';
import Expenditure from './forms/expenditure';
import Creditor from './forms/creditors'
import notify from 'views/utils/notification';

class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            asset: {
                institution: '',
                assetType: 100,
                balance: 0
            },
            income: {
                company: '',
                incomeType: 200,
                netAmount: 0,
                date: ''
            },
            expenditure: {
                expense: '',
                expenditureType: 300,
                amount: 0,
                date: ''
            },
            creditor: {
                creditor: '',
                creditorType: 400,
                balance: 0,
                date: '',
                numberOfTimesLate: "NEVER",
                originalLoanAmount: 0,
                numberOfYearsPaying: 0,
                apr: 0,
                payment: 0,
                creditLimit: 0,
                marketValue: 0,
            },
            editData: {},
            editMode: false,
            creditCard: false
        }
    }
    changeForm = (state) => {
        let currentState = this.state;
        currentState.creditCard = state;
        this.setState(currentState);
    }
    toggleModal = () => {
        this.props.ToggleModal()
    }
    selectModal = (title) => {
        let {
            data
        } = this.props.types;
        title = title ? title.toLowerCase() : '';
        switch (title) {
            case 'asset':
                return <Assets editMode = {
                    this.state.editMode
                }
                data = {
                    this.state.editData
                }
                options = {
                    data
                }
                onChange = {
                    this.onChange
                }
                />;
            case 'income':
                return <Income editMode = {
                    this.state.editMode
                }
                data = {
                    this.state.editData
                }
                options = {
                    data
                }
                onChange = {
                    this.onChange
                }
                />;
            case 'expenditure':
                return <Expenditure editMode = {
                    this.state.editMode
                }
                data = {
                    this.state.editData
                }
                options = {
                    data
                }
                onChange = {
                    this.onChange
                }
                />
            case 'creditor':
                return <Creditor editMode = {
                    this.state.editMode
                }
                data = {
                    this.state.editData
                }
                options = {
                    data
                }
                onChange = {
                    this.onChange
                }
                changeForm = {
                    this.changeForm
                }
                creditCard = {
                    this.state.creditCard
                }
                />
            default:
                return '';
        }
    }

    onChange = (e, type) => {
        e.preventDefault();
        let data;
        if (this.state.editMode) {
            data = this.state.editData;
        } else {
            data = this.state[type]
        }
        data[e.target.name] = e.target.type === 'number' || e.target.name === 'creditorType' ? parseFloat(e.target.value) : e.target.value
        this.setState({
            ...this.state,
            data
        });
    }

    selectAction = (title) => {
        let {
            createAssets,
            editAssets,
            editIncome,
            createIncome,
            createExpenditure,
            editExpenditure,
            createCreditor,
            editCreditor
        } = this.props;
        let {
            editMode
        } = this.state
        switch (title) {
            case 'asset':
                if (!editMode) {
                    return createAssets
                } else {
                    return editAssets
                }
                case 'income':
                    if (!editMode) {
                        return createIncome
                    } else {
                        return editIncome
                    }

                    case 'expenditure':
                        if (!editMode) {
                            return createExpenditure
                        } else {
                            return editExpenditure
                        }
                        case 'creditor':
                            if (!editMode) {
                                return createCreditor
                            } else {
                                return editCreditor
                            }
                            default:
                                return '';
        }
    }

    onSubmit(title) {
        title = title.toLowerCase()
        let action = this.selectAction(title);
        let data = this.state.editMode ? this.state.editData : this.state[title]
        console.log("ModalComponent -> onSubmit -> data", data)
        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            if (!data[keys[i]] && title !== 'creditor') {
                notify('error', 'Please complete the form', 'Form Error')
                return
            }
            console.log(keys[i], data.creditorType, data[keys[i]])
        }
        if ((title === 'creditor' && data.creditorType === 404 && data.balance > data.limit) || (data.balance > data.originalLoanAmount && title === 'creditor' && data.creditorType !== 404)) {
            notify('error', 'Limit cannot be less than balance.', 'Validation Error');
            return
        }
        if (action) {
            action(data)
            console.log("ModalComponent -> onSubmit -> data", data)
        }
        this.toggleModal()
    }

    UNSAFE_componentWillReceiveProps(props) {
        let {
            data,
            title
        } = props.modal
        title = title ? title.toLowerCase() : '';
        if (data) {
            if (title === 'creditor') {
                let keys = Object.keys(this.state.creditor);
                let editData = {}
                keys.forEach(key => {
                    editData[key] = data[key]
                });
                editData.creditorId = data.creditorId
                this.setState({
                    ...this.state,
                    editMode: true,
                    editData: editData
                })
            } else {
                this.setState({
                    ...this.state,
                    editMode: true,
                    editData: data
                })
            }
        } else {
            let data = this.state[title]
            if (!this.state.editMode && title) {
                let data = this.state[title];
                for (let entry in data) {
                    if (entry !== `${title}Type` && entry !== 'numberOfTimesLate') {
                        if (typeof data[entry] === 'number') {
                            data[entry] = 0;
                        } else {
                            data[entry] = '';
                        }
                    }
                }
            }
            this.setState({
                ...this.state,
                editMode: false,
                editData: {},
                [title]: data
            })
        }
    }
    render() {
        let { modal } = this.props;
        let form = this.selectModal(modal.title)
        return (
            <div>
                <Modal isOpen={modal.show}
                    toggle={this.toggleModal}>
                    <ModalBody>
                        <div className="modal-title mt-3">
                            {this.state.editMode ? "EDIT" : "ADD new"}  {modal.title}
                        </div>
                        <div className="modal-main-board mt-3 mb-3">
                            {form}
                        </div>
                        <div className="modal-btn-group">
                            <Button className="ml-2" color="success" onClick={() => this.onSubmit(modal.title)}>
                                Save
                            </Button>
                            <Button color="warning" onClick={this.toggleModal}>Cancel</Button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

ModalComponent.propsTypes = {
    ToggleModal: PropTypes.func.isRequired,
    modal: PropTypes.object.isRequired,
    types: PropTypes.object.isRequired,
    createAssets: PropTypes.func.isRequired,
    editAssets: PropTypes.func.isRequired,
    createIncome: PropTypes.func.isRequired,
    editIncome: PropTypes.func.isRequired,
    createExpenditure: PropTypes.func.isRequired,
    editExpenditure: PropTypes.func.isRequired,
    createCreditor: PropTypes.func.isRequired,
    editCreditor: PropTypes.func.isRequired
}

const mapDispatchToProps = {
    ToggleModal,
    createAssets,
    editAssets,
    createIncome,
    editIncome,
    createExpenditure,
    editExpenditure,
    createCreditor,
    editCreditor

}
const mapStateToProps = (state) => ({
    modal: state.modal,
    types: state.types
})

const mappedModalComponent = connect(mapStateToProps, mapDispatchToProps)(ModalComponent)

export default mappedModalComponent