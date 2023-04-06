import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./routes/Home"
import { Header } from "./routes/Header"
import { Login } from "./routes/Login"
import { Profile } from "./routes/Profile"
import { Register } from "./routes/Register"
import { Toaster } from "react-hot-toast"
import { useContext, useEffect } from "react"
import axios from "axios"
import { Context, server } from "./main"

function App() {
    const { setUser, setIsAuthenticated, setLoading } = useContext(Context);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${server}/users/profile`, {
                withCredentials: true,
            })
            .then(res => {
                setUser(res.data.user);
                setIsAuthenticated(true);
                setLoading(false);
            })
            .catch((error) => {
                setIsAuthenticated(false);
                setUser({});
                setLoading(false);
            });
    }, []);

    return <Router>
        <Header />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/register' element={<Register />} />
        </Routes>
        <Toaster />
    </Router>
}

export default App
