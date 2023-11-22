import React from 'react'
import Link from 'next/link'
import { UnorderedList, ListItem, Text, Flex, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react'
import { useMediaQuery } from '@chakra-ui/react'
import { FcMenu, FcHome, FcAbout } from "react-icons/fc"
import { BsSearch } from 'react-icons/bs'
import { FiKey } from "react-icons/fi"

const Navbar = () => {
    const [isMobile] = useMediaQuery('(max-width: 800px)')

    return (
        <div>
            <Flex justifyContent="space-between">
                <Link href="/"><Text color="teal" fontWeight="600" fontSize="4xl">Homify.</Text></Link>
                {isMobile ? <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<FcMenu />}
                        variant='outline'
                    />
                    <MenuList>
                        <Link href="/"><MenuItem icon={<FcHome />} >
                            Home
                        </MenuItem></Link>
                        <Link href="/search"><MenuItem icon={<BsSearch />} >
                            Search
                        </MenuItem></Link>
                        <Link href="/search?purpose=for-rent"><MenuItem icon={<FcAbout />} >
                            Property For Rent
                        </MenuItem></Link>
                        <Link href="/search?purpose=for-sale"><MenuItem icon={<FiKey />} >
                            Property For Sale
                        </MenuItem></Link>
                    </MenuList>
                </Menu> : <UnorderedList sx={{ listStyle: "none" }}>
                    <Flex justifyContent="space-around" w="600px" mt="4">
                        <Link href="/"><ListItem color="orange.300" fontWeight="500" fontSize="large" _hover={{color:"teal.700"}}>Home</ListItem></Link>
                        <Link href="/search"><ListItem color="orange.300" fontWeight="500" fontSize="large" _hover={{color:"teal.700"}}>Search</ListItem></Link>
                        <Link href="/search?purpose=for-rent"><ListItem color="orange.300" fontWeight="500" fontSize="large" _hover={{color:"teal.700"}}>Property For Rent</ListItem></Link>
                        <Link href="/search?purpose=for-sale"><ListItem color="orange.300" fontWeight="500" fontSize="large" _hover={{color:"teal.700"}}>Property For Sale</ListItem></Link>
                    </Flex>
                </UnorderedList>}

            </Flex>
        </div>
    )
}

export default Navbar