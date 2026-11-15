// autoLabelStopWords: words that never become automatic labels
import { EmbeddingViewMosaic, type EmbeddingViewConfig } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { textInput } from '../../shared/controls.ts';
import { texts, topicPoints, TOPICS } from '../../shared/data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add a label you see to the stop words: the next best word takes its place.' });
  const points = topicPoints({ count: stage.preview ? 6000 : 30000 });
  const mosaic = await stage.mosaic();
  const table = await mosaic.table('docs', { x: points.x, y: points.y, topic: points.category, text: texts(points) });
  if (stage.disposed) return stage.dispose;

  // Replacing the list also replaces the default (NLTK) stop words, so keep the fillers in.
  const fillers = ['the', 'a', 'about', 'with', 'and', 'for', 'over', 'into', 'notes', 'story', 'guide', 'review'];
  const config = (extra: string[]): EmbeddingViewConfig => ({ colorScheme: 'dark', autoLabelStopWords: [...fillers, ...extra] });

  const view = new EmbeddingViewMosaic(stage.view, {
    coordinator: mosaic.coordinator,
    table,
    x: 'x',
    y: 'y',
    category: 'topic',
    text: 'text',
    width: stage.width,
    height: stage.height,
    config: config([]),
  });
  stage.own(view);

  if (stage.bar) {
    textInput(stage.bar, 'extra stop words', '', (v) => view.update({ config: config(v.split(/[\s,]+/).filter(Boolean)) }));
  }
  // Cards ban each topic's first three words in turn.
  let k = 0;
  if (stage.preview) stage.every(3000, () => view.update({ config: config(TOPICS.flatMap((t) => t.words.slice(0, (k = (k + 1) % 4)))) }));
  return stage.dispose;
};

export default mount;
