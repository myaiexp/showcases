// All eight extended-search operators, one after another, over the same 18 names
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { LANGS as ALL_LANGS, LANGS_SMALL } from '../../shared/ext-data.ts';
import { OPERATORS, operatorOf } from '../../shared/ext-query.ts';
import { reading } from '../../shared/ext-reading.ts';
import { lightUp } from '../../shared/ext-shelf.ts';
import { searchBox } from '../../shared/search-box.ts';
import { shelf } from '../../shared/shelf.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const LANGS = ctx.preview ? LANGS_SMALL : ALL_LANGS;
  const stage = createStage(el, ctx, { hint: 'Click an operator, or type your own: the first letters of a token decide what it does.' });
  const box = searchBox(stage.root, stage, { placeholder: 'Type an operator…', tries: OPERATORS.map((o) => o.token) });
  const read = reading(stage.root);
  const tiles = shelf(stage.root, LANGS.map((label, id) => ({ id, label })), { scores: false });

  // useExtendedSearch turns on the operators: =  '  !  ^  $ and | for OR.
  const fuse = new Fuse(LANGS, { useExtendedSearch: true });

  const run = (query: string): void => {
    const groups = read.set(query);
    if (!groups.length) {
      lightUp(tiles, null);
      stage.say('Type a token such as ^java or .js$');
      return;
    }
    const results = fuse.search(query);
    lightUp(tiles, results);
    const first = groups[0]!.terms[0]!;
    const what = groups.length === 1 && groups[0]!.terms.length === 1 ? `Keeps items that ${operatorOf(first.op).plain}` : 'Combined operators';
    stage.say(`${stage.preview ? '' : `${what}: `}${results.length} of ${LANGS.length} items`, results.length ? 'ok' : 'warn');
  };
  box.onInput(run);

  const show = stage.cycle(OPERATORS, 2600, (op) => box.set(op.token));
  let step = 0;
  if (!stage.preview) button(stage.bar!, 'Next operator', () => show(++step));
  return stage.dispose;
};

export default mount;
