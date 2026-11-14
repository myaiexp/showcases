// A backslash makes "|" an ordinary character, so shell commands with pipes can be searched
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { groupOf } from '../../shared/ext-query.ts';
import { reading } from '../../shared/ext-reading.ts';
import { lightUp } from '../../shared/ext-shelf.ts';
import { highlight } from '../../shared/highlight.ts';
import { searchBox } from '../../shared/search-box.ts';
import { shelf } from '../../shared/shelf.ts';
import { createStage } from '../../shared/stage.ts';

const COMMANDS = ['ls -la', 'ls | grep txt', 'ps | grep node', 'cat a | wc -l', 'sort | uniq', 'history | tail', 'git log', 'git status', 'cd ~/src', 'echo "a | b"'];

const STEPS = [
  { query: "'ps | 'git", note: 'A plain pipe means OR: two separate searches', short: 'plain pipe = OR' },
  { query: "'\\|", note: 'An escaped pipe is just a character: every command that has one', short: 'has a pipe' },
  { query: '\'"ls \\| grep"', note: 'A quoted phrase with an escaped pipe', short: 'phrase with pipe' },
  { query: "'\\| grep", note: 'A pipe followed by grep', short: 'pipe, then grep' },
  { query: '!\\|', note: 'Commands without a pipe', short: 'no pipe' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type \\| (backslash, then the bar) when you mean the character itself.' });
  const box = searchBox(stage.root, stage, { placeholder: "Try '\\|", tries: STEPS.map((s) => s.query) });
  const read = reading(stage.root);
  const tiles = shelf(stage.root, COMMANDS.map((label, id) => ({ id, label })), { scores: false });

  const fuse = new Fuse(COMMANDS, { useExtendedSearch: true, includeMatches: true });

  const run = (query: string): void => {
    const groups = read.set(query);
    if (!groups.length) {
      lightUp(tiles, null);
      stage.say('Type a query');
      return;
    }
    const results = fuse.search(query);
    lightUp(tiles, results, {
      groups: groups.length > 1 ? groupOf(fuse, groups) : undefined,
      nodes: (r) => (query.startsWith('!') ? undefined : highlight(r.item, r.matches?.[0]?.indices)),
    });
    const step = STEPS.find((s) => s.query === query);
    const note = stage.preview ? step?.short : step?.note;
    stage.say(`${note ? `${note}: ` : ''}${results.length} of ${COMMANDS.length} commands`, results.length ? 'ok' : 'warn');
  };
  box.onInput(run);

  const show = stage.cycle(STEPS, 3000, (s) => box.set(s.query));
  let n = 0;
  if (!stage.preview) button(stage.bar!, 'Next example', () => show(++n));
  return stage.dispose;
};

export default mount;
