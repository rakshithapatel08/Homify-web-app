import { fetchApi, baseUrl } from "@/utils/fetchAPI"
import { Flex, Box, Text, Avatar } from "@chakra-ui/react"
import ImageScrollMenu from "../../../components/ImageScrollMenu"
import { FaBed, FaBath } from "react-icons/fa"
import { GoVerified } from "react-icons/go"
import { BsGridFill } from "react-icons/bs"
import millify from 'millify'

const PropertyDetails = ({ propertiesData: { id, purpose, price, rentFrequency, title, description, rooms, baths, area, photos, amenities, isVerified, agency, furnishingStatus, completionStatus } }) => {
  return (
    <Flex flexDirection="column">
      <Box w="900px" m="auto" mt="3" sx={{
        '@media screen and (max-width: 800px)': {
          // Styles for screens width lesser than 800px
          w: "700px"
        }
      }}>
        {photos && <ImageScrollMenu data={photos} />}
      </Box>
      <Flex flexWrap="wrap" flexDirection="column" w="100%" alignItems="center" justifyContent="center" >
        <Text textAlign="center" fontSize="lg" fontWeight="bold" mt="4">{title}</Text>
        <Flex p="1" w="100%" alignItems="center" justifyContent="center">
          <Flex color="gray.700" fontWeight="bold" >{isVerified && <GoVerified />} AED {millify(price)} / {rentFrequency && rentFrequency}</Flex>
          <Avatar src={agency.logo.url} size="sm" m="2" />
        </Flex>
        <Flex p="1" gap="2.5">{rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqrt <BsGridFill /></Flex>
      </Flex>
      <Text sx={{
        '@media screen and (max-width: 800px)': {
          w: "700px"
        }
      }} fontSize="2xl" fontWeight="bold">Description</Text>
      <Text sx={{
        '@media screen and (max-width: 800px)': {
          w: "700px"
        }
      }} fontSize="md" m="2" >{description}</Text>
      <Text sx={{
        '@media screen and (max-width: 800px)': {
          w: "700px"
        }
      }} fontSize="2xl" fontWeight="bold">Highlights</Text>
      <Flex sx={{
        '@media screen and (max-width: 800px)': {
          w: "700px"
        }
      }} flexWrap="wrap" justifyContent="center" flexDirection="column" m="2">
        {purpose && <Text fontSize="md" m="1">Purpose -- {purpose}</Text>}
        {furnishingStatus && <Text fontSize="md" m="1">Furnishing Status -- {furnishingStatus}</Text>}
        {completionStatus && <Text fontSize="md" m="1">Completion Status -- {completionStatus}</Text>}
      </Flex>
      <Text sx={{
        '@media screen and (max-width: 800px)': {
          w: "700px"
        }
      }} fontSize="2xl" fontWeight="bold">Amenities</Text>
      <Flex sx={{
        '@media screen and (max-width: 800px)': {
          w: "700px"
        }
      }} flexWrap="wrap" justifyContent='center' alignItems="center">
        {amenities.map((amenity) =>
          amenity.amenities.map((a) => <Text p="2" bg="gray.200" fontWeight="bold" fontSize="md" m="2" key={a.externalID}>{a.text}</Text>)
        )}
      </Flex>
    </Flex>
  )
}

export default PropertyDetails

export async function getServerSideProps({ params: { externalID } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${externalID}`)

  return {
    props: {
      propertiesData: data
    }
  }
}