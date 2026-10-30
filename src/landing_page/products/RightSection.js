import React from "react";

function RightSection({
    imageUrl,
    productName,
    productDescription,
    learnMore,
    linkName,
}) {
    const formattedImageUrl = imageUrl?.startsWith("/")
        ? imageUrl
        : `/${imageUrl}`;

    return (
        <div className="container py-5 my-4">
            <div className="row align-items-center gx-5 gy-4">

                {/* Left Column: Product Information */}
                <div
                    className="col-12 col-md-5"
                    style={{
                        paddingRight: "75px",
                        color: "#424242",
                    }}
                >
                    <h1
                        className="mb-4"
                        style={{
                            fontSize: "28px",
                            fontWeight: "400",
                            lineHeight: "1.5",
                            color: "#424242",
                        }}
                    >
                        {productName}
                    </h1>

                    <p
                        className="mb-4"
                        style={{
                            fontSize: "18px",
                            lineHeight: "1.75",
                            color: "#424242",
                            maxWidth: "360px",
                        }}
                    >
                        {productDescription}
                    </p>

                    {/* Action Link */}
                    {learnMore !== undefined && (
                        <div style={{ fontSize: "18px" }}>
                            <a
                                href={learnMore || "#"}
                                className="text-decoration-none"
                                style={{ color: "#387ed1" }}
                            >
                                {linkName ||
                                    (productName === "Kite Connect API"
                                        ? "Kite Connect"
                                        : "Learn more")}

                                <i className="fa-solid fa-arrow-right-long ms-2"></i>
                            </a>
                        </div>
                    )}
                </div>

                {/* Right Column: Product Illustration */}
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

            </div>
        </div>
    );
}

export default RightSection;