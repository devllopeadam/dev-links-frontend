import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/favicon.png"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className="font-instrument-sans">{children}</body>
    </html>
  );
}
