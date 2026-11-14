// The top-level getFn reads each dish's name in whichever language is chosen
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { pills } from '../../shared/widgets.ts';

type Lang = 'en' | 'fi' | 'es';
interface Dish {
  name: Record<Lang, string>;
}

// Each dish keeps its name once per language, not as one string.
const DISHES: Dish[] = [
  { name: { en: 'Salmon soup', fi: 'Lohikeitto', es: 'Sopa de salmon' } },
  { name: { en: 'Meatballs', fi: 'Lihapullat', es: 'Albondigas' } },
  { name: { en: 'Rice pudding', fi: 'Riisipuuro', es: 'Arroz con leche' } },
  { name: { en: 'Potato omelette', fi: 'Perunamunakas', es: 'Tortilla de patatas' } },
  { name: { en: 'Cinnamon bun', fi: 'Korvapuusti', es: 'Rollo de canela' } },
  { name: { en: 'Garlic prawns', fi: 'Valkosipulirapu', es: 'Gambas al ajillo' } },
];

const LANGS: readonly (readonly [Lang, string])[] = [['en', 'English'], ['fi', 'Finnish'], ['es', 'Spanish']];
const STEPS: { lang: Lang; query: string }[] = [
  { lang: 'en', query: 'meatbal' },
  { lang: 'fi', query: 'lohikeito' },
  { lang: 'es', query: 'albondiga' },
  { lang: 'fi', query: 'meatbal' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The data never changes: only the language getFn reads does.' });
  const box = searchBox(stage.root, stage, { placeholder: 'Find a dish…', tries: ['meatbal', 'lohikeito', 'albondiga', 'canela'] });
  const info = pills(stage.root);
  const list = resultList(stage.root, { max: stage.preview ? 3 : 6, scores: false });
  let lang: Lang = 'en';

  const run = (): void => {
    info.set('is searched', LANGS.find(([l]) => l === lang)![1]);
    // One getFn for the whole instance: Fuse asks it for each key of each record.
    // Here every key is a field of `name`, and the answer is the chosen language's text.
    const fuse = new Fuse(DISHES, {
      keys: ['name'],
      getFn: (dish: Dish) => dish.name[lang],
      includeMatches: true,
      threshold: 0.35,
    });
    const results = fuse.search(box.value);
    list.show(
      results.map((r) => ({
        id: r.refIndex,
        title: marked(r, 'name', r.item.name[lang]),
        sub: LANGS.filter(([l]) => l !== lang).map(([l]) => r.item.name[l]).join(' · '),
      })),
      box.value ? `No dish like that in ${lang === 'en' ? 'English' : lang === 'fi' ? 'Finnish' : 'Spanish'}` : 'Type a dish',
    );
    stage.say(
      box.value ? `${results.length} dish${results.length === 1 ? '' : 'es'} found by searching only the ${LANGS.find(([l]) => l === lang)![1]} names` : '',
      results.length ? 'ok' : 'warn',
    );
  };

  box.onInput(run);
  if (stage.preview) {
    stage.cycle(STEPS, 2300, (s) => {
      lang = s.lang;
      box.set(s.query);
    });
  } else if (stage.bar) {
    select(stage.bar, 'search in', LANGS, (l) => ((lang = l), run()));
    run();
  }
  return stage.dispose;
};

export default mount;
