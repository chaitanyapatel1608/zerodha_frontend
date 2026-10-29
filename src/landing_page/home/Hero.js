import React from 'react';

function Hero() {
    return (
        <div className='container text-center py-5 my-3'>
            <div className='row justify-content-center'>
                <div className='col-12'>
                    <img 
                        src='/media/images/homeHero.png' 
                        alt='Home Hero' 
                        className='img-fluid mb-4'
                        style={{ width: "90%", maxWidth: "1050px" }}
                    />
                    <h1 className='mt-3 fs-2 fw-semibold'>Invest in everything</h1>
                    <p className='fs-5 text-muted mt-2 mb-4'>
                        Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.
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

export default Hero;
