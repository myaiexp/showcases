// Sample text in German and Finnish, with and without soft hyphens (U+00AD, written '|' here)
const SOFT = (s: string): string => s.replaceAll('|', '­');

const MARKED =
  'Die Do|nau|dampf|schiff|fahrts|ge|sell|schafts|ka|pi|tän trifft den Haupt|bahn|hof|vor|steher. Ja Lento|ko|ne|suih|ku|tur|bii|ni|moot|to|ri|a|pu|me|kaa|nik|ko ym|mär|si ep|ä|jär|jes|tel|mäl|li|syy|den. Selbst Ge|schwin|dig|keits|be|gren|zung ist hier kein Pro|blem.';

export const WITH_HYPHENS = SOFT(MARKED);
export const WITHOUT_HYPHENS = MARKED.replaceAll('|', '');
