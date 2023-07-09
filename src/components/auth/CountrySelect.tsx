import React from 'react'
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete'
import { Avatar, Stack, Text } from '@chakra-ui/react'
import countryList from '../../../public/assets/countryList.json'

const CountrySelect = ({ setCountryName }: any) => {
  return (
    <Stack direction='column'>
      <AutoComplete
        openOnFocus
        rollNavigation
        onChange={(vals) => setCountryName(vals)}
      >
        <AutoCompleteInput
          variant='outline'
          placeholder='Search...'
          isRequired
        />
        <AutoCompleteList>
          {countryList.map((country, oid) => (
            <AutoCompleteItem
              key={`country-${oid}`}
              value={country.name}
              label={country.name}
              textTransform='capitalize'
              align='center'
            >
              <Avatar size='sm' name={country.name} src={country.flag} />
              <Text ml='4'>{country.name}</Text>
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
    </Stack>
  )
}

export default CountrySelect
