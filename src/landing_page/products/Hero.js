import React from 'react';

function Hero() {
    return (
        <div className='container'>
            <div
                className="text-center border-bottom mb-5"
                style={{
                    paddingTop: "80px",
                    paddingBottom: "70px",
                    borderColor: "#eee",
                }}
            >
                <div className="row justify-content-center">
                    <div className="col-12">
                        <h1
                            className="mb-3 text-dark fw-semibold"
                            style={{
                                fontSize: "2.75rem",
                                letterSpacing: "-0.5px",
                            }}
                        >
                            Zerodha Products
                        </h1>

                        <h3
                            className="text-muted fw-normal mb-3"
                            style={{
                                fontSize: "1.25rem",
                                lineHeight: "1.6",
                            }}
                        >
                            Sleek, modern, and intuitive trading platforms
                        </h3>

                        <p
                            className="mb-0 text-muted"
                            style={{
                                fontSize: "1.05rem",
                            }}
                        >
                            Check out our{" "}
                            <a
                                href="#offerings"
                                className="text-decoration-none"
                                style={{ color: "#387ed1" }}
                            >
                                investment offerings
                                <i className="fa-solid fa-arrow-right-long ms-1"></i>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
