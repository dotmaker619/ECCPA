import Dashboard from "views/Dashboard.js";
import Income from 'views/income'
import Assets from 'views/assets'
import Creditors from 'views/creditors'
import Expenditure from 'views/expenditure'
import CashFlow from 'views/cashFlow'
import NewWorth from 'views/newWorth'

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard,
    layout: "",
  },
  {
    path: "/income",
    name: "INCOME",
    icon: "business_money-coins",
    component: Income,
    layout: "",
  },
  {
    path: "/assets",
    name: "ASSETS",
    icon: "business_briefcase-24",
    component: Assets,
    layout: "",
  },
  {
    path: "/creditors",
    name: "CREDITORS",
    icon: "shopping_credit-card",
    component: Creditors,
    layout: "",
  },
  {
    path: "/expenditure",
    name: "EXPENDITURE",
    icon: "education_paper",
    component: Expenditure,
    layout: "",
  },
  {
    path: "/cash-flow",
    name: "CASH FLOW",
    icon: "business_bank",
    component: CashFlow,
    layout: "",
  },
  {
    path: "/net-worth",
    name: "NET WORTH",
    icon: "objects_diamond",
    component: NewWorth,
    layout: "",
  },
];
export default dashRoutes;
