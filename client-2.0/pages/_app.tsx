import "@styles/globals.css";
import RootLayout from './layout';
import type { AppProps } from 'next/app';
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import Alert from "@src/components/Alert";
import Head from "next/head";

// Example of creating UserContext
export const UserContext = createContext({
  userinfo: {},
  setUserinfo: () => { },
  showAlert: {},
  setShowAlert: () => { },
  refetchAPIName:"",
  setRefetchAPIName: () => { },
});

// Example of creating UserContext
export const AuthContext = createContext({
  setShowAlert: () => { },
});


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [userinfo, setUserinfo] = useState({}) as any;
  const [refetchAPIName, setRefetchAPIName] = useState('') as any;
  const [showAlert, setShowAlert] = useState({
    isOpen: false,
    status: false,
    title: "Something Went Wrong !",
  }) as any;
  useEffect(() => {
    const localdata = localStorage.getItem("login-user");
    const data = localdata && JSON.parse(localdata);
    if (data?.email) {
      setUserinfo(data);
    }
    if (!data?.token && router.pathname === "/") {
      router.push("/login");
    }
    if (data?.token && ["/login", "/register"].includes(router.asPath)) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);
  
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </Head>
      {router.pathname === "/login" || router.pathname === "/register" ? (
        <AuthContext.Provider value={{ setShowAlert }}>
          <Component {...pageProps} />
        </AuthContext.Provider>
      ) : (
        <UserContext.Provider value={{ userinfo, setUserinfo, showAlert, setShowAlert, refetchAPIName, setRefetchAPIName }}>
          <RootLayout>
            <Component {...pageProps} userinfo={userinfo} />
          </RootLayout>
        </UserContext.Provider>
      )}
      {
        showAlert?.isOpen && <Alert alert={showAlert} setShowAlert={setShowAlert} />
      }
    </>
  )
}
