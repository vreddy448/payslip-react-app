import React, { Component } from 'react';
import textBoxStyles from '../../css/text-box.css';
import appStyles from '../../css/app.css';
import inputFormStyles from '../../css/input-form.css';

export default class InputForm extends Component {

    constructor(props) {
        super(props);
        this.state = {errors:'',
                        firstName:'',
                        lastName:'',
                        annualSalary:'',
                        superRate:'',
                        paymentDate:'',
                        generatePaySlip:''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.calculate = this.calculate.bind(this);
        this.getTable = this.getTable.bind(this);
    }

    calculate(firstName, lastName, annualSalary, superRate, paymentDate) {
        if(firstName !== '' && lastName !== '' && annualSalary !== 0 && superRate !== 0) {

           let paymentPeriod = this.getPaymentPeriod(paymentDate.toString());
           let grossIncome = Math.round(parseInt(annualSalary)/12);
           let incomeTax = this.getTax(parseInt(annualSalary));
           let netIncome = Math.round(parseInt(grossIncome - incomeTax));
           let superAmount = Math.round(grossIncome * (superRate/100));
           let name = this.state.firstName + " " + this.state.lastName;

           return this.getTable(name, paymentPeriod, grossIncome, incomeTax, netIncome, superAmount);
        }
    }

    getPaymentPeriod(date) {
        let period;
        let startDate = parseInt(date.substr(8));
        let paymentStartMonth = this.getMonth(parseInt(date.substring(5,7)));
        let paymentEndMonth;
        let endDate = startDate + 30;

        if(endDate === 31) {
            endDate = 31;
            paymentEndMonth = paymentStartMonth
        } else {
            endDate = startDate;
            if(paymentStartMonth === 'DEC') {
                paymentEndMonth = 'JAN';
            } else {
                paymentEndMonth = this.getMonth(parseInt(date.substring(5,7)) + 1);
            }
        }
        period = `${startDate} ${paymentStartMonth}  -  ${endDate} ${paymentEndMonth}`;

        return period;
    }

    getTable(name, payPeriod, grossIncome, incomeTax, netIncome, superAmount) {
        return (
            <div className={`${inputFormStyles.payslip_card} ${inputFormStyles.payslip}`}>
                <h1 className={inputFormStyles.salary_slip_header}>Salary Slip</h1>
                <div className={inputFormStyles.division}></div>
                <div className={`${inputFormStyles.basic_details} ${appStyles.margin_3} ${appStyles.flex}`}>
                    <table className={inputFormStyles.basic_details_right}>
                        <tbody>
                            <tr className= {appStyles.margin_5}>
                                <td className={`${appStyles.margin_5} ${appStyles.app_font} ${inputFormStyles.width_adjustment_50}`}>Name</td>
                                <td className={appStyles.app_font}>{name}</td>
                            </tr>
                            <tr className={appStyles.margin_5}>
                                <td className={`${appStyles.margin_5} ${appStyles.app_font} ${inputFormStyles.width_adjustment_50}`}>Employee ID</td>
                                <td className={appStyles.app_font}> - - </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className={inputFormStyles.basic_details_right}>
                        <tbody>
                            <tr className={appStyles.margin_5}>
                                <td className={`${appStyles.margin_5} ${appStyles.app_font} ${inputFormStyles.width_adjustment_50}`}>Title</td>
                                <td className={appStyles.app_font}> - - </td>
                            </tr>
                            <tr className={appStyles.margin_5}>
                                <td className={`${appStyles.margin_5} ${appStyles.app_font} ${inputFormStyles.width_adjustment_50}`}>Department</td>
                                <td className={appStyles.app_font}> - - </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={inputFormStyles.division} />
                <div className={appStyles.margin_3}>
                    <table className={inputFormStyles.salary_details}>
                        <tbody>
                            <tr className={appStyles.margin_5}>
                                <td className={`${appStyles.margin_5} ${appStyles.app_font} ${inputFormStyles.width_adjustment_50}`}>
                                    Pay Period
                                </td>
                                <td className={appStyles.app_font}>{payPeriod}</td>
                            </tr>
                            <tr className={appStyles.margin_5}>
                                <td className={`${appStyles.margin_5} ${appStyles.app_font}`}>
                                    Gross Income
                                </td>
                                <td className={appStyles.app_font}>Rs. {grossIncome}</td>
                            </tr>
                            <tr className={appStyles.margin_5}>
                                <td className={`${appStyles.margin_5} ${appStyles.app_font}`}>
                                    Income Tax
                                </td>
                                <td className={appStyles.app_font}>Rs. {incomeTax}</td>
                            </tr>
                            <tr className={appStyles.margin_5}>
                                <td className={`${appStyles.margin_5} ${appStyles.app_font}`}>
                                    Net Income
                                </td>
                                <td className={appStyles.app_font}>Rs. {netIncome}</td>
                            </tr>
                            <tr className={appStyles.margin_5}>
                                <td className={`${appStyles.margin_5} ${appStyles.app_font}`}>
                                    Super Amount
                                </td>
                                <td className={appStyles.app_font}>Rs. {superAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={inputFormStyles.division} />
            </div>
        );
    }

    getMonth(data) {
        let month;

        if(data === 1 || data === '01') {
            month = 'JAN';
        } else if(data === 2 || data === '02') {
            month = 'FEB';
        } else if(data === 3 || data === '03') {
            month = 'MAR';
        } else if(data === 4 || data === '04') {
            month = 'APR';
        } else if(data === 5 || data === '05') {
            month = 'MAY';
        } else if(data === 6 || data === '06') {
            month = 'JUN';
        } else if(data === 7 || data === '07') {
            month = 'JUL';
        } else if(data === 8 || data === '08') {
            month = 'AUG';
        } else if(data === 9 || data === '09') {
            month = 'SEP'
        } else if(data === 10 || data === '10') {
            month = 'OCT';
        } else if(data === 11 || data === '11') {
            month = 'NOV';
        } else if(data === 12 || data === '12') {
            month = 'DEC';
        }
        return month;
    }

    getTax(salary) {
        let tax;
        if(salary < 18200) {
            tax = 0;
        } else if (salary >= 18200 || salary <= 37000) {
            tax = Math.round(salary/19);
        } else if (salary >= 37001 || salary  <= 87000) {
            tax = 3572 + Math.round(salary/32.5);
        } else if (salary >= 87001 || salary <= 180000) {
            tax = 19822 + Math.round(salary/37);
        } else if(salary >= 180001) {
            tax = 54232 + Math.round(salary/45);
        }
        return tax;
    }

    handleChange(event) {
        if(event.target.id === 'superRate' && event.target.value > 12) {
            this.setState({errors : "Super Rate should be between 0 to 12"});
        } else {
            this.setState({[event.target.id]: event.target.value, generatePaySlip:'no'});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let errors;
        let paymentYear = parseInt(this.state.paymentDate).toString().substr(0,4);

        if(paymentYear < 2018) {
            errors = "Please Provide Date in Current year or greater...";
            this.setState({errors : errors});
        } else if (this.state.superRate <= 0 || this.state.superRate > 12) {
            errors = "Super Rate should be between 0 to 12";
            this.setState({errors : errors});
        } else {
            this.setState({errors:'', generatePaySlip : 'yes'});
        }
    }

    render() {
        return (
            <div className={inputFormStyles.app_container}>
                <h3 className={inputFormStyles.error_message}>{this.state.errors}</h3>
                <div className="app-content">
                    <div className={inputFormStyles.app_form}>
                        <form id="inputForm" onSubmit={this.handleSubmit}>
                            <div className={textBoxStyles.group}>
                                <input id="firstName" value={this.state.firstName} onChange={this.handleChange} type="text" required />
                                <span className={textBoxStyles.highlight} />
                                <span className={textBoxStyles.bar} />
                                <label className={appStyles.app_font_color_pink} >First Name</label>
                            </div>
                            <div className={textBoxStyles.group}>
                                <input id="lastName" value={this.state.lastName} onChange={this.handleChange} type="text" required />
                                <span className={textBoxStyles.highlight}/>
                                <span className={textBoxStyles.bar} />
                                <label className={appStyles.app_font_color_pink} >Last Name</label>
                            </div>
                            <div className={textBoxStyles.group}>
                                <input id="annualSalary" value={this.state.annualSalary} onChange={this.handleChange} type="number" required />
                                <span className={textBoxStyles.highlight} />
                                <span className={textBoxStyles.bar} />
                                <label className={appStyles.app_font_color_pink} > Annual Salary (Rs)</label>
                            </div>
                            <div className={textBoxStyles.group}>
                                <input id="superRate" value={this.state.superRate} onChange={this.handleChange} type="number" required />
                                <span className={textBoxStyles.highlight} />
                                <span className={textBoxStyles.bar} />
                                <label className={appStyles.app_font_color_pink} >Super Rate (%)</label>
                            </div>
                            <div className={textBoxStyles.group}>
                                <input id="paymentDate"  value={this.state.paymentDate} onChange={this.handleChange} type="date" required />
                                <span className={textBoxStyles.highlight} />
                                <span className={textBoxStyles.bar} />
                                <label className={appStyles.app_font_color_pink} >Payment Date</label>
                            </div>
                            <div className={appStyles.margin_bottom_10}>
                                <input className={inputFormStyles.generate_button} type="submit" value="Generate Payslip" />
                            </div>
                        </form>
                    </div>
                    <div className={inputFormStyles.app_result} >
                        {this.state.generatePaySlip === 'yes' && this.calculate(this.state.firstName,
                            this.state.lastName,
                            this.state.annualSalary,
                            this.state.superRate,
                            this.state.paymentDate)}
                    </div>
                </div>
            </div>
        );
    }
}