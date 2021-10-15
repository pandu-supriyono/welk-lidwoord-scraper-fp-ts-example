import { flow, pipe } from 'fp-ts/lib/function'
import * as A from 'fp-ts/Array'
import * as TE from 'fp-ts/TaskEither'
import * as T from 'fp-ts/Task'
import scrapeFromZnw from './scraper'
import validateLidwoord from './lidwoord'

const getArgs = pipe(process.argv, (args) => args.slice(2))

const main = (words: string[]) => {
  const arrayOfTe = pipe(words, A.map(flow(scrapeFromZnw, TE.chainW(flow(validateLidwoord, TE.fromEither)))))

  return pipe(
    A.sequence(TE.ApplicativePar)(arrayOfTe),
    TE.foldW(
      T.of,
      T.of
    )
  )
}

main(getArgs)().then((res) => console.log(res))
