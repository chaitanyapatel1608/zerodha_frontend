import React from 'react';

function Hero() {
    return (
        <div className='container'>
            {/* Header Section */}
            <div 
                className='text-center'
                style={{ paddingTop: '80px', paddingBottom: '90px' }}
            >
                <h1 
                    className='fw-medium text-dark mb-3' 
                    style={{ fontSize: '2.5rem' }}
                >
                    Charges
                </h1>
                <p 
                    className='text-muted' 
                    style={{ fontSize: '1.25rem' }}
                >
                    List of all charges and taxes
                </p>
            </div>

            {/* 3 Pricing Pillars */}
            <div className='row text-center gx-lg-5 gy-5 pb-5 mb-5'>
                {/* Free Equity Delivery */}
                <div className='col-12 col-md-4 px-lg-4'>
                    <div style={{ height: '180px' }} className='d-flex align-items-center justify-content-center mb-4'>
                        <img 
                            src='/media/images/pricingEquity.svg' 
                            alt='Free equity delivery' 
                            className='img-fluid'
                            style={{ maxWidth: '240px' }}
                        />
                    </div>
                    <h2 className='fs-3 fw-medium text-dark mb-3'>
                        Free equity delivery
                    </h2>
                    <p 
                        className='text-muted mx-auto'
                        style={{ fontSize: '0.98rem', lineHeight: '1.7', maxWidth: '320px' }}
                    >
                        All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.
                    </p>
                </div>

                {/* Intraday and F&O Trades */}
                <div className='col-12 col-md-4 px-lg-4'>
                    <div style={{ height: '180px' }} className='d-flex align-items-center justify-content-center mb-4'>
                        <img 
                            src='/media/images/intradayTrades.svg' 
                            alt='Intraday and F&O trades' 
                            className='img-fluid'
                            style={{ maxWidth: '240px' }}
                        />
                    </div>
                    <h2 className='fs-3 fw-medium text-dark mb-3'>
                        Intraday and F&amp;O trades
                    </h2>
                    <p 
                        className='text-muted mx-auto'
                        style={{ fontSize: '0.98rem', lineHeight: '1.7', maxWidth: '320px' }}
                    >
                        Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.
                    </p>
                </div>

                {/* Free Direct MF */}
                <div className='col-12 col-md-4 px-lg-4'>
                    <div style={{ height: '180px' }} className='d-flex align-items-center justify-content-center mb-4'>
                        <img 
                            src='/media/images/pricingMF.svg' 
                            alt='Free direct MF' 
                            className='img-fluid'
                            style={{ maxWidth: '240px' }}
                        />
                    </div>
                    <h2 className='fs-3 fw-medium text-dark mb-3'>
                        Free direct MF
                    </h2>
                    <p 
                        className='text-muted mx-auto'
                        style={{ fontSize: '0.98rem', lineHeight: '1.7', maxWidth: '320px' }}
                    >
                        All direct mutual fund investments are absolutely free — ₹ 0 commissions &amp; DP charges.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Hero;
