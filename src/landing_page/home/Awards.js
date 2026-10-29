import React from 'react';

function Awards() {
    return (
        <div className='container py-5 my-3'>
            <div className='row align-items-center gx-lg-4 gy-4'>
                <div className='col-12 col-lg-5 text-center'>
                    <img 
                        src='/media/images/largestbroker.svg' 
                        alt='Largest Broker' 
                        className='img-fluid'
                        style={{ width: "95%" }}
                    />
                </div>
                <div className='col-12 col-lg-7'>
                    <h1 className='fs-2 mb-3'>Largest stock broker in India</h1>
                    <p className='text-muted mb-4'>
                        2+ million Zerodha clients contribute to over 15% of all retail order volumes in India daily by trading and investing in:
                    </p>
                    <div className='row'>
                        <div className='col-6'>
                            <ul className='text-muted' style={{ lineHeight: '2' }}>
                                <li>Futures and Options</li>
                                <li>Commodity derivatives</li>
                                <li>Currency derivatives</li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <ul className='text-muted' style={{ lineHeight: '2' }}>
                                <li>Stocks &amp; IPOs</li>
                                <li>Direct mutual funds</li>
                                <li>Bonds and Govt. Securities</li>
                            </ul>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <img 
                            src='/media/images/pressLogos.png' 
                            alt='Press Logos' 
                            className='img-fluid'
                            style={{ width: '95%' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Awards;
