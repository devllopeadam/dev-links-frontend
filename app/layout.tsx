import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { UserSessionProvider } from "./context/UserSessionContext";
import { UserDataProvider } from "./context/UserDataContext";


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
          href="/favicon.png"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className="font-sans">
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
