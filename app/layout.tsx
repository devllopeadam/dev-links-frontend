import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { UserSessionProvider } from "./context/UserSessionContext";
import { UserDataProvider } from "./context/UserDataContext";
import { Instrument_Sans } from 'next/font/google';


const instrument = Instrument_Sans({
  subsets: ['latin'],
})

export const metadata = {
  title: "Dev Links App",
  description: "Dev Links",
};

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
          href="/favicon.svg"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={instrument.className}>
        <UserSessionProvider>
          <UserDataProvider>
            {children}
          </UserDataProvider>
        </UserSessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
