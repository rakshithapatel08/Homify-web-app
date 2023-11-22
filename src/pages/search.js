import React, { useEffect } from 'react'
import { useState } from 'react'
import { Router, useRouter } from 'next/router'
import { Flex, Box, Text, Icon } from "@chakra-ui/react"
import { BsFilter } from 'react-icons/bs'
import SearchFilters from '../../components/SearchFilters'
import PropertyCard from '../../components/PropertyCard'
import { baseUrl, fetchApi } from '@/utils/fetchAPI'


const Search = ({ properties }) => {

  let filteredListProperties;
  const [showFilter, setShowFilter] = useState(false);
  const [value, setValue] = useState("")
  const [locationData, setLocationData] = useState([])

  const router = useRouter();

  useEffect(() => {
    const LocationbasedFilter = (value) => {
      let filteredArray = properties.filter((property) => {
        let isPresent = property.location.some((location) => 
          // if any of the location matches to given target value
          location.name.toString().toLowerCase().includes(value.toString().toLowerCase())
        )
        if(isPresent){
          console.log(property,"hi")
          return property;
        }
      })
      
        setLocationData(filteredArray)
        console.log(filteredArray);
      
    }
    LocationbasedFilter(value);
  }, [value, properties])


  const handleFilter = () => {
    setShowFilter(!showFilter);
  }

  if (value === "") {
    filteredListProperties = properties;
  }
  else if (value !== "" && locationData) {
    filteredListProperties = locationData;
  }
  else{
    filteredListProperties=[];
  }

  return (
    <Box>
      <Flex onClick={handleFilter} cursor="pointer" justifyContent="center" alignItems="center" p="2" bg="gray.200">
        <Text fontSize="md" fontWeight="bold" >Search Property using Filters</Text>
        <Icon as={BsFilter} pl="2" fontSize="3xl"></Icon>
      </Flex>
      {showFilter && <SearchFilters value={value} setValue={setValue} />}
      <Text fontSize="xl" fontWeight="bold" mt="2">Properties {router.query?.purpose || "for-rent"}</Text>
      <Flex flexWrap="wrap" w="100%" justifyContent="center" alignItems="center">
        {filteredListProperties.map((property) => <PropertyCard property={property} key={property.id} />)}
      </Flex>
      {filteredListProperties.length === 0 && <Text>OOPS...No match found</Text>}
    </Box>

  )
}

export default Search

export async function getServerSideProps({ query }) {

  const purpose = query?.purpose || "for-rent"
  const price = query?.priceMax || '1000000'
  const rooms = query?.roomsMin || "0"
  const baths = query?.bathsMin || "0"

  const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&&purpose=${purpose}&&priceMax=${price}&&bathsMin=${baths}&&roomsMin=${rooms}`)

  return {
    props: {
      properties: data?.hits,

    }
  }
};

