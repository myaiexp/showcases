// fontSizeRange and fontWeightRange: how big, and how bold, the heaviest and lightest words get
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { wordRows } from '../../shared/wordcloud-data.ts';

interface State {
  min: number;
  max: number;
  bold: boolean;
}
const rows = wordRows(5, 45);
const STEPS: State[] = [
  { min: 10, max: 30, bold: false },
  { min: 10, max: 60, bold: false },
  { min: 14, max: 72, bold: true },
  { min: 24, max: 24, bold: false },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { min: 12, max: 56, bold: true },
    mode: 'rebuild',
    previewMs: 2200,
    chart: { height: 460 },
    build: ({ min, max, bold }) =>
      ({
        type: 'wordCloud',
        nameField: 'word',
        valueField: 'count',
        seriesField: 'word',
        // Equal numbers fix a size: the smallest and largest word then look the same.
        fontSizeRange: [min, max],
        fontWeightRange: bold ? [200, 900] : [400, 400],
        data: [{ id: 'words', values: rows }],
        legends: { visible: false },
        title: { visible: !ctx.preview, text: `fontSizeRange: [${min}, ${max}]  fontWeightRange: ${bold ? '[200, 900]' : '[400, 400]'}` },
      }) as unknown as ISpec,
    step: (_s, i) => STEPS[i % STEPS.length] ?? {},
    controls: (bar, live) => {
      slider(bar, 'min size', [8, 40, 1], 12, (min) => live.set({ min: Math.min(min, live.state.max) }));
      slider(bar, 'max size', [20, 100, 1], 56, (max) => live.set({ max: Math.max(max, live.state.min) }));
      const label = document.createElement('label');
      const box = document.createElement('input');
      box.type = 'checkbox';
      box.checked = true;
      box.addEventListener('change', () => live.set({ bold: box.checked }));
      label.append(box, ' weight range 200 to 900');
      bar.append(label);
    },
  });

export default mount;
