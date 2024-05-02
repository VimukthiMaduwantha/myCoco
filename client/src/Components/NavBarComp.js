import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

function NavBarComp() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    // useEffect(() => {
    //     const role = localStorage.getItem("Role");
    //     if (role === "Admin" || role === "Staff" || role === "SupportStaff") {
    //         // alert("kanishka")
    //         // toast.success("Admin Found")
    //     } else {
    //         navigate("/Payments/Classfees")
    //     }
    // }, [])
    const role = localStorage.getItem("role");
    const user = localStorage.getItem("user");
    const name = localStorage.getItem("name");

    function LogOut() {
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        localStorage.removeItem('regNo');
        navigate('/logIn')
        window.location.reload()
    }

    return (
        <div className="Navbar">
            <div>
                <span className="nav-logo">COCO</span>
            </div>
            <div className={`nav-items ${isOpen && "open"}`}>
                {role == 1 ? <a href="/adminManagement">Admin Management</a> : null}
                {role == 0 ? <a href="/dailyTaskManagement">Task Management</a> : null}
                {role == 0 ? <a href="/plantDetails">Plant Management</a> : null}
                {role == 0 ? <a href="/mediumCondition">Medium Condition</a> : null}
                {user ? <a onClick={() => LogOut()}>Log Out | {name}</a> : <a href="/logIn">Log In</a>}

            </div>
            <div
                className={`nav-toggle ${isOpen && "open"}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="bar"></div>
            </div>
        </div>
    );
}

export default NavBarComp