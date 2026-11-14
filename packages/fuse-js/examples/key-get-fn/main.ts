// A key's getFn builds one searchable "full name" from separate first and last fields
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { codeHeads } from '../../shared/code-heads.ts';
import { columns } from '../../shared/widgets.ts';

interface Person {
  first: string;
  last: string;
  left?: boolean;
}

const TEAM: Person[] = [
  { first: 'Ada', last: 'Lovelace' },
  { first: 'Alan', last: 'Turing', left: true },
  { first: 'Grace', last: 'Hopper' },
  { first: 'Margaret', last: 'Hamilton' },
  { first: 'Katherine', last: 'Johnson' },
  { first: 'Linus', last: 'Torvalds' },
  { first: 'Dennis', last: 'Ritchie' },
];

const QUERIES = ['ada lovelac', 'grace hop', 'marg hamilton', 'alan tur'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type a first and last name together. Tick the box to hide people who left.' });
  const box = searchBox(stage.root, stage, { value: stage.preview ? '' : 'ada lovelac', placeholder: 'Find a teammate…', tries: QUERIES });
  const cols = columns(stage, ['Two keys: first, last', 'One getFn: "first last"']);
  codeHeads(cols);
  const [apart, together] = cols;
  const max = stage.preview ? 3 : 6;
  const apartList = resultList(apart!.body, { max, ranks: false, scores: false, empty: 'Found nothing' });
  const togetherList = resultList(together!.body, { max, ranks: false, scores: false });
  let hideLeavers = false;

  const run = (): void => {
    const query = box.value;
    if (!query.trim()) {
      apartList.show([], 'Type a name');
      togetherList.show([], 'Type a name');
      stage.say('');
      return;
    }
    const twoKeys = new Fuse(TEAM, { keys: ['first', 'last'], threshold: 0.3 });
    // getFn gets the record and returns the text to search. Returning null leaves that
    // record out of this key altogether, so nobody can find the people who left.
    const oneKey = new Fuse(TEAM, {
      keys: [{ name: 'fullName', getFn: (p: Person) => (hideLeavers && p.left ? null : `${p.first} ${p.last}`) }],
      includeMatches: true,
      threshold: 0.3,
    });
    const a = twoKeys.search(query);
    const b = oneKey.search(query);
    apartList.show(a.map((r) => ({ id: r.refIndex, title: `${r.item.first} ${r.item.last}` })));
    togetherList.show(b.map((r) => ({ id: r.refIndex, title: marked(r, 'fullName', `${r.item.first} ${r.item.last}`) })));
    stage.say(
      `"${query}": the two separate keys find ${a.length}, the combined full name finds ${b.length}`,
      b.length > a.length ? 'ok' : 'info',
    );
  };
  box.onInput(run);
  if (stage.bar) checkbox(stage.bar, 'Hide people who left (getFn returns null)', false, (v) => ((hideLeavers = v), run()));
  run();
  typeLoop(stage, box, QUERIES.slice(0, 3));
  return stage.dispose;
};

export default mount;
