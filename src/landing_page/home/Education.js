import React from 'react';

function Education() {
    return (
        <div className="container py-5 my-3">
            <div className="row align-items-center gx-lg-4 gy-4">
                {/* Left Column: Education Illustration */}
                <div className="col-12 col-lg-6 text-center">
                    <img 
                        src='/media/images/education.svg' 
                        alt='Education' 
                        className='img-fluid' 
                        style={{ width: '95%' }}
                    />
                </div>

                {/* Right Column: Educational Resources */}
                <div className="col-12 col-lg-6">
                    <h1 className='mb-3 fs-2'>Free and open market education</h1>
                    
                    <p className='text-muted mb-2'>
                        Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.
                    </p>
                    <a 
                        href='https://zerodha.com/varsity/' 
                        target='_blank' 
                        rel='noreferrer' 
                        className='text-decoration-none d-inline-block mb-4'
                    >
                        Varsity <i className="fa-solid fa-arrow-right-long ms-1"></i>
                    </a>

                    <p className='text-muted mb-2'>
                        TradingQ&amp;A, the most active trading and investment community in India for all your market related queries.
                    </p>
                    <a 
                        href='https://tradingqna.com/' 
                        target='_blank' 
                        rel='noreferrer' 
                        className='text-decoration-none d-inline-block'
                    >
                        TradingQ&amp;A <i className="fa-solid fa-arrow-right-long ms-1"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Education;
