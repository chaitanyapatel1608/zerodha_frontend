import React from "react";

function Universe() {
    const partners = [
        {
            name: "Zerodha Fundhouse",
            logo: "/media/images/zerodhaFundhouse.png",
            description:
                "Our asset management venture that is creating simple and transparent index funds to help you save for your goals.",
            width: "auto",
            maxWidth: "210px",
            maxHeight: "55px",
        },
        {
            name: "Sensibull",
            logo: "/media/images/sensibull-logo.svg",
            description:
                "Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more.",
            width: "245px",
            maxWidth: "250px",
            maxHeight: "50px",
        },
        {
            name: "Tijori",
            logo: "/media/images/tijori.svg",
            description:
                "Investment research platform that offers detailed insights on stocks, sectors, supply chains, and more.",
            width: "auto",
            maxWidth: "180px",
            maxHeight: "55px",
        },
        {
            name: "Streak",
            logo: "/media/images/streak-logo.png",
            description:
                "Systematic trading platform that allows you to create and backtest strategies without coding.",
            width: "auto",
            maxWidth: "200px",
            maxHeight: "60px",
        },
        {
            name: "smallcase",
            logo: "/media/images/smallcase-logo.png",
            description:
                "Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs.",
            width: "auto",
            maxWidth: "220px",
            maxHeight: "60px",
        },
        {
            name: "Ditto",
            logo: "/media/images/ditto-logo.png",
            description:
                "Personalized advice on life and health insurance. No spam and no mis-selling.",
            width: "auto",
            maxWidth: "160px",
            maxHeight: "60px",
        },
    ];

    const styles = {
        section: {
            paddingTop: "70px",
            paddingBottom: "85px",
        },
        heading: {
            marginBottom: "65px",
        },
        headingTitle: {
            fontSize: "2.2rem",
            fontWeight: 700,
            color: "#222",
            marginBottom: "16px",
            letterSpacing: "-0.5px",
        },
        headingDescription: {
            fontSize: "1.1rem",
            lineHeight: 1.6,
            fontWeight: 500,
            color: "#424242",
            marginBottom: 0,
        },
        logoContainer: {
            height: "65px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "18px",
        },
        description: {
            maxWidth: "275px",
            margin: "0 auto",
            fontSize: "0.85rem",
            lineHeight: 1.6,
            fontWeight: 400,
            color: "#888",
        },
        partnerColumn: {
            textAlign: "center",
            marginBottom: "65px",
        },
        button: {
            minWidth: "220px",
            padding: "10px 24px",
            borderRadius: "3px",
            backgroundColor: "#387ed1",
            borderColor: "#387ed1",
            fontSize: "1.2rem",
            fontWeight: 500,
        },
    };

    return (
        <section style={styles.section}>
            <div className="container">
                {/* Heading */}
                <div className="text-center" style={styles.heading}>
                    <h2 style={styles.headingTitle}>
                        The Zerodha Universe
                    </h2>

                    <p style={styles.headingDescription}>
                        Extend your trading and investment experience even
                        further with our partner platforms
                    </p>
                </div>

                {/* Partner grid */}
                <div className="row gx-4 gy-0 justify-content-center">
                    {partners.map((partner) => (
                        <div
                            key={partner.name}
                            className="col-12 col-md-4"
                            style={styles.partnerColumn}
                        >
                            <div style={styles.logoContainer}>
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    style={{
                                        display: "block",
                                        width: partner.width || "auto",
                                        height: "auto",
                                        maxWidth: partner.maxWidth,
                                        maxHeight: partner.maxHeight,
                                        objectFit: "contain",
                                    }}
                                />
                            </div>

                            <p style={styles.description}>
                                {partner.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Signup button */}
                <div className="text-center" style={{ marginTop: "0px" }}>
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={styles.button}
                    >
                        Sign up for free
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Universe;
