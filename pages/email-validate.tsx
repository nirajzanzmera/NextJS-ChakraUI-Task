import React, { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Heading,
  Spinner,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { API_URL } from 'envconfig'

const EmailValidate = () => {
  const router = useRouter()
  const { id } = router.query
  const [idSetter, setIdSetter] = useState<any>()

  useEffect(() => {
    confirm_email_link()
    // eslint-disable-next-line
  }, [id])

  const confirm_email_link = async () => {
    try {
      const response = await fetch(`${API_URL}/confirm_email_link/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Content-Security-Policy': 'upgrade-insecure-requests',
        },
      })
      const data = await response.json()

      if (data.token) {
        localStorage.setItem('access-enable-token', data.token)
        router.push('/')
      } else {
        const query =
          data.message !== 'No such user found.'
            ? { email: data.email, expiredToken: data.message }
            : { email: data.email }
        router.push('/auth', {
          pathname: '/auth',
          query: query,
        })
      }
    } catch (error) {
      router.push('/')
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bgGradient='linear(to-r, blue.400, purple.600)'
    >
      <Box
        rounded={'2xl'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'2xl'}
        p={20}
        w={['md', '2xl']}
      >
        <Stack align={'center'} mb={10}>
          <Heading fontSize={['2xl', '3xl']}>Authenticating</Heading>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Stack>

        <Stack align={'center'}></Stack>
      </Box>
    </Flex>
  )
}

export default EmailValidate
