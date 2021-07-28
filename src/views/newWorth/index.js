import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Table, Col, Row } from 'reactstrap';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import formatMoney from 'views/utils';
import { getNetWorth } from 'actions/netWorthAction';


class NetWorth extends Component {

    UNSAFE_componentWillMount() {
        this.props.getNetWorth();
    }
    render() {
        let tableData = {
            assets: { total: 0, tableData: [] },
            investments: { total: 0, tableData: [] },
            cashAndEquivalents: { total: 0, tableData: [] },
            Liabilities: { total: 0, tableData: [] }
        };
        let { data } = this.props.data;
        let { Assets, Liabilities } = data;
        if (Assets) {
            let { assets, investments, cashAndEquivalents } = Assets;
            tableData.assets.tableData = assets.map((item, index) => {
                tableData.assets.total += item.marketValue;
                return (
                    <tr key={index}>
                        <td>{item.category}</td>
                        <td className="text-right">$ {formatMoney(item.marketValue)}</td>
                    </tr>
                )
            });
            tableData.investments.tableData = investments.map((item, index) => {
                tableData.investments.total += item.assetBalance;
                return (
                    <tr key={index}>
                        <td>{item.category}</td>
                        <td className="text-right">$ {formatMoney(item.assetBalance)}</td>
                    </tr>
                )
            })
            tableData.cashAndEquivalents.tableData = cashAndEquivalents.map((item, index) => {
                tableData.cashAndEquivalents.total += item.assetBalance;
                return (
                    <tr key={index}>
                        <td>{item.category}</td>
                        <td className="text-right">$ {formatMoney(item.assetBalance)}</td>
                    </tr>
                )
            })
            tableData.Liabilities.tableData = Liabilities.map((item, index) => {
                tableData.Liabilities.total += item.creditBalance;
                return (
                    <tr key={index}>
                        <td>{item.category}</td>
                        <td className="text-right">$ {formatMoney(item.creditBalance)}</td>
                    </tr>
                )
            })
        }
        let totalAssets = tableData.assets.total + tableData.cashAndEquivalents.total + tableData.investments.total;
        let netWorth = totalAssets - tableData.Liabilities.total
        return (
            <div className="content">
                <Card className="main-area">
                    <CardHeader className="d-flex align-items-center">
                        <h5 className="card-category">personal net worth</h5>
                    </CardHeader>
                    <CardBody className="main-area">
                        <Row>
                            <Col md="6">
                                <div className="category-header text-uppercase">
                                    Assets
                                    </div>
                                <Table borderless>
                                    <thead className="net-worth-header">
                                        <tr>
                                            <th>Assets</th>
                                            <th className="text-right">${formatMoney(tableData.assets.total)}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.assets.tableData}
                                    </tbody>
                                    <thead className="net-worth-header">
                                        <tr>
                                            <th>cash and equivalent</th>
                                            <th className="text-right">${formatMoney(tableData.cashAndEquivalents.total)}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.cashAndEquivalents.tableData}
                                    </tbody>
                                    <thead className="net-worth-header">
                                        <tr>
                                            <th>Investments</th>
                                            <th className="text-right">${formatMoney(tableData.investments.total)}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.investments.tableData}
                                    </tbody>
                                </Table>
                            </Col>
                            <Col md="6">
                                <div className="category-header text-uppercase">
                                    Liabilities
                                </div>
                                <Table borderless>
                                    <thead className="net-worth-header">
                                        <tr>
                                            <th>Liabilities</th>
                                            <th className="text-right">$ {formatMoney(tableData.Liabilities.total)}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.Liabilities.tableData}
                                    </tbody>
                                </Table>
                            </Col>
                            <Col md="6">
                                <Table className="m-0">
                                    <thead className="net-worth-header">
                                        <tr>
                                            <th>Total Assets</th>
                                            <th className="text-right">
                                                $ {formatMoney(totalAssets)}
                                            </th>
                                        </tr>
                                    </thead>
                                </Table>
                            </Col>
                            <Col md="6">
                                <Table className="m-0">
                                    <thead className="net-worth-header">
                                        <tr>
                                            <th>Total Liabilities</th>
                                            <th className="text-right">$ {formatMoney(tableData.Liabilities.total)}</th>
                                        </tr>
                                    </thead>
                                </Table>
                            </Col>
                            <Col md="12">
                                <div className="category-header text-uppercase border-bottom">
                                    <span>Net worth</span>
                                    <span className="float-right">${formatMoney(netWorth)}</span>
                                </div>
                                <div className="category-header text-uppercase">
                                    <span>Leverage ratio</span>
                                    <span className="float-right">{formatMoney(tableData.Liabilities.total / totalAssets)}</span>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

NetWorth.propsTypes = {
    data: PropTypes.object.isRequired,
    getNetWorth: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
    getNetWorth
}

const mapStateToProps = (state) => ({
    data: state.netWorth,
})

const NetWorthMapped = connect(mapStateToProps, mapDispatchToProps)(NetWorth)
export default NetWorthMapped