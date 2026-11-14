// markPoint itemContent.type: text, symbol, image and richText on the same data point
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { walk } from '../../shared/components-data.ts';
import { wideImage } from '../../shared/opt-images.ts';

const TYPES = ['text', 'symbol', 'image', 'richText'];
const rows = walk(12, 6);
const peak = rows.reduce((a, b) => (b.y > a.y ? b : a));
const picture = wideImage().toDataURL();

const content = (type: string) => {
  switch (type) {
    case 'symbol':
      return { type: 'symbol', symbolType: 'star', size: 26, style: { fill: '#fbbf24' } };
    case 'image':
      return { type: 'image', image: picture, size: { width: 60, height: 30 }, style: { width: 60, height: 30 } };
    case 'richText':
      return {
        type: 'richText',
        text: { type: 'rich', text: [{ text: 'Peak ', fontSize: 13, fill: '#e5e7eb' }, { text: String(peak.y), fontSize: 20, fontWeight: 'bold', fill: '#fbbf24' }] },
      };
    default:
      return { type: 'text', text: { text: `Peak ${peak.y}`, style: { fill: '#fbbf24', fontSize: 14, fontWeight: 'bold' } } };
  }
};

const mount: Mount = (el, ctx) =>
  mountLive<{ type: string }>(el, ctx, {
    initial: { type: 'text' },
    mode: 'rebuild',
    previewMs: 1700,
    step: (s) => ({ type: TYPES[(TYPES.indexOf(s.type) + 1) % TYPES.length] as string }),
    build: (s) =>
      ({
        type: 'line',
        data: [{ id: 'd', values: rows }],
        xField: 'x',
        yField: 'y',
        axes: [{ orient: 'left', max: 110 }, { orient: 'bottom', label: { autoHide: true } }],
        markPoint: [
          {
            coordinate: { x: peak.x, y: peak.y },
            itemContent: { position: 'top', offsetY: -6, ...content(s.type) },
            itemLine: { visible: false },
            targetSymbol: { visible: true, size: 10, style: { fill: '#fbbf24' } },
          },
        ],
      }) as never,
    controls: (bar, live) => {
      select(bar, 'itemContent.type', TYPES, (v) => live.set({ type: v }));
    },
  });

export default mount;
