// The languages BillEvents can show. `short` is used in the navbar button,
// `native` is the name in its own script, `name` is the English name,
// `locale` is used for formatting dates (Gregorian calendar).
export const LANGUAGES = [
  { code: 'en', short: 'EN', name: 'English', native: 'English', locale: 'en-GB' },
  { code: 'am', short: 'አማ', name: 'Amharic', native: 'አማርኛ', locale: 'am-ET' },
  { code: 'om', short: 'OM', name: 'Oromo', native: 'Afaan Oromoo', locale: 'om-ET' },
  { code: 'ti', short: 'ትግ', name: 'Tigrinya', native: 'ትግርኛ', locale: 'ti-ET' },
]

export const DEFAULT_LANG = 'en'