import React from "react";
// react plugin used to create charts
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { randomNum } from 'variables/random';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Progress,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getDashboardData } from 'actions/dashboardAction';
import formatMoney from 'views/utils';
const colors = [
  'blue',
  'purple',
  'orange',
  'green',
  'pink',
  'yellow',
  'cyan',
  'info',
  'indigo',
  'gray',
  'secondary',
  'dark',
  'teal'
];

class Dashboard extends React.Component {

  genDNChartData = () => {
    return {
      datasets: [
        {
          data: [randomNum(), randomNum(), randomNum(), randomNum(), randomNum()],
          backgroundColor: colors,
          // label: 'Sieres 1',
        },
      ],
      labels: ['Data 1', 'Data 2', 'Data 3', 'Data 4', 'Data 5'],
    };
  };
  UNSAFE_componentWillMount() {
    this.props.getDashboardData();
  }
  getAssetsData = (assets) => {
    let { result } = assets;
    let labels = [];
    let values = {};
    result.forEach(item => {
      let { assetTypeName, balance } = item;
      if (!labels.includes(assetTypeName)) {
        labels.push(assetTypeName);
        values[assetTypeName] = balance
      } else {
        values[assetTypeName] += balance
      }
    })
    return {
      datasets: [
        {
          data: Object.values(values),
          backgroundColor: colors,
          label: 'Cash and Assets',
        },
      ],
      labels: labels,
    };
  }
  getIncomeData = (income) => {
    let { result } = income;
    let labels = [];
    let values = {};
    result.forEach(item => {
      let { incomeTypeName, netAmount } = item;
      if (!labels.includes(incomeTypeName)) {
        labels.push(incomeTypeName);
        values[incomeTypeName] = netAmount
      } else {
        values[incomeTypeName] += netAmount
      }
    })
    return {
      datasets: [
        {
          data: Object.values(values),
          backgroundColor: colors,
          label: 'Total Income',
        },
      ],
      labels: labels,
    };
  }
  getDebtData = (creditor) => {
    let { result } = creditor;
    if (!result) result = [];
    let labels = [];
    let values = [];
    result.forEach(item => {
      let { creditor, balance } = item;
      labels.push(creditor);
      values.push(balance);
    })
    return {
      datasets: [
        {
          data: values,
          backgroundColor: colors,
          label: 'Total DEBT',
        },
      ],
      labels: labels,
    }
  }
  getExpenditureData = (expenditure) => {
    let { result } = expenditure
    let labels = [];
    let values = {};
    result.forEach(item => {
      let { expenditureTypeName, amount } = item;
      if (!labels.includes(expenditureTypeName)) {
        labels.push(expenditureTypeName);
        values[expenditureTypeName] = amount
      } else {
        values[expenditureTypeName] += amount
      }
    });
    return {
      labels: labels,
      datasets: [
        {
          label: 'Monthly Expenditure',
          backgroundColor: '#0d1182',
          borderColor: '#0d1182',
          borderWidth: 1,
          data: Object.values(values),
        },
      ],
    };
  };
  getPersonalNetWorthData = (netWorth) => {
    let { result } = netWorth;
    if (result) {
      let { personalNetWorthProgress } = result;
      return {
        labels: Object.keys(personalNetWorthProgress),
        datasets: [
          {
            label: 'Personal Net Worth',
            backgroundColor: '#b0b1ea',
            borderColor: '#0d1182',
            borderWidth: 1,
            data: Object.values(personalNetWorthProgress),
            fill: true,
            lineTension: 0,
          },
        ],
      };
    }
    return {
      labels: [],
      datasets: [
        {
          label: 'Personal Net Worth',
          backgroundColor: '#b0b1ea',
          borderColor: '#0d1182',
          borderWidth: 1,
          data: [],
          fill: true,
          lineTension: 0,
        },
      ],
    };

  }
  getCashflowData = (cashFlow) => {
    let { result } = cashFlow
    let dates = result ? Object.keys(result) : [];
    dates.sort();
    let values = dates.map(item => (result[item].endingCash))
    return {
      labels: dates,
      datasets: [
        {
          label: 'Cash Flow',
          backgroundColor: 'pink',
          borderColor: '#d60163d4',
          borderWidth: 1,
          data: values,
          fill: true,
          lineTension: 0,
        },
      ],

    };
  }
  getDebtReductionData = (creditor) => {
    let { result } = creditor;
    if (!result) result = [];
    let values = {};
    result.forEach(item => {
      let { creditorTypeName, creditLimit, balance, originalLoanAmount } = item;
      if (values[creditorTypeName]) {
        if (creditorTypeName === 'Credit Card') {
          values[creditorTypeName].balance += balance;
          values[creditorTypeName].creditLimit += creditLimit;
        } else {
          values[creditorTypeName].balance += balance;
          values[creditorTypeName].originalLoanAmount += originalLoanAmount;
        }
      } else {
        if (creditorTypeName === 'Credit Card') {
          values[creditorTypeName] = { balance };
          values[creditorTypeName].creditLimit = creditLimit;
        } else {
          values[creditorTypeName] = { balance };
          values[creditorTypeName].originalLoanAmount = originalLoanAmount;
        }
      }
    })
    return values
  }
  render() {
    let colorInfo = ['success', 'info', 'warning', 'danger', 'primary']
    let { data, status } = this.props.data;
    let { assets, income, expenditure, creditor, personalNetWorth, cashFlow } = data;
    if (status) {
      var assetsData = this.getAssetsData(assets);
      var incomeData = this.getIncomeData(income);
      var debtData = this.getDebtData(creditor);
      var expenditureData = this.getExpenditureData(expenditure);
      var netWorthData = this.getPersonalNetWorthData(personalNetWorth);
      var cashFlowData = this.getCashflowData(cashFlow);
      var debtReductionData = this.getDebtReductionData(creditor);
      var debtReductionDataKeys = Object.keys(debtReductionData)
    }

    return (
      <div className="content">
        {status ?
          (<Row>
            <Col xs={12} md={6}>
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Total cash and Assets</h5>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Doughnut
                      options={{
                        tooltips: {
                          callbacks: {
                            label: function (tooltipItem, data) {
                              let label = [];
                              label.push(`Account Type: ${data['labels'][tooltipItem['index']]}`);
                              label.push(`Balance: $${formatMoney(data['datasets'][0]['data'][tooltipItem['index']])}`)
                              let dataset = data['datasets'][0];
                              let percent = Math.round((dataset['data'][tooltipItem['index']] / Object.values(dataset["_meta"])[0]['total']) * 100)
                              label.push(`Percentage: ${percent} %`)
                              return label
                            }
                          },
                        }
                      }}
                      data={assetsData}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Total income</h5>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Doughnut
                      options={{
                        tooltips: {
                          callbacks: {
                            label: function (item, data) {
                              let label = [];
                              label.push(`Type: ${data['labels'][item['index']]}`);
                              label.push(`Net Pay: $${formatMoney(data['datasets'][0]['data'][item['index']])}`);
                              let dataset = data['datasets'][0];
                              let percent = Math.round((dataset['data'][item['index']] / Object.values(dataset["_meta"])[0]['total']) * 100)
                              label.push(`Percentage: ${percent} %`)
                              return label
                            }
                          },
                        }
                      }}
                      data={incomeData}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Total debt</h5>
                </CardHeader>
                <CardBody>
                  -<div className="chart-area">
                    <Doughnut
                      options={{
                        tooltips: {
                          callbacks: {
                            label: function (item, datasets) {
                              let label = [];
                              let { result } = creditor;
                              let data = result[item['index']]
                              label.push(`Credit: ${data['creditor']}`);
                              label.push(`Type: ${data['creditorTypeName']}`);
                              label.push(`Balance: $${formatMoney(data['balance'])}`);
                              label.push(`APR: ${data['apr'].toFixed(1)} %`);
                              label.push(`Date: ${data['date']}`);
                              label.push(`Monthly Payment: $${formatMoney(data['payment'])}`);
                              label.push(`Limit: ${data['creditorTypeName'] === 'Credit Card' ? '$' + formatMoney(data['creditLimit']) : '- -'}`);
                              label.push(`Market Value: ${data['creditorTypeName'] !== 'Credit Card' ? '$' + formatMoney(data['marketValue']) : '- -'}`);
                              let dataset = datasets['datasets'][0];
                              let percent = Math.round((dataset['data'][item['index']] / Object.values(dataset["_meta"])[0]['total']) * 100)
                              label.push(`Percentage: ${percent} %`)
                              return label
                            }
                          },
                        }
                      }}
                      data={debtData}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                </CardFooter>
              </Card>
            </Col>
            <Col xs="12" md="6">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Total monthly expenditures (in $)</h5>
                </CardHeader>
                <CardBody className="mt-3">
                  <Bar
                    options={{
                      legend: {
                        display: false
                      },
                      scales: {
                        yAxes: [{
                          ticks: {
                            beginAtZero: true
                          }
                        }]
                      },
                      tooltips: {
                        callbacks: {
                          label: function (item, data) {
                            let label = [];
                            label.push(`Monthly Expenditure: $${formatMoney(data['datasets'][0]['data'][item['index']])}`);
                            return label
                          }
                        },
                      }
                    }}
                    data={expenditureData}
                  />
                </CardBody>
                <CardFooter>
                </CardFooter>
              </Card>
            </Col>
            <Col xs="12" md="12">
              <Card>
                <CardHeader>
                  <h5 className="card-category">personal net worth</h5>
                </CardHeader>
                <CardBody className="line-chart-area">
                  <Line
                    options={{
                      maintainAspectRatio: false,
                      legend: {
                        display: false
                      },
                      scales: {
                        yAxes: [{
                          ticks: {
                            beginAtZero: true
                          }
                        }]
                      },
                      tooltips: {
                        callbacks: {
                          label: function (item, data) {
                            let label = [];
                            label.push(`Personal Net Worth: ${data['datasets'][0]['data'][item['index']] > 0 ? '' : '-'} $${formatMoney(Math.abs(data['datasets'][0]['data'][item['index']]))}`);
                            return label
                          }
                        },
                      }
                    }}
                    data={netWorthData}
                  />
                </CardBody>
                <CardFooter>
                </CardFooter>
              </Card>
            </Col>
            <Col xs="12" md="12">
              <Card>
                <CardHeader>
                  <h5 className="card-category">Cash flow Progress</h5>
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
                            let element = cashFlow['result'][tooltipItem.xLabel];
                            let field = ['startingCash', 'addedCash', 'expensesCash', 'endingCash']
                            let label = []
                            field.forEach(key => {
                              label.push(`${key.match(/[A-Z]+[^A-Z]*|[^A-Z]+/g).join(' ').replace(/^\w/, c => c.toUpperCase())}: $${formatMoney(element[key] ? element[key] : 0)}`)
                            })
                            return label
                          }
                        }
                      }
                    }}
                    data={cashFlowData}
                  />
                </CardBody>
                <CardFooter>
                </CardFooter>
              </Card>
            </Col>
            <Col xs="12" md="12">
              <Card>
                <CardHeader>
                  <h5 className="card-category">Debt reduction</h5>
                </CardHeader>
                <CardBody>
                  {
                    debtReductionDataKeys.map((item, index) => {
                      if (item !== 'Credit Card') {
                        return (
                          <Row key={index}>
                            <Col md="2" className="d-flex align-items-center justify-content-center">
                              {item}
                            </Col>
                            <Col md="10">
                              <div className="text-center debt-info">
                                <span className="text-info">Total Debt : </span> ${formatMoney(debtReductionData[item]['originalLoanAmount'])}, &nbsp;
                           <span className="text-info">Total Paid : </span>  ${formatMoney(debtReductionData[item]['originalLoanAmount'] - debtReductionData[item].balance)},&nbsp;
                           <span className="text-danger">Balance : ${formatMoney(debtReductionData[item].balance)}</span>
                              </div>
                              <Progress
                                animated
                                color={colorInfo[index]}
                                value={(debtReductionData[item]['originalLoanAmount'] - debtReductionData[item].balance) / debtReductionData[item]['originalLoanAmount'] * 100}
                                className="mb-3"
                              >
                                {((debtReductionData[item]['originalLoanAmount'] - debtReductionData[item].balance) / debtReductionData[item]['originalLoanAmount'] * 100).toFixed(2)} %                        </Progress>
                            </Col>
                          </Row>
                        )
                      } else {
                        return (
                          <Row key={index}>
                            <Col md="2" className="d-flex align-items-center justify-content-center">
                              {item}
                            </Col>
                            <Col md="10">
                              <div className="text-center debt-info">
                                <span className="text-info">Credit Card Limit : </span> ${formatMoney(debtReductionData[item]['creditLimit'])}, &nbsp;
                                <span className="text-danger">Balance : ${formatMoney(debtReductionData[item].balance)}</span>
                              </div>
                              <Progress
                                animated
                                color={colorInfo[index]}
                                value={(1 - debtReductionData[item].balance / debtReductionData[item]['creditLimit']) * 100}
                                className="mb-3"
                              >
                                {((1 - debtReductionData[item].balance / debtReductionData[item]['creditLimit']) * 100).toFixed(2)} %                        </Progress>
                            </Col>
                          </Row>
                        )
                      }
                    })
                    //   colors.map((color, index) => {
                    //     const ranInt = getRandomInt();
                    //     return (
                    //       <Progress
                    //   striped
                    //   key={index}
                    //   color={'#fb111'}
                    //   value={ranInt}
                    //   className="mb-3"
                    // >
                    //   {ranInt}%
                    //       </Progress>
                    //     );
                    //   })
                  }
                </CardBody>
                <CardFooter>

                </CardFooter>
              </Card>
            </Col>
          </Row>) :
          ''}

      </div>
    );
  }
}

Dashboard.propsTypes = {
  data: PropTypes.object.isRequired,
  getDashboardData: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  getDashboardData
}

const mapStateToProps = (state) => ({
  data: state.DashBoard,
})

const DashboardMapped = connect(mapStateToProps, mapDispatchToProps)(Dashboard)
export default DashboardMapped
