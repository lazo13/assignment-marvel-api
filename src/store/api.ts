import axios from 'axios'
import { public_key, private_key } from '@/marvel-api';
import CryptoJS from 'crypto-js';
import { CharactersResponse, Character, Comic, ComicsResponse } from './models.d';

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