import axios from 'axios'
import { public_key, private_key } from '@/marvel-api';
import CryptoJS from 'crypto-js';
import { Character } from './models.d';

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

// COMICS RELATED CALLS

export const filteredData = (response: any) => {
   if (!response || !response.data) return

   return response.data.results || []
}