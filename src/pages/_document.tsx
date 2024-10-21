import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" href="/img/brand/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/img/brand/apple-icon.png"
          />
          <link href="/fontawesome-free/css/all.min.css" rel="stylesheet" />
        </Head>
        <body
          data-typography="poppins"
          data-theme-version="light"
          data-layout="vertical"
          data-primary="color_1"
          data-nav-headerbg="color_3"
          data-headerbg="color_3"
          data-sidebar-style="full"
          data-sibebarbg="color_1"
          data-secondary="color_1"
          data-sidebar-position="fixed"
          data-header-position="fixed"
          data-container="wide"
          className="text-blueGray-700 antialiased"
        >
          <div id="page-transition" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
