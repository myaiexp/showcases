// Compare point keys before and after an edit and a reorder: inferred keys follow the values
import { createChartScene, defineChart, dot, renderChartSvg } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const rows = [
  { name: 'north', x: 3, y: 8 },
  { name: 'south', x: 3, y: 5 },
  { name: 'east', x: 7, y: 8 },
  { name: 'west', x: 7, y: 5 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle the key: the table says whether each key still names the same row after one value is edited and the data is reversed.' });
  stage.box.style.maxWidth = '640px'; // a static svg scales to its box, so cap its height
  if (stage.preview) stage.height -= 58;
  const readout = stage.preview ? null : stage.readout();

  const scenes = (explicit: boolean) =>
    [rows, [...rows].reverse().map((r) => (r.name === 'south' ? { ...r, y: 6 } : r))].map((order) =>
      createChartScene(
        defineChart({
          marks: [dot(order, { x: 'x', y: 'y', r: 7, fill: '#60a5fa', ...(explicit ? { key: 'name' } : {}) })],
          scales: { x: { scale: scaleLinear, nice: true }, y: { scale: scaleLinear, nice: true, grid: true } },
        }),
        { width: 420, height: stage.preview ? stage.height : 180 },
      ),
    );
  const run = (explicit: boolean): void => {
    const [a, b] = scenes(explicit) as [ReturnType<typeof scenes>[0], ReturnType<typeof scenes>[0]];
    stage.box.innerHTML = renderChartSvg(b, { ariaLabel: 'Edited and reversed rows', idPrefix: stage.id('ks') });
    const rowOf = (scene: typeof a): Map<string, string> => new Map(scene.points.map((p) => [p.key, (p.datum as { name: string }).name]));
    const first = rowOf(a);
    const second = rowOf(b);
    const lines = [...first].map(([key, id]) => `key ...${key.slice(-26).padEnd(26)} ${id.padEnd(6)} -> ${(second.get(key) ?? '(gone)').padEnd(6)} ${second.get(key) === id ? 'same row' : 'DIFFERENT ROW'}`);
    const stable = [...first].every(([k, id]) => second.get(k) === id);
    if (readout) readout.textContent = `${explicit ? "key: 'name'" : 'inferred keys'}\n${lines.join('\n')}\nkeys stable across the edit and reorder: ${stable ? 'yes' : 'no'}`;
    else stage.say(`${explicit ? "key: 'name'" : 'inferred keys'}: stable across reorder: ${stable ? 'yes' : 'no'}`);
  };
  run(true);
  if (stage.bar) checkbox(stage.bar, "key: 'name'", true, run);
  else stage.cycle([true, false], 2200, run);
  return () => stage.dispose();
};

export default mount;
