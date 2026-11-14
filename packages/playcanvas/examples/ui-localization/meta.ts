// PlayCanvas: Localization keys and plurals
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Localization keys and plurals",
  summary:
    "Translations live in localization data with a message for each key and locale; a text element with a key follows app.i18n.locale. Four locales, in-memory data in the localization file format, and plural messages looked up with getPluralText in script. Buttons switch the locale; the card cycles it.",
  section: "User Interface",
  tags: ["I18n","locale","key","addData","getPluralText","removeData"],
  docs: ["repo/docs/user-manual/user-interface/localization.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
