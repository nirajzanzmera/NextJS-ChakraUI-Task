import {
  Box,
  chakra,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { MdGraphicEq } from 'react-icons/md'

export default function DisabilityExtentSlider({
  disability,
  setExtentCollection,
}: any) {
  const [sliderValue, setSliderValue] = useState(50)

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }


  return (
    <Box my={10}>
      <chakra.p textAlign={'center'} mb={2}>
        {disability
          .replace(/([A-Z])/g, ' $1')
          // uppercase the first character
          .replace(/^./, function (str: any) {
            return str.toUpperCase()
          })}
      </chakra.p>
      <Slider
        aria-label='slider-ex-6'
        value={sliderValue}
        // step={50}
        onChange={(val: any) => {
          setExtentCollection(disability, val)
          setSliderValue(val)
        }}
      >
        <SliderMark value={0}  {...labelStyles}>
          Mild
        </SliderMark>
        <SliderMark value={50} {...labelStyles}>
          Moderate
        </SliderMark>
        <SliderMark value={100} {...labelStyles} style={{left:"91%"}}>
          Severe
        </SliderMark>
        <SliderMark
          value={sliderValue}
          textAlign='center'
          bg='blue.500'
          color='white'
          mt='-10'
          ml='-5'
          w='12'
        >
          {sliderValue}%
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize={6}>
          <Box color='green' as={MdGraphicEq} />
        </SliderThumb>
      </Slider>
    </Box>
  )
}
