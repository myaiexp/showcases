// trace.name is the legend text; without it Plotly numbers the traces
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const NAME_SETS: readonly (readonly [string | undefined, string | undefined])[] = [
  ['Blue Trace', 'Orange Trace'],
  ['Revenue', 'Cost'],
  [undefined, undefined],
  ['<b>Bold</b> name', '<i>Italic</i> name'],
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  await Plotly.newPlot(
    stage.div,
    [
      { x, y: [0, 3, 6, 4, 5, 2, 3, 5, 4], name: 'Blue Trace', type: 'scatter' },
      { x, y: [0, 4, 7, 8, 3, 6, 3, 3, 4], name: 'Orange Trace', type: 'scatter' },
    ],
    { template: stage.template },
    stage.config,
  );
  let n = 0;
  const next = (): void => {
    const [a, b] = pick(NAME_SETS, ++n);
    // restyle with undefined restores the default "trace 0" / "trace 1"
    void restyle(stage.div, { name: [a ?? null, b ?? null] }, [0, 1]);
  };
  if (stage.bar) button(stage.bar, 'next name set', next);
  if (stage.preview) stage.every(1400, next);
  return () => stage.dispose();
};

export default mount;
