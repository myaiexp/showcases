// Keep node.js, c++ and file paths in one piece with a custom tokenize regex
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { codeHeads } from '../../shared/code-heads.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { WORD_PATTERN, wordRow } from '../../shared/token-marks.ts';
import { columns } from '../../shared/widgets.ts';

const NOTES = [
  'Built with node.js and express', 'I love c++ templates', 'Visit the U.S.A. office', 'Saved to src/utils/date.ts today',
  'Learning node and js separately', 'Writing c code in a lab', 'Trending #javascript tips', 'Use usa data',
  'c++ and node.js together', 'path /usr/local/bin is on PATH',
].map((text) => ({ text }));

// Keep dots, plusses, dashes, hashes and slashes inside a token. One regex with the g flag, one without.
const WITH_G = /[\w.+#/-]+/g;
const WITHOUT_G = /[\w.+#/-]+/;
const STEPS = [
  { query: 'node.js', g: true },
  { query: 'c++', g: true },
  { query: 'src/utils/date.ts', g: true },
  { query: 'c++ node.js', g: true },
  { query: 'c++ node.js', g: false },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The chips are the words each tokenizer finds in your query.' });
  const box = searchBox(stage.root, stage, { value: STEPS[0]!.query, tries: ['node.js', 'c++', 'U.S.A', 'src/utils/date.ts', '#javascript', 'c++ node.js'] });
  const cols = columns(stage, ['Default tokenizer', 'tokenize: /[\\w.+#/-]+/g']);
  codeHeads(cols);
  const [plain, custom] = cols;
  const plainWords = wordRow(plain!.body);
  const customWords = wordRow(custom!.body);
  const max = stage.preview ? 3 : 5;
  const plainList = resultList(plain!.body, { max, ranks: false, scores: false, empty: 'Nothing found' });
  const customList = resultList(custom!.body, { max, ranks: false, scores: false, empty: 'Nothing found' });
  let keepG = true;

  const base = { keys: ['text'], useTokenSearch: true, threshold: 0.2, includeMatches: true };
  const plainFuse = new Fuse(NOTES, base);
  const run = (query: string): void => {
    const regex = keepG ? WITH_G : WITHOUT_G;
    custom!.head.textContent = `tokenize: ${regex}`;
    const customFuse = new Fuse(NOTES, { ...base, tokenize: regex });
    plainWords.set(query.toLowerCase().match(WORD_PATTERN) ?? []);
    // Without the g flag, match() returns only the first token.
    customWords.set(query.toLowerCase().match(regex) ?? []);
    const a = plainFuse.search(query);
    const b = customFuse.search(query);
    plainList.show(a.map((r) => ({ id: r.refIndex, title: marked(r, 'text', r.item.text) })));
    customList.show(b.map((r) => ({ id: r.refIndex, title: marked(r, 'text', r.item.text) })));
    stage.say(
      keepG
        ? `Default tokenizer: ${a.length} found, custom regex: ${b.length}. The regex keeps "${query.trim().split(/\s+/)[0]}" whole`
        : 'Without the g flag only the first word of the query is used',
      keepG ? 'info' : 'warn',
    );
  };
  box.onInput(run);

  if (stage.preview) {
    stage.cycle(STEPS, 2400, (step) => {
      keepG = step.g;
      box.set(step.query);
    });
  } else if (stage.bar) {
    checkbox(stage.bar, 'regex has the g flag', keepG, (v) => ((keepG = v), run(box.value)));
    run(box.value);
  }
  return stage.dispose;
};

export default mount;
