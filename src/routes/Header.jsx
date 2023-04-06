import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import { toast } from 'react-hot-toast'
import axios from 'axios'

export const Header = () => {
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context)

    const logoutHandler = async () => {
        setLoading(true);
        try {
            await axios.get(`${server}/users/logout`, {
                withCredentials: true,
            });
            toast.success('Logged Out');
            setIsAuthenticated(false);
            setLoading(false);
        } catch (error) {
            toast.error('Error');
            setIsAuthenticated(true);
            setLoading(false);
        }
    };

    return (
        <nav className="header">
            <div>
                <h2>Task Manager.</h2>
            </div>
            <article>
                <Link to={'/'}>HOME</Link>
                <Link to={'/profile'}>PROFILE</Link>
                {isAuthenticated ? (
                    <button disabled={loading} onClick={logoutHandler} className="btn">LOGOUT</button>
                ) : (
                    <Link to={'/login'}>LOGIN</Link>
                )}
            </article>
        </nav>
    )
}
