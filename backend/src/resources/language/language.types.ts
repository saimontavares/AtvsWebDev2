export const ALLOWED_LANGUAGES = ["pt-BR", "en-US"] as const

export type Language = (typeof ALLOWED_LANGUAGES)[number]

export type LanguageChangeDTO = {
  lang: Language
}
