import axios, { AxiosResponse } from 'axios'
import cheerio, { CheerioAPI } from 'cheerio'
import { flow, identity, pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/TaskEither'
import got from 'got'

const baseUrl = 'https://www.welklidwoord.nl'

const makeUrlFromZnw = (s: string) => {
  return `${baseUrl}/${s.toLowerCase()}`
}

interface RequestError {
  _tag: 'RequestError'
  message?: unknown
}

const makeRequestError = (err: unknown): RequestError => {
  const message = err instanceof Error ? err.message : err
  return {
    _tag: 'RequestError',
    message,
  }
}

const loadPage = (body: string) => cheerio.load(body)

const getAnswer = ($: CheerioAPI) => $('h1').text().trim() 

const getRequest = (url: string) => TE.tryCatch(() => got(url), makeRequestError)

const parseFromUrl = (url: string) =>
  pipe(
    getRequest(url),
    TE.map(({ body }) => pipe(loadPage(body), getAnswer)),
  )

const scrapeFromZnw = flow(
  makeUrlFromZnw,
  parseFromUrl
)

export default scrapeFromZnw

