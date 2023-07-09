import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

const EmailValidate = () => {
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
