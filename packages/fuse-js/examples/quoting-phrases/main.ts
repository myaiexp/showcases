// Double quotes keep a phrase with spaces together as one search term
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { reading } from '../../shared/ext-reading.ts';
import { lightUp } from '../../shared/ext-shelf.ts';
import { searchBox } from '../../shared/search-box.ts';
import { shelf } from '../../shared/shelf.ts';
import { createStage } from '../../shared/stage.ts';

const NAMES = ['Scheme', 'Scheme language', 'The scheme language guide', 'Hello world', 'Say hello world', 'Hello world program', 'Hello there', 'World hello'];

// Each query with what really happens, checked against fuse.js 7.5.0.
const STEPS = [
  { query: '=scheme language', note: 'No quotes: two words, so "exactly scheme" AND "roughly language". Nothing is both', short: 'two words, no quotes' },
  { query: '="scheme language"', note: 'Quotes keep the phrase in one piece: only the item that is exactly that phrase', short: 'exact phrase' },
  { query: "'hello world", note: 'Two words: contains "hello" AND roughly "world", in either order', short: 'two words, any order' },
  { query: '\'"hello world"', note: 'Quoted: contains the whole phrase, in that order', short: 'contains phrase' },
  { query: '^"hello world"', note: 'Quoted with ^: starts with the whole phrase', short: 'starts with phrase' },
  { query: '"hello world"$', note: 'Quoted with $: ends with the whole phrase', short: 'ends with phrase' },
  { query: "'^hello world", note: 'The docs write this as a phrase, but it reads as the letters "^hello" AND "world": nothing matches', short: 'docs sample: nothing' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Put the quotes after the operator: =" or \'" or ^" at the start, "$ at the end.' });
  const box = searchBox(stage.root, stage, { placeholder: 'Try ="scheme language"', tries: STEPS.map((s) => s.query) });
  const read = reading(stage.root);
  const tiles = shelf(stage.root, NAMES.map((label, id) => ({ id, label })), { scores: false });

  const fuse = new Fuse(NAMES, { useExtendedSearch: true });

  const run = (query: string): void => {
    read.set(query);
    if (!query.trim()) {
      lightUp(tiles, null);
      stage.say('Type a query with a quoted phrase');
      return;
    }
    const results = fuse.search(query);
    lightUp(tiles, results);
    const step = STEPS.find((s) => s.query === query);
    const note = stage.preview ? step?.short : step?.note;
    stage.say(`${note ? `${note}: ` : ''}${results.length} of ${NAMES.length} items`, results.length ? 'ok' : 'warn');
  };
  box.onInput(run);

  const show = stage.cycle(STEPS, 3400, (s) => box.set(s.query));
  let n = 0;
  if (!stage.preview) button(stage.bar!, 'Next example', () => show(++n));
  return stage.dispose;
};

export default mount;
