import React from 'react'
import { Avatar, Flex, Image, Text, Box, Button } from '@chakra-ui/react'
import Link from 'next/link'
import { FaBed, FaBath } from "react-icons/fa"
import { GoVerified } from "react-icons/go"
import { BsGridFill } from "react-icons/bs"
import millify from 'millify'


const PropertyCard = ({ property: { coverPhoto, isVerified, price, rentFrequency, rooms, baths, area, title,externalID,agency } }) => {
  return (
    <Flex flexDirection="column" m="7" p="4" justifyContent="center" alignItems="center" bg="gray.200" borderRadius="5">
      <Box>
        <Image borderRadius="5" src={coverPhoto.url} alt="propertyImage" w={300} h={225} />
      </Box>

      <Flex flexDirection="column" w={300} h={175} alignItems="center" justifyContent="center" >
        <Flex p="1" alignItems="center" justifyContent="space-between" w="100%">
          <Flex color="gray.700" fontWeight="bold" >{isVerified && <GoVerified />} AED {millify(price)} / {rentFrequency && rentFrequency}</Flex>
          <Avatar src={agency.logo.url} size="sm"/>
        </Flex>       
          <Flex p="1" gap="2.5">{rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqrt <BsGridFill /></Flex>
          <Text p="1" mb="1">{title.substring(0, 30)}...</Text>
          <Link href={`properties/${externalID}`}>
          <Button bg="orange.300" _hover={{bg:"teal.700",color:"white"}}>Know more</Button>
          </Link>        
      </Flex>
    </Flex>
  )
}

export default PropertyCard