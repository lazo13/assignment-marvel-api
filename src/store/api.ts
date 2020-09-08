import axios from 'axios'
import { public_key, private_key } from '@/marvel-api';
import CryptoJS from 'crypto-js';
import { Character, Comic } from './models.d';

const timestamp = new Date().getTime()
const stringToHash = (timestamp + private_key + public_key).toString()
const md5Hash = CryptoJS.MD5(stringToHash)
const auth = [
   'ts=',
   `${timestamp}`,
   '&apikey=',
   `${public_key}`,
   '&hash=',
   `${md5Hash}`
].join('')

// CHARACTERS RELATED CALLS

export async function fetchCharacters(): Promise<Character[] | undefined> {
   const baseUrl = `https://gateway.marvel.com/v1/public/characters?`

   try {
      const response = await axios.get(`${baseUrl}${auth}`)
      const result: Character[] = filteredData(response.data)

      return result
   }
   catch (error) {
      console.log("Error when fetching characters" + error)
   }
}

export async function fetchCharacter(characterId: number): Promise<Character | undefined> {
   const baseUrl = `https://gateway.marvel.com/v1/public/characters/${characterId}?`

   try {
      const response = await axios.get(`${baseUrl}${auth}`)
      const result = filteredData(response.data)

      return result[0]
   }
   catch (error) {
      console.log("Error when fetching character" + error)
   }
}

export async function getSearchCharacters(name: string): Promise<Character[] | undefined> {
   const baseUrl = `https://gateway.marvel.com/v1/public/characters?limit=100&nameStartsWith=${name}&`
   try {
      const response = await axios.get(`${baseUrl}${auth}`)
      const results = filteredData(response.data)

      return results
   }
   catch (error) {
      console.log(error)
   }
}


// COMICS RELATED CALLS

export async function fetchComics(): Promise<Comic[] | undefined> {
   const baseUrl = `https://gateway.marvel.com/v1/public/comics?`

   try {
      const response = await axios.get(`${baseUrl}${auth}`)
      const result: Comic[] = filteredData(response.data)

      return result
   }
   catch (error) {
      console.log("Error when fetching comics" + error)
   }
}

export async function fetchComic(comicId: number): Promise<Comic | undefined> {
   const baseUrl = `https://gateway.marvel.com/v1/public/comics/${comicId}?`

   try {
      const response = await axios.get(`${baseUrl}${auth}`)
      const result = filteredData(response.data)

      return result[0]
   }
   catch (error) {
      console.log("Error when fetching character" + error)
   }
}

// ===================================================================================================

export const filteredData = (response: any) => {
   if (!response || !response.data) return

   return response.data.results || []
}