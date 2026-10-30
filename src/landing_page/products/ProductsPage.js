import React from "react";
import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";

function ProductsPage() {
    return (
        <>
            <Hero />

            {/* Kite */}
            <LeftSection
                imageUrl="media/images/kite.png"
                productName="Kite"
                productDescription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
                tryDemo=""
                learnMore=""
                googlePlay=""
                appStore=""
            />

            {/* Console */}
            <RightSection
                imageUrl="media/images/console.png"
                productName="Console"
                productDescription="The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations."
                learnMore="https://console.zerodha.com/"
                linkName="Learn more"
            />

            {/* Coin */}
            <LeftSection
                imageUrl="media/images/coin.png"
                productName="Coin"
                productDescription="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
                tryDemo={undefined}
                learnMore="https://coin.zerodha.com/"
                googlePlay=""
                appStore=""
            />

            {/* Kite Connect API */}
            <RightSection
                imageUrl="media/images/kiteconnect.png"
                productName="Kite Connect API"
                productDescription="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase."
                learnMore="https://kite.trade/"
                linkName="Kite Connect"
            />

            {/* Varsity */}
            <LeftSection
                imageUrl="media/images/varsity.png"
                productName="Varsity mobile"
                productDescription="An easy-to-grasp collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-sized cards to help you learn on the go."
                googlePlay=""
                appStore=""
            />

            {/* Tech Blog Callout */}
            <div className="container text-center" style={{ paddingTop: "80px", paddingBottom: "60px" }}>
                <h5
                    className="fw-normal"
                    style={{
                        fontSize: "1.25rem",
                        color: "#424242",
                        lineHeight: 1.6,
                    }}
                >
                    Want to know more about our technology stack? Check out the{" "}
                    <a
                        href="https://zerodha.tech/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-decoration-none"
                        style={{ color: "#387ed1" }}
                    >
                        Zerodha.tech
                    </a>{" "}
                    blog.
                </h5>
            </div>

            <Universe />
        </>
    );
}

export default ProductsPage;
