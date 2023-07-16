import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const HeaderNav = ({ username }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Perform logout actions
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ fontSize: 20, fontWeight: 600 }}>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-brand m-3">Quiz App</div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin">
                            Add Question
                        </Link>
                    </li>
                    <li className="nav-item me-2">
                        <Link className="nav-link" to="/admin/show-question">
                            Show Question
                        </Link>
                    </li>
                    <li className="nav-item me-2">
                        <Link className="nav-link" to="/admin/generate-quiz">
                            Generate Quiz
                        </Link>
                    </li>
                    {/* <li className="nav-item me-2">
                        <Link className="nav-link" to="/admin/validate-answer">
                            User Response
                        </Link>
                    </li> */}

                    <li className="nav-item">
                        {username && <span className="nav-link">Welcome, {username}!</span>}
                    </li>
                </ul>
                <button className="btn btn-outline-light" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};
