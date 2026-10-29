import React from 'react';

function Pricing() {
    return (
        <div className="container py-5 my-3">
            <div className="row align-items-center gx-lg-4 gy-4">
                {/* Left Description Column */}
                <div className="col-12 col-lg-5">
                    <h1 className='mb-3 fs-2'>Unbeatable pricing</h1>
                    <p className='text-muted mb-4'>
                        We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.
                    </p>
                    <a href='/pricing' className='text-decoration-none'>
                        See pricing <i className="fa-solid fa-arrow-right-long ms-1"></i>
                    </a>
                </div>

                {/* Right Pricing Cards Column */}
                <div className="col-12 col-lg-7">
                    <div className="row text-center g-3">
                        <div className="col-12 col-sm-6">
                            <div className="p-4 border rounded shadow-sm h-100 d-flex flex-column justify-content-center">
                                <h1 className='mb-2 fw-semibold'>₹0</h1>
                                <p className='text-muted mb-0'>
                                    Free equity delivery and <br /> direct mutual funds
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
                            <div className="p-4 border rounded shadow-sm h-100 d-flex flex-column justify-content-center">
                                <h1 className='mb-2 fw-semibold'>₹20</h1>
                                <p className='text-muted mb-0'>
                                    Intraday and F&amp;O
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;
