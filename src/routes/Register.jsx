import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { Context, server } from '../main'
import { toast } from 'react-hot-toast'

export const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context)

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`${server}/users/new`, {
                name, email, password,
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder='NAME'
                        required
                    />
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
                    <button disabled={loading} type='submit'>SIGN UP</button>
                    <h5>ALREADY HAVE AN ACCOUNT ?</h5>
                    <Link to='/login'>LOGIN</Link>
                </form>
            </section>
        </div>
    )
}
