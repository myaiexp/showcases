// Cyrillic, Greek, Arabic, Hebrew and Hindi words are found by the default tokenizer
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { WORD_PATTERN, wordRow } from '../../shared/token-marks.ts';
import { columns } from '../../shared/widgets.ts';

// Greetings in six scripts, each with what it means.
const PHRASES = [
  { text: 'Привет мир', en: 'Russian: hello world' },
  { text: 'Доброе утро', en: 'Russian: good morning' },
  { text: 'Καλημέρα κόσμε', en: 'Greek: good morning, world' },
  { text: 'Ευχαριστώ πολύ', en: 'Greek: thank you very much' },
  { text: 'مرحبا بالعالم', en: 'Arabic: hello world' },
  { text: 'شكرا جزيلا', en: 'Arabic: thank you very much' },
  { text: 'שלום עולם', en: 'Hebrew: hello world' },
  { text: 'हिन्दी भाषा', en: 'Hindi: the Hindi language' },
  { text: 'Hello world', en: 'English' },
  { text: 'Good morning', en: 'English' },
];

// What a tokenizer written for English only would use.
const LATIN_ONLY = /[a-z]+/gi;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The chips are the words each tokenizer finds in your query. No chips, no search.' });
  const box = searchBox(stage.root, stage, { value: 'мир утро', tries: ['мир утро', 'κόσμε πολύ', 'بالعالم', 'עולם', 'हिन्दी', 'hello world'] });
  const [latin, standard] = columns(stage, ['Latin letters only', 'Default tokenizer']);
  const latinWords = wordRow(latin!.body);
  const standardWords = wordRow(standard!.body);
  const max = stage.preview ? 3 : 5;
  const latinList = resultList(latin!.body, { max, ranks: false, scores: false, empty: 'Nothing found' });
  const standardList = resultList(standard!.body, { max, ranks: false, scores: false, empty: 'Nothing found' });

  const base = { keys: ['text'], useTokenSearch: true, threshold: 0.3, includeMatches: true };
  const standardFuse = new Fuse(PHRASES, base); // no tokenize option: the default handles every script
  const latinFuse = new Fuse(PHRASES, { ...base, tokenize: LATIN_ONLY });

  const run = (query: string): void => {
    latinWords.set(query.toLowerCase().match(LATIN_ONLY) ?? []);
    standardWords.set(query.toLowerCase().match(WORD_PATTERN) ?? []);
    const rows = (fuse: Fuse<(typeof PHRASES)[number]>): { id: number; title: Node[]; sub: string }[] =>
      fuse.search(query).map((r) => ({ id: r.refIndex, title: marked(r, 'text', r.item.text), sub: r.item.en }));
    const a = rows(latinFuse);
    const b = rows(standardFuse);
    latinList.show(a);
    standardList.show(b);
    stage.say(query.trim() ? `Latin-only: ${a.length} phrases · default: ${b.length}` : '', b.length > a.length ? 'ok' : 'info');
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, ['мир утро', 'κόσμε πολύ', 'עולם']);
  return stage.dispose;
};

export default mount;
