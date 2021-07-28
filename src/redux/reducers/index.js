import { combineReducers } from "redux";
import ToggleModal from './modalReducer'
import auth from './authReducer';
import defaultReducer from './default';
import Assets from './assetsReduder';
import Income from './incomeReducer';
import Expenditure from './expenditureReducer';
import Creditor from './creditorReducer';
import Types from './typeReducer';
import NetWorth from './netWorthReducer';
import cashFlow from './cashFlowReducer';
import DashBoard from './dashboardReducer';
import customer from './customerReducer';

export default combineReducers({
    default: defaultReducer,
    modal: ToggleModal,
    auth: auth,
    assets: Assets,
    income: Income,
    expenditure: Expenditure,
    creditor: Creditor,
    types: Types,
    netWorth: NetWorth,
    cashFlow: cashFlow,
    DashBoard: DashBoard,
    customer: customer
})