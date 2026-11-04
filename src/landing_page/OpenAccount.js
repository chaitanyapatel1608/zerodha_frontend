import React from 'react';
import { Link } from 'react-router-dom';

function OpenAccount() {
    return (
        <div className='container text-center py-5 my-4'>
            <div className='row justify-content-center'>
                <div className='col-12'>
                    <h1 className='fs-2 fw-semibold mb-3'>Open a Zerodha account</h1>
                    <p className='fs-5 text-muted mb-4'>
                        Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&amp;O trades.
                    </p>
                    <Link 
                        to="/signup"
                        className='btn btn-primary fs-5 py-2 px-4 shadow-sm' 
                        style={{ minWidth: "200px", textDecoration: "none" }}
                    >
                        Sign up for free
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default OpenAccount;
