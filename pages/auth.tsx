import {
  Button,
  Center,
  Heading,
  Spinner,
  Stack,
  useToast,
} from '@chakra-ui/react'
import EmailAuthSent from 'components/auth/EmailAuthSent'
import OAuthScreen from 'components/auth/OAuthScreen'
import UserPreferences from 'components/auth/UserPreferences'
import { API_URL } from 'envconfig'
import { getProviders, getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Auth = ({ providers }: any) => {
  const toast = useToast()

  const router = useRouter()
  const { data: session } = useSession()

  const [sessionStatus, setSessionStatus] = useState<string>('unauthenticated')
  const [userStatus, setUserStatus] = useState<any>()
  const [emailAuthSent, setEmailAuthSent] = useState<boolean>(false)

  const [emailAuthId, setEmailAuthId] = useState<any>()

  useEffect(() => {
    if (router.asPath !== '/auth' && router.asPath.includes('expiredToken')) {
      let expiredToken = router.asPath
        .split('expiredToken=')[1]
        .replaceAll('+', ' ')
      toast({
        title: expiredToken,
        description: 'Please log in with email to generate a new magic link',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    // eslint-disable-next-line
  }, [router.asPath])

  useEffect(() => {
    if (router.asPath !== '/auth') {
      let email = router.asPath.split('=')[1].split('&')[0]
      setEmailAuthId(decodeURIComponent(email))
    }
  }, [router.asPath])

  useEffect(() => {
    // setSessionStatus(status)

    checkUserExists()
    // eslint-disable-next-line
  }, [])

  const checkUserExists = async () => {
    let email
    try {
      email = decodeURIComponent(router.asPath.split('=')[1].split('&')[0])
    } catch (error) {
      email = undefined
    }
    try {
      const body = session
        ? JSON.stringify({
            _email: session?.email,
            _uid: session?.id,
            _provider: session?.provider,
          })
        : JSON.stringify({
            _email: email,
            _uid: 'tester_tester',
            _provider: 'email',
          })
      const response = await fetch(`${API_URL}/check_login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Content-Security-Policy': 'upgrade-insecure-requests',
        },
        body: body,
      })
      const data = await response.json()
      setUserStatus(data)
      if (data && data.token) {
        localStorage.setItem('access-enable-token', data.token)
        router.push('/')
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (emailAuthSent) {
    return <EmailAuthSent />
  }

  // if (sessionStatus === 'authenticated') {
  if (userStatus && userStatus.message === 'No such user found.') {
    return <UserPreferences emailAuthId={emailAuthId} session={session} />
  }
  // }
  else if (userStatus && userStatus.message !== 'No such user found.') {
    return (
      <OAuthScreen setEmailAuthSent={setEmailAuthSent} providers={providers} />
    )
  }

  return (
    <Center h={'100vh'}>
      <Spinner
        thickness='10px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Center>
  )
  // return (
  //   <>
  //     <OAuthScreen providers={providers} />
  //     {/* <Center h={'100vh'}>
  //       <Stack
  //         spacing={4}
  //         direction={'column'}
  //         align={'center'}
  //         justifyContent={'center'}
  //       >
  //         {session ? (
  //           <>
  //             <Heading>session</Heading>
  //             <Button onClick={() => signOut()}>Sign out</Button>
  //           </>
  //         ) : (
  //           <>
  //             <Heading>Not signed in</Heading>
  //             {Object.values(providers).map((provider: any) => (
  //               <Button
  //                 key={provider.name}
  //                 onClick={() => handleLogin(provider)}
  //               >
  //                 Sign in
  //               </Button>
  //             ))}
  //           </>
  //         )}
  //       </Stack>
  //     </Center> */}
  //   </>
  // )
}

export default Auth

export async function getServerSideProps(context: any) {
  const providers = await getProviders()
  const session = await getSession(context)

  return {
    props: {
      providers,
      session,
    },
  }
}
