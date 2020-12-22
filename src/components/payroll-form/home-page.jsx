import React from 'react'
import Toolbar from './toolbar'
import './home-page.css'
import {getEmployees} from '../../services/employee-service'
import icon1 from '../assets/icons/create-black-18dp.svg'
import icon2 from '../assets/icons/delete-black-18dp.svg'
import image3 from '../assets/profile-images/Ellipse -3.png'
import image1 from '../assets/profile-images/Ellipse -1.png'
import image8 from '../assets/profile-images/Ellipse -8.png'
import image7 from '../assets/profile-images/Ellipse -7.png'
import {deleteEmployee} from '../../services/employee-service'

class HomePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            employeeData: []
        }
    }

    handleDelete = (id) => {
        deleteEmployee(id);
        console.log(id);
    }

    handleUpdate = (id) => {
        window.location.href = `./form/${id}`;
    }

    componentDidMount() {
       getEmployees().then(data => {
            console.log(data);
            this.setState({
                employeeData: data
            })
        });
    }

    render() {
        const {employeeData} = this.state;
        return(
            <div className="payroll-home">
                <Toolbar />
                <div className="main-content">
                    <div className="header-content">
                        <div className="emp-detail-text">
                            Employee Details <div className="emp-count">{employeeData.data && employeeData.data.length}</div>
                        </div>
                        <a href="./form" className="add-button">
                            <img src="../assets/icons/add-24px.svg" alt="" />Add User
                        </a>
                        </div>
                        <div className="table-main">
                            <table id="table-display" className="table">
                            <tbody>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Gender</th>
                                    <th>Department</th>
                                    <th>Salary</th>
                                    <th>Start Date</th>
                                    <th>Notes</th>
                                    <th>Actions</th>    
                                </tr>
                                {employeeData.data && employeeData.data.map(emp => {
                                    return (
                                        <tr>
                                            <td>
                                                <img class="profile" alt="" src={
                                                    emp.profile === "../assets/profile-images/Ellipse -1.png" ? image1 
                                                    : emp.profile === "../assets/profile-images/Ellipse -3.png" ? image3 
                                                    : emp.profile === "../assets/profile-images/Ellipse -7.png" ? image7 
                                                    : image8 
                                                } />
                                            </td>
                                            <td>{emp.name}</td>
                                            <td>{emp.gender}</td>
        
                                            {/* <td>{emp.department.map(dept => {
                                                    return (
                                                        ( <div className='dept-label'>{dept}</div>)
                                                    )
                                            })}</td> */}
                                            <td className="dept-label">{emp.department}</td>
                                            <td>{emp.salary}</td>
                                            <td>{emp.date}</td>
                                            <td>{emp.notes}</td>
                                            <td>
                                                <img alt="delete" src={icon2} onClick={() => this.handleDelete(emp.id)}/>
                                                <img alt="edit" src={icon1} onClick={() => this.handleUpdate(emp.id)} />
                                            </td>
                     
                                        </tr>
                                    )
                                })}
                        </tbody>
                            </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage