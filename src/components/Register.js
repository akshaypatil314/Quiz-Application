import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CommonNavbar from "./CommonNavbar";
import anim from "./imag3.avif"

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            username: username,
            email: email,
            password: password
        };

        try {
            const response = await axios.post(
                "http://localhost:8081/api/users",
                newUser
            );

            const msg = response.data;
            if (msg === "User Added Successfully") {
                console.log("User added successfully");
                setUsername("");
                setEmail("");
                setPassword("");
                navigate("/login");
            }
            else {
                setError("User already Exists");
            }

        } catch (error) {
            console.log(error)
            setError("Failed to add User");
        }
    }

    let mystyle = {
        backgroundColor: '#010b1c',
        color: 'white',
    }

    return (
        <>
            <CommonNavbar />
            <div>

                <div className="container p-3" >
                    <div className="row">
                        <div className="col-md-6">
                            <img src={anim} style={{ borderRadius: 10, marginTop: 110, height: 350, marginLeft: 20 }} />
                        </div>
                        <div className="col-md-4" style={{ marginTop: 100 }}>
                            <div className="card">
                                <div className="card-body card-custom" style={mystyle}>
                                    <h2 className="text-center">Register</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group mt-2">
                                            <label htmlFor="username">Username:</label>
                                            <input
                                                style={mystyle}
                                                className="form-control mt-2"
                                                type="text"
                                                id="username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group mt-2">
                                            <label htmlFor="email">Email:</label>
                                            <input
                                                style={mystyle}
                                                className="form-control mt-2"
                                                type="email"
                                                id="email"
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
                                            Register
                                        </button>
                                        {error && <div className="text-danger mt-3">{error}</div>}
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div >

        </>
    )
}

export default Register;