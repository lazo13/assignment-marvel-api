export interface Response {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results?: Array<Character | Comic> | null;
}

export interface Character {
  id?: number;
  name?: string;
  description?: string;
  thumbnail?: Image;
  resourceURI?: string;
  comics?: ComicList;
  urls?: Array<Url> | null;
}

export interface Image {
  path?: string;
  extension?: string;
}

export interface Url {
  type?: string;
  url?: string;
}

export interface ComicList {
  available?: number;
  collectionURI?: string;
  items?: Array<ComicSummary> | null;
  returned?: number;
}

export interface ComicSummary {
  resourceURI?: string;
  name?: string;
}

// =====================================================================================================

/* export interface Response {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results?: Array<Comic> | null;
} */
export interface Comic {
  id?: number;
  digitalId?: number;
  title?: string;
  variantDescription?: string;
  description?: null;
  resourceURI?: string;
  urls?: (UrlsEntity)[] | null;
  thumbnail?: Image;
  images?: Array<Image> | null;
  characters?: CharacterList;
}
export interface Image {
  path?: string;
  extension?: string;
}
export interface CharacterList {
  available?: number;
  collectionURI?: string;
  items?: Array<CharacterSummary> | null;
  returned?: number;
}