// Enter runs once per new mark, update on every change, hover under the pointer
import type { Spec } from 'vega';
import { changeset } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420, height: 220, padding: 5,
    signals: [
      // Read by the enter set (once, when a bar is born) and by nothing else.
      { name: 'hue', value: 200 },
      // Read by the update set: every bar follows it, old and new alike.
      { name: 'gain', value: 1, bind: { input: 'range', min: 0.2, max: 1.5, step: 0.05 } },
    ],
    data: [{ name: 'table', values: [1, 2, 3, 4, 5, 6].map((id) => ({ id, v: 30 + ((id * 37) % 60) })) }],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'id' }, range: 'width', padding: 0.15 },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x', title: 'bar id' }],
    marks: [
      {
        type: 'rect',
        from: { data: 'table' },
        encode: {
          enter: {
            x: { scale: 'x', field: 'id' },
            width: { scale: 'x', band: 1 },
            fill: { signal: "'hsl(' + hue + ',65%,55%)'" },
            stroke: { value: '#fff' },
            strokeWidth: { value: 0 },
          },
          update: {
            y: { signal: "scale('y', datum.v * gain)" },
            y2: { scale: 'y', value: 0 },
          },
          // The exit set runs just before a bar is removed from the scene.
          exit: { fill: { value: 'tomato' } },
          hover: { strokeWidth: { value: 3 } },
        },
      },
    ],
  };

  const view = await stage.render(spec);

  let next = 7;
  const add = (): Promise<unknown> => {
    const id = next++;
    const old = id - 8;
    view.signal('hue', (id * 53) % 360);
    return view
      .change('table', changeset().insert([{ id, v: 30 + ((id * 37) % 60) }]).remove((d: { id: number }) => d.id <= old))
      .runAsync();
  };
  if (stage.bar) {
    button(stage.bar, 'Add a bar', () => void add());
  }
  cycle(stage, view, 'gain', [1, 0.6, 1.3, 0.8], 1500);
  if (stage.preview) stage.every(900, () => void add());
  return () => stage.dispose();
};

export default mount;
