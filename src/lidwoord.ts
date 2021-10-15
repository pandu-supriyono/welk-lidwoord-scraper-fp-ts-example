import * as E from 'fp-ts/Either'

type Lidwoord = 'de' | 'het'

const isDe = (s: string) => s.toLowerCase().substr(0, 2) == 'de'

const isHet = (s: string) => s.toLowerCase().substr(0, 3) == 'het'

const isLidwoord = (s: unknown): s is Lidwoord => typeof s === 'string' && (isDe(s) || isHet(s))

interface ValidationError {
  _tag: 'InvalidLidwoord'
  val?: unknown
}

const makeValidationError = (val: unknown): ValidationError => ({
  _tag: 'InvalidLidwoord',
  val
})

const validateLidwoord = E.fromPredicate(isLidwoord, makeValidationError)

export default validateLidwoord
