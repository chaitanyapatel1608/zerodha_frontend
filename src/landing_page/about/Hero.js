import React from "react";

function Hero() {
  return (
    <div className="container">
      {/* Top Heading Banner */}
      <div
        className="text-center"
        style={{
          paddingTop: "85px",
          paddingBottom: "75px",
        }}
      >
        <h1
          className="fw-medium text-dark"
          style={{
            fontSize: "2.1rem",
            lineHeight: "1.5",
          }}
        >
          We pioneered the discount broking model in India.
          <br />
          Now, we are breaking ground with our technology.
        </h1>
      </div>

      {/* Two Column Story Section */}
      <div
        className="row border-top pt-5 pb-5"
        style={{
          borderColor: "#eee",
          fontSize: "18px",
          lineHeight: "1.7",
          color: "#424242",
          marginTop: "0",
        }}
      >
        {/* Left Column */}
        <div className="col-12 col-md-5 offset-md-1">
          <p className="mb-3">
            We kick-started operations on the 15th of August, 2010
            <br />
            with the goal of breaking all barriers that traders and
            <br />
            investors face in India in terms of cost, support, and
            <br />
            technology. We named the company Zerodha, a
            <br />
            combination of Zero and &ldquo;Rodha&rdquo;, the Sanskrit word for
            <br />
            barrier.
          </p>

          <p className="mb-3">
            Today, our disruptive pricing models and in-house
            <br />
            technology have made us the biggest stock broker in
            <br />
            India.
          </p>

          <p className="mb-3">
            Over 1.8+ crore clients place billions of orders every year
            <br />
            through our powerful ecosystem of investment
            <br />
            platforms, contributing over 15% of all Indian retail
            <br />
            trading volumes.
          </p>
        </div>

        {/* Right Column */}
        <div className="col-12 col-md-5">
          <p className="mb-3">
            In addition, we run a number of popular open online
            <br />
            educational and community initiatives to empower retail
            <br />
            traders and investors.
          </p>

          <p className="mb-3">
            <a
              href="https://rainmatter.com"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none"
              style={{ color: "#387ed1" }}
            >
              Rainmatter
            </a>
            , our fintech fund and incubator, has invested
            <br />
            in several fintech startups with the goal of growing the
            <br />
            Indian capital markets.
          </p>

          <p className="mb-3">
            And yet, we are always up to something new every day.
            <br />
            Catch up on the latest updates on our{" "}
            <a
              href="https://zerodha.com/z-connect/"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none"
              style={{ color: "#387ed1" }}
            >
              blog
            </a>{" "}
            or see what
            <br />
            the media is{" "}
            <a
              href="/media"
              className="text-decoration-none"
              style={{ color: "#387ed1" }}
            >
              saying about us
            </a>{" "}
            or learn more about our
            <br />
            business and product{" "}
            <a
              href="/philosophy"
              className="text-decoration-none"
              style={{ color: "#387ed1" }}
            >
              philosophies
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;