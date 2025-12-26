import en from "./locales/en";
import ko from "./locales/ko";
import fr from "./locales/fr";
import de from "./locales/de";
import esES from "./locales/es-ES";
import es419 from "./locales/es-419";
import it from "./locales/it";
import ptBR from "./locales/pt-BR";
import ptPT from "./locales/pt-PT";
import id from "./locales/id";
import ar from "./locales/ar";
import ja from "./locales/ja";
import pl from "./locales/pl";
import ru from "./locales/ru";
import zhHans from "./locales/zh-Hans";
import zhHant from "./locales/zh-Hant";
import tr from "./locales/tr";
import uk from "./locales/uk";
import vi from "./locales/vi";
import th from "./locales/th";

export const resources = {
  en: { translation: en },
  ko: { translation: ko },
  fr: { translation: fr },
  de: { translation: de },
  id: { translation: id },
  it: { translation: it },
  "es-ES": { translation: esES },
  "es-419": { translation: es419 },
  es: { translation: esES },
  "pt-BR": { translation: ptBR },
  "pt-PT": { translation: ptPT },
  pt: { translation: ptPT },
  ar: { translation: ar },
  ja: { translation: ja },
  pl: { translation: pl },
  ru: { translation: ru },
  "zh-Hans": { translation: zhHans },
  "zh-Hant": { translation: zhHant },
  zh: { translation: zhHans },
  "zh-TW": { translation: zhHant },
  tr: { translation: tr },
  uk: { translation: uk },
  vi: { translation: vi },
  th: { translation: th },
};

export const supportedLanguages = Object.keys(resources);
