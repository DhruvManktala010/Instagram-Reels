import { useContext, useEffect } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../../AuthProvider";
import { auth, provider,signInWithGoogle } from "../../Firebase/firebase";
import "./login.css";
const Login = () => {
    let user = useContext(AuthContext);
    console.log("i am in login");
    return (
        <>  
            {user?<Redirect to="/"/>:" "}
            <div className="login-page">
                <div className="container">
                    <h1>Reels Login</h1>
                    <button type="button" class="btn btn-primary login" onClick={signInWithGoogle}>
                        Login with Google
                    </button>
                </div>
            </div>

        </>
    );
}

export default Login;