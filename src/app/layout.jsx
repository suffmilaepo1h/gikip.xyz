import "./globals.css";

export const metadata = {};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="initial-scale=1, viewport-fit=cover, user-scalable=no, width=device-width"
        ></meta>
        <title>Gikip</title>
        <link rel="preload" href="/media/cloud3.png" as="image" />
        <link rel="preload" href="/media/cloud2.png" as="image" />
        <link rel="preload" href="/media/cloud1.png" as="image" />

        <link rel="stylesheet" href="" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
