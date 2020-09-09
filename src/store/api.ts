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
      return response.data?.data?.results
   }
   catch (error) {
      console.log("Error when fetching characters" + error)
   }
}

export async function fetchCharacter(characterId: number): Promise<Character | undefined> {
   const baseUrl = `https://gateway.marvel.com/v1/public/characters/${characterId}?`

   try {
      const response = await axios.get(`${baseUrl}${auth}`)
      return response.data?.data?.results?.[0]
   }
   catch (error) {
      console.log("Error when fetching character" + error)
   }
}

export async function getSearchCharacters(name: string, page: number): Promise<any> {
   const offset = page * 20
   const baseUrl = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&&offset=${offset}&`

   try {
      const response = await axios.get(`${baseUrl}${auth}`)
      return (response.data?.data as Response)
   }
   catch (error) {
      console.log("Error while searching characters " + error)
   }
}


// COMICS RELATED CALLS

export async function fetchComics(): Promise<Comic[] | undefined> {
   const baseUrl = `https://gateway.marvel.com/v1/public/comics?`

   try {
      const response = await axios.get(`${baseUrl}${auth}`)
      return response.data?.data?.results
   }
   catch (error) {
      console.log("Error when fetching comics" + error)
   }
}

export async function fetchComic(comicId: number): Promise<Comic | undefined> {
   const baseUrl = `https://gateway.marvel.com/v1/public/comics/${comicId}?`

   try {
      const response = await axios.get(`${baseUrl}${auth}`)
      return response.data?.data?.results?.[0]
   }
   catch (error) {
      console.log("Error when fetching character" + error)
   }
}

// it should be Response | undefined, later find out why it is not working
// export async function getSearchComics(title: string): Promise<Response | undefined> {
export async function getSearchComics(title: string, page: number): Promise<any> {
   const offset = page * 20
   const baseUrl = `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${title}&&offset=${offset}&`

   try {
      const response = await axios.get(`${baseUrl}${auth}`)
      return (response.data?.data as Response)
   }
   catch (error) {
      console.log("Error while searching comics " + error)
   }
}