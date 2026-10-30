import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className='container text-center py-5 my-4'>
            <div className='row justify-content-center'>
                <div className='col-12'>
                    <h1 className='fs-2 fw-semibold mb-3'>Page Not Found</h1>
                    <p className='fs-5 text-muted mb-4'>
                        The page you are looking for does not exist.    
                    </p>
                    <Link 
                        className='btn btn-primary fs-5 py-2 px-4' 
                        style={{ minWidth: "200px" }}
                        to="/"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
