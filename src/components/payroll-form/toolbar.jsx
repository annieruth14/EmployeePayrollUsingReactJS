import React from 'react'
import './payroll-form.css'
import logo from "../assets/logo.png"

class toolbar extends React.Component {
    
    render() {
        return (
            <div className="logo-content">
                <img src={logo} alt="image1" />
                    <div>
                        <span className="emp-text">EMPLOYEE</span><br />
                        <span className="emp-text emp-payroll">PAYROLL</span>
                    </div>
            </div>
        )
    }
}

export default toolbar