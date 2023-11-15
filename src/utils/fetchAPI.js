import axios from "axios"

export const baseUrl = "https://bayut.p.rapidapi.com"

export async function fetchApi(url){
    const response = await axios.get(url,{headers: {
        'X-RapidAPI-Key': process.env.NEXT_API_KEY,
        'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
      }})

    return response.data;
}