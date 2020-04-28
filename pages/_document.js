import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="vi">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Yaha</title>
          <link rel="shortcut icon" href="/static/images/favicon.png" />
          {/* Font face */}
          <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i|Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i&display=swap" rel="stylesheet" />
          <link href="/static/font-faces/metropolis/metropolis.css" rel="stylesheet" />
          {/* CSS Plugins */}
          <link href="/static/css/font-icons.css" rel="stylesheet" />
          <link href="/static/css/main.css" rel="stylesheet" />
          {/* CSS Custom */}
          <link href="/static/css/your-style.css" rel="stylesheet" />
          <script
            src="https://code.jquery.com/jquery-2.2.4.js"
            integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
            crossorigin="anonymous">

          </script>
          <script key="custom-js.js" type="text/javascript" src="/static/js/custom-js.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />

        </body>
      </html>
    );
  }
}
