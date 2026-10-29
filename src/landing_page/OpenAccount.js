import React from 'react';

function OpenAccount() {
    return (
        <div className='container text-center py-5 my-4'>
            <div className='row justify-content-center'>
                <div className='col-12'>
                    <h1 className='fs-2 fw-semibold mb-3'>Open a Zerodha account</h1>
                    <p className='fs-5 text-muted mb-4'>
                        Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&amp;O trades.
                    </p>
                    <button 
                        className='btn btn-primary fs-5 py-2 px-4' 
                        style={{ minWidth: "200px" }}
                    >
                        Sign up for free
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OpenAccount;
