import React, { useState } from 'react';

function Team() {
    const [openBios, setOpenBios] = useState({});

    const toggleBio = (id) => {
        setOpenBios((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const teamMembers = [
        {
            id: 'nikhil',
            name: 'Nikhil Kamath',
            title: 'Co-founder & CFO',
            image: '/media/images/Nikhil.jpg',
            bio: 'Nikhil is an astute and experienced investor, and he heads financial planning at Zerodha. An avid reader, he always appreciates a good game of chess.'
        },
        {
            id: 'kailash',
            name: 'Dr. Kailash Nadh',
            title: 'CTO',
            image: '/media/images/Kailash.jpg',
            bio: 'Kailash has a PhD in Artificial Intelligence & Computational Linguistics, and is the brain behind all our technology and products. He has been a developer from his adolescence and continues to write code every day.'
        },
        {
            id: 'venu',
            name: 'Venu Madhav',
            title: 'COO',
            image: '/media/images/Venu.jpg',
            bio: 'Venu is the backbone of Zerodha taking care of operations and ensuring that we are compliant to rules and regulations. He has over a dozen certifications in financial markets and is also proficient in technical analysis. Workouts, cycling, and adventuring is what he does outside of Zerodha.'
        },
        {
            id: 'seema',
            name: 'Seema Patil',
            title: 'Director',
            image: '/media/images/Seema.jpg',
            bio: 'Seema who has lead the quality team since the beginning of Zerodha, is now a director. She is an extremely disciplined fitness enthusiast.'
        },
        {
            id: 'karthik',
            name: 'Karthik Rangappa',
            title: 'Chief of Education',
            image: '/media/images/karthik.jpg',
            bio: "Karthik \"Guru\" Rangappa single handledly wrote Varsity, Zerodha's massive educational program. He heads investor education initiatives at Zerodha and loves stock markets, classic rock, single malts, and photography."
        },
        {
            id: 'austin',
            name: 'Austin Prakesh',
            title: 'Director Strategy',
            image: '/media/images/Austin.jpg',
            bio: 'Austin is a successful self-made entrepreneur from Singapore. His area of specialty revolves around helping organisations including grow by optimizing revenue streams and creating growth strategies. He is a boxing enthusiast and loves collecting exquisite watches.'
        }
    ];

    return (
        <div className="container" style={{ maxWidth: "980px" }}>
            {/* Section Heading */}
            <div className="text-center" style={{ paddingTop: "70px", paddingBottom: "60px" }}>
                <h2 className="fw-medium text-dark" style={{ fontSize: "2rem" }}>People</h2>
            </div>

            {/* Founder Profile Section */}
            <div className="row justify-content-center pb-5 mb-5 gx-0">

                {/* Left Column: Image, Name & Title */}
                <div className="col-12 col-md-5 text-center">
                    <img
                        src="/media/images/photo.jpeg"
                        alt="Nithin Kamath"
                        className="img-fluid rounded-circle mb-3"
                        style={{
                            width: "318px",
                            height: "318px",
                            maxWidth: "100%",
                            objectFit: "cover"
                        }}
                    />

                    <h4
                        className="mt-3 mb-3"
                        style={{
                            fontSize: "20px",
                            fontWeight: "400",
                            color: "#424242"
                        }}
                    >
                        Chaitanya Patel
                    </h4>

                    <p
                        className="text-muted mb-0"
                        style={{
                            fontSize: "16px",
                            lineHeight: "1.5"
                        }}
                    >
                        Founder, CEO
                    </p>
                </div>

                {/* Right Column: Bio & Links */}
                <div
                    className="col-12 col-md-7"
                    style={{
                        fontSize: "18px",
                        lineHeight: "1.7",
                        color: "#424242",
                        paddingLeft: "30px",
                        paddingTop: "14px"
                    }}
                >
                    <p className="mb-3">
                        Chaitanya bootstrapped and founded Zerodha in 2010 to overcome the
                        <br />
                        hurdles he faced during his decade long stint as a trader. Today,
                        <br />
                        Zerodha has changed the landscape of the Indian broking industry.
                    </p>

                    <p className="mb-3">
                        He is a member of the SEBI Secondary Market Advisory Committee
                        <br />
                        (SMAC) and the Market Data Advisory Committee (MDAC).
                    </p>

                    <p className="mb-3">
                        Playing basketball is his zen.
                    </p>

                    <p className="mb-0">
                        Connect on{" "}
                        <a
                            href="https://nithinkamath.me"
                            target="_blank"
                            rel="noreferrer"
                            className="text-decoration-none"
                            style={{ color: "#387ed1" }}
                        >
                            Homepage
                        </a>
                        {" / "}
                        <a
                            href="https://tradingqna.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-decoration-none"
                            style={{ color: "#387ed1" }}
                        >
                            TradingQnA
                        </a>
                        {" / "}
                        <a
                            href="https://twitter.com/Nithin0dha"
                            target="_blank"
                            rel="noreferrer"
                            className="text-decoration-none"
                            style={{ color: "#387ed1" }}
                        >
                            Twitter
                        </a>
                    </p>
                </div>
            </div>

            {/* Leadership Team Members Grid */}
            <div className="row g-5 pb-5 mb-5">
                {teamMembers.map((member) => {
                    const isOpen = !!openBios[member.id];
                    return (
                        <div key={member.id} className="col-12 col-md-4 text-center">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="img-fluid rounded-circle mb-3"
                                style={{ 
                                    width: "215px", 
                                    height: "215px", 
                                    maxWidth: "100%",
                                    objectFit: "cover" 
                                }}
                            />
                            <h4 className="mt-2 fs-5 fw-medium text-dark mb-1">
                                {member.name}
                            </h4>
                            <p className="text-muted mb-2" style={{ fontSize: "0.95rem" }}>
                                {member.title}
                            </p>

                            {/* Dropdown Toggle */}
                            <button
                                type="button"
                                className="btn btn-link text-decoration-none p-0 text-muted d-inline-flex align-items-center"
                                onClick={() => toggleBio(member.id)}
                                style={{ fontSize: "0.95rem", boxShadow: "none", color: "#666" }}
                            >
                                Bio {isOpen ? (
                                    <i className="fa-solid fa-angle-up ms-1" style={{ fontSize: "0.75rem" }}></i>
                                ) : (
                                    <i className="fa-solid fa-angle-down ms-1" style={{ fontSize: "0.75rem" }}></i>
                                )}
                            </button>

                            {/* Expandable Bio Text */}
                            {isOpen && (
                                <div 
                                    className="text-start mt-3 mx-auto"
                                    style={{ 
                                        maxWidth: "280px",
                                        fontSize: "0.92rem", 
                                        lineHeight: "1.75", 
                                        color: "#555"
                                    }}
                                >
                                    <p className="mb-0">{member.bio}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Team;
