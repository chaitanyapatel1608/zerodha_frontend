import React from 'react';

function Stats() {
    return (
        <div className="container py-5 my-3">
            <div className="row align-items-center gx-lg-4 gy-4">
                {/* Left Column: Trust Points */}
                <div className="col-12 col-lg-5">
                    <h1 className='fs-2 mb-4'>Trust with confidence</h1>

                    <h2 className='fs-4'>Customer-first always</h2>
                    <p className='text-muted mb-4'>
                        That's why 1.3+ crore customers trust Zerodha with ₹3.5+ lakh crores worth of equity investments.
                    </p>

                    <h2 className='fs-4'>No spam or gimmicks</h2>
                    <p className='text-muted mb-4'>
                        No gimmicks, spam, &ldquo;gamification&rdquo;, or annoying push notifications. High quality apps that you use at your pace, the way you like.
                    </p>

                    <h2 className='fs-4'>The Zerodha universe</h2>
                    <p className='text-muted mb-4'>
                        Not just an app, but a whole ecosystem. Our investment in 30+ fintech startups offer you tailored services specific to your needs.
                    </p>

                    <h2 className='fs-4'>Do better with money</h2>
                    <p className='text-muted mb-4'>
                        With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.
                    </p>
                </div>

                {/* Right Column: Ecosystem Image & Product Links */}
                <div className="col-12 col-lg-7 text-center">
                    <img 
                        src='/media/images/ecosystem.png' 
                        alt='Zerodha Ecosystem' 
                        className='img-fluid mb-4' 
                        style={{ width: '100%' }}
                    /> 
                    <div className="d-flex justify-content-center flex-wrap gap-4">
                        <a href='/products' className='text-decoration-none'>
                            Explore our products <i className="fa-solid fa-arrow-right-long ms-1"></i>
                        </a>
                        <a 
                            href='https://kite-demo.zerodha.com' 
                            target='_blank' 
                            rel='noreferrer' 
                            className='text-decoration-none'
                        >
                            Try Kite demo <i className="fa-solid fa-arrow-right-long ms-1"></i>
                        </a>
                    </div>
                </div>          
            </div>  
        </div>
    );
}

export default Stats;
