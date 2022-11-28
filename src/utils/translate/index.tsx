import * as locales from './locales'
const lngJSON : any = locales

export default function translate(lang: any, text: any, plural: undefined | number) {
  const result = lngJSON[lang] && typeof lngJSON[lang][text] !== 'undefined' ? lngJSON[lang][text] : text

  if (typeof plural !== 'undefined'){
    const key = new Intl.PluralRules(lang).select(plural)
    return result[key] || result
  }

  return result;
}