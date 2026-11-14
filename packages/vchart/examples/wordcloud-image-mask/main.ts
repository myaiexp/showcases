// maskShape as an image: a data URL drawn on a canvas, so no file is fetched
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { wordRows } from '../../shared/wordcloud-data.ts';

/** A black shape on white: the word cloud fills the dark pixels. */
function drawMask(kind: string): string {
  const c = document.createElement('canvas');
  c.width = 400;
  c.height = 400;
  const g = c.getContext('2d');
  if (!g) return '';
  g.fillStyle = '#fff';
  g.fillRect(0, 0, 400, 400);
  g.fillStyle = '#000';
  g.beginPath();
  if (kind === 'ring') {
    g.arc(200, 200, 190, 0, Math.PI * 2);
    g.arc(200, 200, 90, 0, Math.PI * 2, true);
  } else if (kind === 'moon') {
    g.arc(200, 200, 180, 0, Math.PI * 2);
    g.arc(270, 170, 150, 0, Math.PI * 2, true);
  } else {
    // a lightning bolt
    g.moveTo(240, 10);
    g.lineTo(90, 220);
    g.lineTo(190, 220);
    g.lineTo(150, 390);
    g.lineTo(320, 160);
    g.lineTo(215, 160);
    g.closePath();
  }
  g.fill('evenodd');
  return c.toDataURL('image/png');
}

const KINDS = ['ring', 'moon', 'bolt'];
const rows = wordRows(12, 40);

const mount: Mount = (el, ctx) => {
  const masks = Object.fromEntries(KINDS.map((k) => [k, drawMask(k)]));
  return mountLive<{ kind: string }>(el, ctx, {
    initial: { kind: 'ring' },
    mode: 'rebuild',
    previewMs: 2600,
    chart: { height: 460 },
    build: ({ kind }) =>
      ({
        type: 'wordCloud',
        maskShape: masks[kind],
        colorList: ['#f4c95d', '#ef8a62', '#ffffff'],
        wordCloudShapeConfig: { fillingColorList: ['#5b9bd5', '#3d6fa8'] },
        nameField: 'word',
        valueField: 'count',
        // A card is ~260x200, so its words are much smaller.
        fontSizeRange: ctx.preview ? [5, 12] : [10, 36],
        seriesField: 'word',
        data: [{ id: 'words', values: rows }],
        legends: { visible: false },
        title: { visible: !ctx.preview, text: `maskShape: data URL (${kind})` },
      }) as unknown as ISpec,
    step: (_s, i) => ({ kind: KINDS[i % KINDS.length] ?? 'ring' }),
    controls: (bar, live) => {
      select(bar, 'canvas-drawn mask', KINDS, (kind) => live.set({ kind }));
    },
  });
};

export default mount;
