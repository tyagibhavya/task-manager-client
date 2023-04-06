import React, { useContext } from 'react'
import { Context } from '../main'
import { Loader } from '../components/Loader';
import { Navigate } from 'react-router-dom';

export const Profile = () => {
    const { isAuthenticated, loading, user } = useContext(Context);

    if (!isAuthenticated) return <Navigate to='/login' />

    return loading ? (
        <Loader />
    ) : (
        <div className="home">
            <div className="container">
                <div className="todosContainer">
                    <div className="todo">
                        <h1>{user?.name}</h1>
                        <p>{user?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
