// A file picker built from chips: folder prefix, extension suffix, "no tests" exclusion
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { checkbox, select } from '../../shared/controls.ts';
import { FILES as ALL_FILES } from '../../shared/data.ts';
import { FILES_SMALL } from '../../shared/ext-data.ts';
import { reading } from '../../shared/ext-reading.ts';
import { lightUp } from '../../shared/ext-shelf.ts';
import { highlight } from '../../shared/highlight.ts';
import { shelf } from '../../shared/shelf.ts';
import { createStage } from '../../shared/stage.ts';
import { callLine } from '../../shared/widgets.ts';

interface Filters {
  folder: string;
  ext: string;
  noTests: boolean;
}

const FOLDERS = ['', 'src/', 'src/views/', 'test/', 'scripts/', 'server/'];
const EXTS = ['', '.ts', '.js', '.go', '.md', '.css'];

// What the card plays through.
const STEPS: Filters[] = [
  { folder: 'src/', ext: '', noTests: false },
  { folder: 'src/', ext: '.ts', noTests: false },
  { folder: '', ext: '.ts', noTests: true },
  { folder: 'server/', ext: '.go', noTests: false },
  { folder: '', ext: '.md', noTests: false },
];

const mount: Mount = (el, ctx) => {
  const FILES = ctx.preview ? FILES_SMALL : ALL_FILES;
  const stage = createStage(el, ctx, { hint: 'Each chip adds one operator to the query. All of them have to hold at once.' });
  const call = callLine(stage.root);
  const read = reading(stage.root, !stage.preview);
  const tiles = shelf(stage.root, FILES.map((label, id) => ({ id, label })), { scores: false });

  const fuse = new Fuse(FILES, { useExtendedSearch: true, includeMatches: true });

  const state: Filters = { ...STEPS[0]! };
  const apply = (): void => {
    // Chips become terms: folder -> "^folder", extension -> ".ext$", tests -> "!test".
    const terms = [state.folder && `^${state.folder}`, state.ext && `${state.ext}$`, state.noTests && '!test'].filter((t): t is string => Boolean(t));
    const query = terms.join(' ');
    call.set(query ? `fuse.search('${query}')` : 'no chips: no query');
    read.set(query);
    if (!query) {
      lightUp(tiles, null);
      stage.say('Pick a chip to narrow the files down');
      return;
    }
    const results = fuse.search(query);
    // An inverse term (!test) reports the whole name as matched, which would swamp the
    // highlight, so the letters to mark come from Fuse.match with the positive terms only.
    const positive = terms.filter((t) => !t.startsWith('!')).join(' ');
    const marks = (item: string) =>
      positive ? Fuse.match(positive, item, { useExtendedSearch: true, includeMatches: true }).indices : undefined;
    lightUp(tiles, results, { nodes: (r) => highlight(r.item, marks(r.item)) });
    stage.say(`${results.length} of ${FILES.length} files match`, results.length ? 'ok' : 'warn');
  };

  let sync = (): void => {};
  if (stage.bar) {
    const folder = select(stage.bar, 'Folder', FOLDERS.map((f) => [f, f || 'any'] as const), (v) => { state.folder = v; apply(); }, state.folder);
    const ext = select(stage.bar, 'Ending', EXTS.map((e) => [e, e || 'any'] as const), (v) => { state.ext = v; apply(); }, state.ext);
    const tests = checkbox(stage.bar, 'Leave out tests', state.noTests, (v) => { state.noTests = v; apply(); });
    sync = () => {
      folder.value = String(FOLDERS.indexOf(state.folder));
      ext.value = String(EXTS.indexOf(state.ext));
      tests.checked = state.noTests;
    };
  }
  stage.cycle(STEPS, 2800, (s) => {
    Object.assign(state, s);
    sync();
    apply();
  });
  return stage.dispose;
};

export default mount;
