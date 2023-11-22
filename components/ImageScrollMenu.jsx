import { Box, Icon, Image, Flex } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext)
    return (
        <Flex fontSize="2xl" justifyContent="center" alignItems="center">
        <Icon as={FaArrowAltCircleLeft} onClick={() => scrollPrev()} />
        </Flex>
    )
}

const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext)
    return (
        <Flex fontSize="2xl" justifyContent="center" alignItems="center">
        <Icon  as={FaArrowAltCircleRight} onClick={() => scrollNext()} />
        </Flex>
    )
}

const ImageScrollMenu = ({ data }) => {
    return (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {data.map((photo) =>
            <Box key={photo.id}  w="900px" >
                <Image w="900px" h="500" objectFit="cover"  src={photo.url} />       
            </Box>                
            )}
        </ScrollMenu>        
    )
}

export default ImageScrollMenu