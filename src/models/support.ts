export interface DictionaryNum<T> {
  [id: number]: T | undefined
}

export interface Dictionary<T> extends DictionaryNum<T> {
  [id: string]: T | undefined
}
