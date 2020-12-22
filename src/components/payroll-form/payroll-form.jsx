import React from 'react'
import Toolbar from './toolbar'
import image3 from '../assets/profile-images/Ellipse -3.png'
import image1 from '../assets/profile-images/Ellipse -1.png'
import image8 from '../assets/profile-images/Ellipse -8.png'
import image7 from '../assets/profile-images/Ellipse -7.png'
import {addEmployee, getEmployeeById, putEmployee} from '../../services/employee-service.js'

class PayrollForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {  
            },
            Day: '',
            Month: '',
            Year: '',
            error: {
                name: '',
                date: ''
            }
        }
    }   

    handleChange = (e) => {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields,   
        })
        let nameRegex = RegExp('^[A-Z][a-zA-Z\\s]{2,}$');
        if(nameRegex.test(fields.name))
            this.setState({
                ...this.state, error: {...this.state.error, name: ""}
            })
        else  this.setState({
            ...this.state, error: {...this.state.error, name: "Invalid pattern for name"}
        })
        console.log("Spread op " , {...this.state});
    }

    handleDate = (e) => {
        let day = e.target.value;
        console.log("Date before: " ,e.target.value);
        this.setState({
            Day : day
        }, () => {
            console.log("Day: ", this.state.Day);
        })
    }

    handleMonth = (e) => {
        let Month = e.target.value;
        this.setState({
            Month
        })
    }

    handleYear = (e) => {
        let Year = e.target.value;
        this.setState({
            Year
        })
    }

    componentDidMount() {
        let id = null;
        if(!(this.props.match.params.id === undefined)) {
            id = this.props.match.params.id;
            getEmployeeById(id).then(employee => {
                console.log("Employeeee ", employee);
                this.setState ({
                    fields: employee.data   
                })
                let date = new Date(this.state.fields.date);
                let Day = date.getDate();
                let Month = date.getMonth() + 1;
                let Year = date.getFullYear();
                this.setState({
                    Day,
                    Month,
                    Year
                }) 
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //debugger;
        const formDate = (this.state.Year+ "," +this.state.Month + ","+this.state.Day);
        let date = new Date(formDate);
        console.log("New updated date: " ,date);
        let Employee = {
            name: this.state.fields.name,
            department: this.state.fields.department,
            gender: this.state.fields.gender,
            profile: this.state.fields.profile,
            notes: this.state.fields.notes,
            salary: this.state.fields.salary,
            date: date
        }; 
        console.log("Date employee: " , Employee.date);
        (this.props.match.params.id === undefined) ? (
            addEmployee(Employee).then(
                data => {
                    alert("Employee added");
                }).catch (
                    error => {
                        alert("Cannot add Employee");
                    }
                )
        ) : (
            putEmployee(this.props.match.params.id , Employee).then(
                (id, data) => {
                    alert("Employee updated")
                }).catch ( 
                    error => {
                        alert("Employee cannot be updated")
                    }
            )
        )
    }

    render () {
        //console.log(this.props.history);
        //console.log(this.props.match);
        return (
            <div className="payroll-main">
                <Toolbar />
                <div className="form-content">
                    <form className="form" onSubmit={(e) => this.handleSubmit(e)} >
                    <div className="form-head">Employee Payroll Form</div>
                    <div className="row-content">   
                        <label className="label text" htmlFor="name">Name</label>
                        <input className="input" type="text" onChange={(event) => this.handleChange(event)} id="name" value={this.state.fields.name} name="name" placeholder="Your name.." />
                        <error-output className="text-error" htmlFor="text">{this.state.error.name}</error-output>
                    </div>
                    <div className="row-content" >
                        <label className="label text" htmlFor="profile">Profile image</label>
                        <div className="profile-radio-content" onChange={(event) => this.handleChange(event)} >
                            <label>
                                <input type="radio" id="profile1" name="profile" value="../assets/profile-images/Ellipse -3.png" checked={this.state.fields.profile === "../assets/profile-images/Ellipse -3.png" }/> 
                                <img className="profile" id="image1" src={image3}/>
                            </label>
                            <label>
                                <input type="radio" id="profile2" name="profile" value="../assets/profile-images/Ellipse -1.png" alt="image1" checked={this.state.fields.profile === "../assets/profile-images/Ellipse -1.png"  }/>
                                <img className="profile" id="image2" src={image1} />
                            </label>
                            <label>
                                <input type="radio" id="profile3" name="profile" value="../assets/profile-images/Ellipse -8.png" alt="image8" checked={this.state.fields.profile === "../assets/profile-images/Ellipse -8.png"  }/>
                                <img className="profile" id="image3" src={image8} />
                            </label>
                            <label>
                                <input type="radio" id="profile4" name="profile" value="../assets/profile-images/Ellipse -7.png" alt="image7" checked={this.state.fields.profile ===  "../assets/profile-images/Ellipse -7.png" }/>
                                <img className="profile" id="image4" src={image7} />
                            </label>
                        </div>
                    </div>
                        <div className="row-content">
                            <label className="label text" htmlFor="gender" >Gender</label>
                            <div onChange={(event) => this.handleChange(event)} >
                                <input type="radio" id="male" name="gender" value="male" checked={this.state.fields.gender === "male" }/>
                                <label className="text" htmlFor="male">Male</label>
                                <input type="radio" id="female" name="gender" value="female" checked={this.state.fields.gender === "female" }/>
                                <label className="text" htmlFor="female">Female</label>
                            </div>
                        </div>
                        <div className="row-content">
                            <label className="label text" htmlFor="department" >Department</label>
                            <div onChange={(event) => this.handleChange(event)}>
                                <input className="checkbox dept" type="radio" id="hr" name="department" value="HR" checked={this.state.fields.department === "HR" }/>
                                <label className="text" htmlFor="hr">HR</label>
                                <input className="checkbox dept" type="radio" id="sales" name="department" value="Sales" checked={this.state.fields.department === "Sales" }/>
                                <label className="text" htmlFor="sales">Sales</label>
                                <input className="checkbox dept" type="radio" id="finance" name="department" value="Finance" checked={this.state.fields.department === "Finance" }/>
                                <label className="text" htmlFor="finance">Finance</label>
                                <input className="checkbox dept" type="radio" id="engineer" name="department" value="Engineer" checked={this.state.fields.department === "Engineer" }/>
                                <label className="text" htmlFor="engineer">Engineer</label>
                                <input className="checkbox dept" type="radio" id="others" name="department" value="Others" checked={this.state.fields.department === "Others" }/>
                                <label className="text" htmlFor="others">Others</label>
                            </div>
                        </div>
                        <div className="row-content">
                            <label className="label text" htmlFor="salary">Choose your salary: </label>
                            <input className="input" type="range" name="salary" id="salary" min="300000" max="500000" value={this.state.fields.salary} step="100" onChange={(event) => this.handleChange(event)}/>
                            <output className="salary-output text" htmlFor="salary" >{this.state.fields.salary}</output>
                        </div>
                        <div className="row-content" >
                            <label className="label text" htmlFor="startDate" >Start Date</label>
                            <div id="date" name="date">
                                <select id="day" name="Day" onChange={(event) => this.handleDate(event)} value={this.state.Day}>
                                    <option value="1" >1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    {/* <option value="31">31</option> */}
                                </select>
                                <select id="month" name="Month" onChange={(event) => this.handleMonth(event)} value={this.state.Month}>
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                                <select id="year" name="Year" onChange={(event) => this.handleYear(event)} value={this.state.Year}>
                                    <option value="2020" >2020</option>
                                    <option value="2019" >2019</option>
                                    <option value="2018" >2018</option>
                                    <option value="2017" >2017</option>
                                    <option value="2016" >2016</option>
                                </select>
                            </div>
                            <error-output className="date-error" htmlFor="startDate"></error-output>
                        </div>
                        <div className="row-content">
                            <label className="label text" htmlFor="notes">Notes</label>
                            <textarea id="notes" className="input" name="notes" placeholder="" onChange={(event) => this.handleChange(event)} value={this.state.fields.notes}></textarea>
                        </div>
                        <div className="buttonParent">
                            <a href="./home.html" className="resetButton button cancelButton">Cancel</a>
                            <div className="submit-reset">
                                <button type="submit" className="button submitButton" id="submitButton" >Submit</button>
                                <button type="reset" className="resetButton button">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default PayrollForm