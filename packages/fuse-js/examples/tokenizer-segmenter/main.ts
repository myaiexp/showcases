// Japanese has no spaces: Intl.Segmenter lets token search find the words inside a sentence
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { WORD_PATTERN, wordRow } from '../../shared/token-marks.ts';
import { columns } from '../../shared/widgets.ts';

// Each sentence with its English meaning, shown under it.
const SENTENCES = [
  { text: '東京タワーに行きました', en: 'Went to Tokyo Tower' },
  { text: '大阪城は有名です', en: 'Osaka Castle is famous' },
  { text: '京都の桜は美しい', en: 'Kyoto cherry blossoms are beautiful' },
  { text: '奈良の鹿に会いました', en: 'Met the deer of Nara' },
  { text: '東京スカイツリーは高い', en: 'Tokyo Skytree is tall' },
  { text: '北海道の雪まつり', en: 'The Hokkaido snow festival' },
  { text: '大阪の食べ物はおいしい', en: 'Osaka food is delicious' },
  { text: '京都の寺をめぐる', en: 'Touring Kyoto temples' },
];
const MEANING: Record<string, string> = {
  '東京と大阪': 'Tokyo and Osaka',
  '大阪城と鹿': 'Osaka Castle and deer',
  '東京タワーと大阪城': 'Tokyo Tower and Osaka Castle',
};

const segmenter = new Intl.Segmenter('ja', { granularity: 'word' });
// Words only: punctuation and spaces are not word-like.
const tokenize = (text: string): string[] =>
  Array.from(segmenter.segment(text), (s) => (s.isWordLike ? s.segment : null)).filter((w): w is string => w !== null);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'No spaces in the query: the default tokenizer sees one long word, the segmenter finds the words inside it.' });
  const box = searchBox(stage.root, stage, { value: '東京と大阪', placeholder: '東京と大阪', tries: Object.keys(MEANING) });
  const [plain, seg] = columns(stage, ['Default tokenizer', 'Intl.Segmenter']);
  const plainWords = wordRow(plain!.body);
  const segWords = wordRow(seg!.body);
  const max = stage.preview ? 2 : 5;
  const plainList = resultList(plain!.body, { max, ranks: false, scores: false, empty: 'Nothing found' });
  const segList = resultList(seg!.body, { max, ranks: false, scores: false, empty: 'Nothing found' });

  const base = { keys: ['text'], useTokenSearch: true, threshold: 0.3, includeMatches: true };
  const plainFuse = new Fuse(SENTENCES, base);
  // A function tokenizer: it receives the text and returns its words.
  const segFuse = new Fuse(SENTENCES, { ...base, tokenize });

  const run = (query: string): void => {
    plainWords.set(query.match(WORD_PATTERN) ?? []);
    segWords.set(tokenize(query));
    const rows = (fuse: Fuse<(typeof SENTENCES)[number]>): { id: number; title: Node[]; sub: string }[] =>
      fuse.search(query).map((r) => ({ id: r.refIndex, title: marked(r, 'text', r.item.text), sub: r.item.en }));
    const a = rows(plainFuse);
    const b = rows(segFuse);
    plainList.show(a);
    segList.show(b);
    const gloss = MEANING[query] ? ` (${MEANING[query]})` : '';
    stage.say(
      query.trim()
        ? `${query}${gloss}: the default finds ${a.length} sentences, the segmenter ${b.length}`
        : '',
      b.length > a.length ? 'ok' : 'info',
    );
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, ['東京と大阪', '大阪城と鹿', '東京タワーと大阪城']);
  return stage.dispose;
};

export default mount;
