import React from 'react';

function Hero() {
    return (
        <div className="container pt-5 pb-3" style={{ maxWidth: "1200px" }}>
            {/* Top Row: Title & "My tickets" button */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <h2 className="fw-normal text-dark mb-0" style={{ fontSize: "2.1rem" }}>
                    Support Portal
                </h2>
                <a
                    href="https://support.zerodha.com"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary px-4 py-2"
                    style={{
                        backgroundColor: "#387ed1",
                        borderColor: "#387ed1",
                        fontSize: "0.95rem",
                        fontWeight: 400,
                        borderRadius: "3px",
                    }}
                >
                    My tickets
                </a>
            </div>

            {/* Search Bar Container */}
            <div className="position-relative mb-4">
                <i
                    className="fa-solid fa-magnifying-glass position-absolute"
                    style={{
                        left: "20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#999",
                        fontSize: "1.05rem",
                    }}
                ></i>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Eg: How do I open my account, How do i activate F&O..."
                    style={{
                        paddingLeft: "52px",
                        paddingRight: "20px",
                        height: "56px",
                        fontSize: "1rem",
                        borderRadius: "3px",
                        border: "1px solid #e0e0e0",
                        boxShadow: "none",
                        color: "#424242",
                        backgroundColor: "#fff",
                    }}
                />
            </div>
        </div>
    );
}

export default Hero;
