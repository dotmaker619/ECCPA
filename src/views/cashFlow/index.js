import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
    Card, CardBody, CardHeader,
    Button, Table, Row,
    Col, ButtonGroup, Badge, FormGroup, Input, Form
} from "reactstrap";
import formatMoney from 'views/utils';
import { getCashFlow } from 'actions/cashFlowAction';
import { Line } from 'react-chartjs-2'
import notify from 'views/utils/notification'

class CashFlow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: 'graph',
            startDate: '',
            endDate: ''
        }
    }

    changeViewMode = (mode) => {
        this.setState({
            ...this.state,
            viewMode: mode
        })
    }

    UNSAFE_componentWillMount() {
        this.props.getCashFlow();
    }

    genLineData = (moreData = {}) => {
        let { data } = this.props.data;
        let dates = data ? Object.keys(data) : [];
        dates.sort();
        let values = dates.map(item => (data[item].endingCash))
        return {
            labels: dates,
            datasets: [
                {
                    label: 'Ending Cash',
                    backgroundColor: '#0d1182',
                    borderColor: '#0d1182',
                    borderWidth: 1,
                    data: values,
                    ...moreData
                },
            ],

        };
    };

    onChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
    };

    onSubmit = (e) => {
        console.log(this.state)
        e.preventDefault();
        if (this.state.endDate && this.state.startDate) {
            this.props.getCashFlow(this.state.startDate, this.state.endDate)
        } else {
            notify('error', "Please insert date.", 'Form Error')
        }

    }
    viewAll = () => {
        this.props.getCashFlow()
    }
    render() {
        let category = ['income', 'creditor', 'expenses']
        let { data } = this.props.data;
        let tableData = [];
        for (let date in data) {
            let item = data[date];
            category.forEach(el => {
                let temp = item[el];
                if (temp) {
                    temp.forEach(element => {
                        element.category = el
                        tableData.push(element)
                    })
                }
            })
        }
        tableData.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })
        let tableboday = tableData.map((item, index) => (
            <tr key={index}>
                <td>{item.company}</td>
                <td>
                    <h6>
                        {item.category === 'income' ?
                            <Badge color="success">
                                <span className="badge-text">
                                    Income
                                </span>
                            </Badge> : item.category === 'creditor' ?
                                <Badge color="warning">
                                    <span className="badge-text">
                                        Creditor
                                    </span>
                                </Badge>
                                :
                                <Badge color="danger">
                                    <span className="badge-text">
                                        Expense
                                    </span>
                                </Badge>}
                    </h6>
                </td>
                <td>{item.date}</td>
                <td>
                    <span
                        className={
                            item.category === 'income'
                                ? 'text-success'
                                : item.category === 'creditor'
                                    ? 'text-warning'
                                    : 'text-danger'
                        }>
                        {item.amount > 0 ? '' : '(- '}$ {formatMoney(Math.abs(item.amount))}{item.amount > 0 ? '' : ')'}
                    </span>
                </td>
            </tr>
        ));
        return (
            <div className="content">
                <Card className="main-area">
                    <CardHeader className="d-flex align-items-center">
                        <h5 className="card-category">Cash Flow</h5>
                    </CardHeader>
                    <CardBody>
                        <div className="date-range">
                            <Form className="d-flex align-items-center justify-content-center" onSubmit={this.onSubmit}>
                                <FormGroup className="mr-5">
                                    <label>Start Date</label>
                                    <Input type="date" name="startDate" onChange={this.onChange} />
                                </FormGroup>
                                <FormGroup className="mr-5">
                                    <label>End Date</label>
                                    <Input type="date" name="endDate" onChange={this.onChange} />
                                </FormGroup>
                                <FormGroup className="ml-4 mr-5">
                                    <Button color="primary" type="submit" className="mb-0">
                                        View
                                    </Button>
                                </FormGroup>
                                <FormGroup className="d-none">
                                    <Button color="success" type="button" onClick={this.viewAll}>
                                        View all
                                    </Button>
                                </FormGroup>
                            </Form>
                        </div>
                        <div className="main-area">
                            <Row>
                                <Col md="12" className="text-center">
                                    <ButtonGroup className="btn-switch">
                                        <Button
                                            color={this.state.viewMode === 'graph' ? 'primary' : 'secondary'}
                                            onClick={() => this.changeViewMode('graph')}
                                            active={this.state.viewMode === 'graph'}
                                        >
                                            GRAPH VIEW
                                        </Button>
                                        <Button
                                            color={this.state.viewMode === 'table' ? 'primary' : 'secondary'}
                                            onClick={() => this.changeViewMode('table')}
                                            active={this.state.viewMode === 'table'}
                                        >
                                            TABLE VIEW
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                                <Col md="12" className="text-center">
                                    {this.state.viewMode === 'graph' ? (
                                        <div className="mt-4">
                                            <Card>
                                                <CardHeader>
                                                    <h5 className="card-category">Available Cash</h5>
                                                </CardHeader>
                                                <CardBody className="line-chart-area">
                                                    <Line
                                                        options={{
                                                            maintainAspectRatio: false,
                                                            legend: { display: false },
                                                            scales: {
                                                                yAxes: [{
                                                                    ticks: {
                                                                        beginAtZero: true
                                                                    }
                                                                }]
                                                            },
                                                            tooltips: {
                                                                callbacks: {
                                                                    label: function (tooltipItem) {
                                                                        let element = data[tooltipItem.xLabel];
                                                                        let field = ['startingCash', 'addedCash', 'expensesCash', 'endingCash']
                                                                        let label = []
                                                                        field.forEach(key => {
                                                                            label.push(`${key.match(/[A-Z]+[^A-Z]*|[^A-Z]+/g).join(' ').replace(/^\w/, c => c.toUpperCase())}: $${element[key] ? element[key] : 0}`)
                                                                        })
                                                                        return label
                                                                    }
                                                                }
                                                            }
                                                        }}
                                                        data={this.genLineData({ fill: true, lineTension: 0, backgroundColor: 'pink', borderColor: '#d60163d4' })}
                                                    />
                                                </CardBody>
                                            </Card>
                                        </div>
                                    ) : (
                                            <Table hover className="text-left">
                                                <thead>
                                                    <tr>
                                                        <th>Company</th>
                                                        <th>Type</th>
                                                        <th>Date</th>
                                                        <th>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tableboday}
                                                </tbody>
                                            </Table>
                                        )}
                                </Col>
                            </Row>
                        </div>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

CashFlow.propsTypes = {
    data: PropTypes.object.isRequired,
    getCashFlow: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
    getCashFlow
}

const mapStateToProps = (state) => ({
    data: state.cashFlow,
})

const CashFlowMapped = connect(mapStateToProps, mapDispatchToProps)(CashFlow)
export default CashFlowMapped