import Link from "next/link"
import Image from "next/image"
import { Flex, Box, Text, Button } from "@chakra-ui/react"
import { baseUrl, fetchApi } from "../utils/fetchAPI"
import PropertyCard from "../../components/PropertyCard.jsx"


const Banner = ({ purpose, imageUrl, title1, title2, desc1, desc2, Linkname, buttontext }) => {
  return (
    <>
      <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="5">
        <Image src={imageUrl} width={400} height={200}/>
        <Box ml="5">
          <Text fontSize='md'  color="grey.300" fontWeight="300" mb="3">{purpose}</Text>
          <Text fontSize='3xl' color="grey.700" fontWeight="600"mb="2">{title1}<br />{title2}</Text>
          <Text fontSize='lg' color="grey.500" fontWeight="400" mb="3">{desc1}<br />{desc2}</Text>
          <Button color="white" bg="teal" _hover={{bg:"teal.700"}} p="2" mt="3">
            <Link href={Linkname}>
              {buttontext}
            </Link>
          </Button>
        </Box>
      </Flex>
    </>
  )
}

export default function Home({propertyForRent, propertyForSale}) {
    console.log(propertyForRent,propertyForSale);
    return (
      <Box>
      <Banner 
        purpose="Rent a home"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
        title1="Rental homes"
        title2="Everyone"
        desc1="explore flats, community houses, villas"
        desc2="and many more.."
        Linkname="/search?.purpose=for-rent"
        buttontext="Explore Renting"
      />
      <Flex flexWrap="wrap" justifyContent="center" alignItems="center">
        {propertyForRent.map((property)=>{
          return <PropertyCard key={property.id} property={property}/>
        })}
      </Flex>
      <Banner 
        purpose="Buy a home"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
        title1="Buy your dream home"
        title2="and find happiness"
        desc1="explore flats, community houses, villas"
        desc2="and many more.."
        Linkname="/search?.purpose=for-rent"
        buttontext="Explore Buying"
      />
     <Flex flexWrap="wrap" justifyContent="center" alignItems="center">
        {propertyForSale.map((property)=>{
          return <PropertyCard key={property.id} property={property}/>
        })}
        </Flex>
      </Box>
    )
}

export async function getStaticProps(){
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&&purpose=for-rent&&hitsPerPage=6`);
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&&purpose=for-sale&&hitsPerPage=6`);
  console.log(propertyForRent);
  return {
    props:{
      propertyForRent:propertyForRent?.hits,
      propertyForSale:propertyForSale?.hits
    }
  }
}


