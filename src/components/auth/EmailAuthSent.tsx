import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

const EmailAuthSent = () => {
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
          <Heading fontSize={['2xl', '3xl']}>
            Check your registered email account
          </Heading>
          <Text fontSize={['xl', '2xl']} color={'gray.600'}>
          A link has been sent to your account for authentication. If you do not see it check your spam folder Please click the link to log in.
          </Text>
        </Stack>

        <Stack align={'center'}></Stack>
      </Box>
    </Flex>
  )
}

export default EmailAuthSent
