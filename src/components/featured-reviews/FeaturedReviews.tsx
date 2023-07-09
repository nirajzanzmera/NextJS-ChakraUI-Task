import { Box, chakra, Container, SimpleGrid, Stack } from '@chakra-ui/react'
import { chunk } from '@chakra-ui/utils'
import tweets from 'src/tweets.json'
import ReviewCard from './ReviewCard'
import BugCard from './Bug-Card';
import axios from 'axios';

export default function FeaturedReviews({review, bugs}:any,) {
 



  return (
    <>
      <Box role="All the Review">
        <Container maxW='1200px' px='32px'>
          <chakra.h1 textStyle='heading-2' mb='48px'>
            Reviews from the changemakers!
          </chakra.h1>
          <Box role="Review Card">
            <ReviewCard review={review} />
          </Box>
        </Container>
      </Box>
      <Box role="All the Bugs">
        <Container py='120px' maxW='1200px' px='32px'>
          <chakra.h1 textStyle='heading-2' mb='48px'>
            Bugs from the changemakers!
          </chakra.h1>
          <Box role="All the Review">
            <BugCard bugs={bugs}/>
          </Box>
        </Container>
      </Box>
    </>
  )
}
