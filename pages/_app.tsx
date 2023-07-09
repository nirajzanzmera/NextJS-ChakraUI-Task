import React from "react"
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import Head from "next/head";
import Script from "next/script"

import customTheme from 'theme'
import {wrapper} from '../src/redux/store'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {


  return (
    <>
    <Head>
{/* // Responsive meta tag */}
<meta name="viewport" content="width=device-width, initial-scale=1" />
{/* //  bootstrap CDN */}
<link
href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous" 
/>
</Head>
  
<Script
src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"/>
      {/* <Head>
        <html lang='en' />
        <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
        <meta content='width=device-width, initial-scale=1' name='viewport' /> */}
      {/* <link rel='icon' type='image/png' sizes='96x96' href='/favicon.png' /> */}
      {/* <meta name='theme-color' content='#3182ce' />
      </Head> */}
     
      <SessionProvider session={session}>
      
        <ChakraProvider theme={customTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>

    </>
  )
}

export default wrapper.withRedux(MyApp);
