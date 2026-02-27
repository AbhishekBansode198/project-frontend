// import axios from "axios";
// import { useState } from "react";
//
// function LoginPage() {
//     const [eCode, setECode] = useState("");
//     const [password, setPassword] = useState("");
//
//     const handleLogin = async (e) => {
//         e.preventDefault();
//
//         try {
//             const response = await axios.post(
//                 "http://localhost:8080/api/auth/login",
//                 {
//                     eCode: Number(eCode),
//                     password: password
//                 }
//             );
//
//             const user = response.data;
//
//             // Role-based redirect
//             if (user.role === "ADMIN") {
//                 window.location.href = "/admin-dashboard";
//             } else if (user.role === "VP") {
//                 window.location.href = "/vp-dashboard";
//             }
//          else if (user.role === "DISPATCH") {
//             window.location.href = "/dispatch-dashboard";
//         } else {
//                 window.location.href = "/user-dashboard";
//             }
//
//         } catch (error) {
//             alert("Invalid credentials");
//         }
//     };
//
//     return (
//         <form onSubmit={handleLogin}>
//             <h2>Login</h2>
//
//             <input
//                 type="number"
//                 placeholder="Employee Code"
//                 value={eCode}
//                 onChange={(e) => setECode(e.target.value)}
//                 required
//             />
//
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//             />
//
//             <button type="submit">Login</button>
//         </form>
//     );
// }
//
// export default LoginPage;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
    const [eCode, setECode] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/login",
                {
                    eCode: Number(eCode),
                    password: password,
                }
            );

            const user = response.data;

            // Save logged user
            localStorage.setItem("user", JSON.stringify(user));

            // Role-based routing
            if (user.role === "ADMIN") {
                navigate("/admin-dashboard");
            } else if (user.role === "VP") {
                navigate("/vp-dashboard");
            } else if (user.role === "DISPATCH") {
                navigate("/dispatch-dashboard");
            }
            else if (user.role === "DRIVER") {
                navigate("/driver-dashboard");
            }else if (user.role === "PRODUCTION") {
                navigate("/production-dashboard");
            }
            else if (user.role === "PURCHASE") {
                navigate("/purchase-dashboard");
            }
            else if (user.role === "SITE_SUPERVISOR") {
                navigate("/site_supervisor-dashboard");
            }
            else if (user.role === "COORDINATOR") {
                navigate("coordinator-dashboard");
            }
            else if (user.role === "POWDER_COATING") {
                navigate("powder_coating-dashboard");
            }
            else {
                alert("Unauthorized role");
            }

        } catch (error) {
            alert("Invalid credentials");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>ERP Login</h2>

                <form onSubmit={handleLogin}>
                    <input
                        type="number"
                        placeholder="Enter E-Code"
                        value={eCode}
                        onChange={(e) => setECode(e.target.value)}
                        required
                        style={styles.input}
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />

                    <button type="submit" style={styles.button}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f6fa",
    },
    card: {
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0px 5px 20px rgba(0,0,0,0.1)",
        width: "350px",
        textAlign: "center",
    },
    input: {
        width: "100%",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    button: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#2c3e50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default LoginPage;
