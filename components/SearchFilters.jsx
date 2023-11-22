import React, { useRef, useState } from 'react'
import filterData from '@/utils/filterData'
import { Flex, Select,Input, Button } from "@chakra-ui/react"
import { useRouter } from 'next/router'

const SearchFilters = ({value,setValue}) => {
  const inputRef = useRef([]);
  const router = useRouter();
  const [ bool, setBool ] = useState(false)
  
  const selectFilter = async (value,QUERY)=>{
     setBool(true)
     const path = router.pathname;
     const {query} = router;

     const newQuery = {...query,[QUERY]:value}

      await router.push({pathname:path,query:newQuery})
      setBool(false)
  }
  
  const resetFilter = async()=>{
    setBool(true)
     const path = router.pathname;
     const {query} = router;

     inputRef.current.forEach(element => {
      element.value=""
     });

     const newQuery = {}
     await router.push({pathname:path,query:newQuery})
     setBool(false)
  }

  const searchLocation = (value)=>{
    setValue(value)
  }
  
  return (
    <>
    <Flex m="2"  w="100%" flexWrap="wrap" justifyContent="center" alignItems="center">
      {filterData.map((filter,index) => (
        <Select w="20%" m="3" disabled={bool} key={index}
         ref={(el) => (inputRef.current[index] = el)}
         onChange={(e)=>selectFilter(e.target.value,filter.queryName)} placeholder={filter.placeholder}>
          {filter.items?.map((item,index) => (
            <option value={item.value} key={index}>{item.name}</option>
          ))}
        </Select>
        ))}
        <Button m="3" bg="gray.300" onClick={resetFilter}>Reset</Button>
    </Flex>
    <Flex justifyContent="center">
      <Input m="2" w="50%" fontWeight="bold" onChange={(e)=>searchLocation(e.target.value)} placeholder="Search By Location" />
    </Flex>
    </>
  )
}

export default SearchFilters