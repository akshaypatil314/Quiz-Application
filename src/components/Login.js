import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CommonNavbar from "./CommonNavbar";
import login from "./login.png"
import "../App.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8081/login", {
                email: email,
                password: password,
            });

            const role = response.data;
            // Handle the role based on the response
            if (role === "admin") {
                // navigate("/admin");
                navigate("/admin", { state: "admin" });
            } else if (role === "user") {
                // Redirect to the user page
                navigate("/user", { state: "user" });
                // navigate("/user");
                setError("User logged");
            } else {
                setError("Invalid credentials");
            }
        } catch (error) {
            setError("Failed to log in");
        }
    };

    let mystyle = {
        backgroundColor: '#010b1c',
        color: 'white',
    }

    return (
        <>
            <CommonNavbar />
            <div>
                <div className="container p-3">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={login} />
                        </div>
                        <div className="col-md-4" style={{ marginTop: 100 }}>
                            <div className="card"  >
                                <div className="card-body card-custom" style={mystyle}>

                                    <h2 className="text-center">Login</h2>

                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="username">Email:</label>
                                            <input
                                                style={mystyle}
                                                className="form-control mt-2"
                                                type="text"
                                                id="username"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group mt-2">
                                            <label htmlFor="password">Password:</label>
                                            <input
                                                style={mystyle}
                                                className="form-control mt-2"
                                                type="password"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <button className="btn btn-primary mt-3" type="submit">
                                            Log In
                                        </button>
                                        {error && <div className="text-danger mt-3">{error}</div>}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>

    );
};

export default Login;
