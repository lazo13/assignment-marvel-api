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

export const charactersApi = axios.create({ baseURL: `https://gateway.marvel.com/v1/public/characters?` })
export const comicsApi = axios.create({ baseURL: `https://gateway.marvel.com/v1/public/comics?` })

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

export async function getSearchCharacters(name: string): Promise<Character[] | undefined> {
   const baseUrl = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&`
   try {
      const response = await axios.get(`${baseUrl}${auth}`)
      return response.data?.data?.results
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

// export async function getSearchComics(title: string): Promise<Comic[] | undefined> {

// it should be Response | undefined, but then it's not working in comics.ts
// export async function getSearchComics(title: string): Promise<Response | undefined> {
export async function getSearchComics(title: string): Promise<any> {
   const baseUrl = `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${title}&`
   try {
      const response = await axios.get(`${baseUrl}${auth}`)
      return (response.data?.data as Response)
   }
   catch (error) {
      console.log(error)
   }
}

export async function getSearchMoreComics(title: string, pageNumber: number): Promise<any> {
   const offset = pageNumber ? pageNumber * 20 : 0
   const baseUrl = `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${title}&offset=${offset}&`
   try {
      const response = await axios.get(`${baseUrl}${auth}`)
      // return response.data?.data?.results
      return (response.data?.data as Response)
   }
   catch (error) {
      console.log(error)
   }
}