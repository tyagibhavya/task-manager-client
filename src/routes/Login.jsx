import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context)

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`${server}/users/login`, {
                email, password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            toast.success(data.message);
            setIsAuthenticated(true);
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(false);
            setLoading(false);
        }
    };

    if (isAuthenticated) return <Navigate to='/' />
    return (
        <div className="login">
            <section>
                <form onSubmit={submitHandler}>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder='EMAIL'
                        required
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder='PASSWORD'
                        required
                    />
                    <button disabled={loading} type='submit'>LOGIN</button>
                    <h5>CREATE A NEW ACCOUNT</h5>
                    <Link to='/register'>SIGN UP</Link>
                </form>
            </section>
        </div>
    )
}
