import React from "react";

function LeftSection({
    imageUrl,
    productName,
    productDescription,
    tryDemo,
    learnMore,
    googlePlay,
    appStore,
}) {
    const formattedImageUrl = imageUrl?.startsWith("/")
        ? imageUrl
        : `/${imageUrl}`;

    return (
        <div className="container py-5 my-4">
            <div className="row align-items-center gx-5 gy-4">

                {/* Product Image */}
                <div className="col-12 col-md-7 text-center">
                    <img
                        src={formattedImageUrl}
                        alt={productName}
                        className="img-fluid"
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                        }}
                    />
                </div>

                {/* Product Information */}
                <div className="col-12 col-md-5">
                    <div
                        style={{
                            maxWidth: "390px",
                            marginLeft: "auto",
                            color: "#424242",
                        }}
                    >
                        <h1
                            style={{
                                fontSize: "28px",
                                fontWeight: 400,
                                lineHeight: 1.5,
                                marginBottom: "20px",
                                color: "#424242",
                            }}
                        >
                            {productName}
                        </h1>

                        <p
                            style={{
                                fontSize: "18px",
                                lineHeight: 1.75,
                                marginBottom: "20px",
                                color: "#424242",
                            }}
                        >
                            {productDescription}
                        </p>

                        {/* Action Links */}
                        <div
                            className="d-flex align-items-center flex-wrap"
                            style={{
                                gap: "40px",
                                marginBottom: "28px",
                                fontSize: "18px",
                            }}
                        >
                            {productName === "Coin" ? (
                                <a
                                    href="https://coin.zerodha.com/"
                                    className="text-decoration-none"
                                    style={{ color: "#387ed1" }}
                                >
                                    Coin
                                    <i className="fa-solid fa-arrow-right-long ms-2"></i>
                                </a>
                            ) : (
                                <>
                                    {tryDemo !== undefined && (
                                        <a
                                            href={tryDemo || "#"}
                                            className="text-decoration-none"
                                            style={{ color: "#387ed1" }}
                                        >
                                            Try demo
                                            <i className="fa-solid fa-arrow-right-long ms-2"></i>
                                        </a>
                                    )}

                                    {learnMore !== undefined && (
                                        <a
                                            href={learnMore || "#"}
                                            className="text-decoration-none"
                                            style={{ color: "#387ed1" }}
                                        >
                                            Learn more
                                            <i className="fa-solid fa-arrow-right-long ms-2"></i>
                                        </a>
                                    )}
                                </>
                            )}
                        </div>

                        {/* App Store Badges */}
                        {(googlePlay !== undefined || appStore !== undefined) && (
                            <div className="d-flex align-items-center flex-wrap gap-3">
                                {googlePlay !== undefined && (
                                    <a
                                        href={googlePlay || "#"}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <img
                                            src="/media/images/googlePlayBadge.svg"
                                            alt="Get it on Google Play"
                                            style={{
                                                height: "48px",
                                                width: "auto",
                                            }}
                                        />
                                    </a>
                                )}

                                {appStore !== undefined && (
                                    <a
                                        href={appStore || "#"}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <img
                                            src="/media/images/appstoreBadge.svg"
                                            alt="Download on the App Store"
                                            style={{
                                                height: "48px",
                                                width: "auto",
                                            }}
                                        />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftSection;