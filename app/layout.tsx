
import { ThemeProvider } from "next-themes";
import { Layout } from "components/layout";
import { Toaster } from "react-hot-toast";
import { type PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';
import "@/styles/globals.css";

const MyApp = ({children
}:PropsWithChildren) => {
  return (
    <html>
      <body>
      <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Layout>
          {children}
          <Toaster />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
      </body>
    </html>
    
  );
};

export default MyApp
