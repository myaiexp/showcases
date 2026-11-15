// compare() builds a multi-field comparator: pick one and watch the rows reorder
import * as vega from 'vega';
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { tableData, tableParts } from '../../shared/api-kit.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

interface Person {
  name: string;
  team: string;
  score: number;
  meta: { rank: number };
}
const people: Person[] = [
  ['Ada', 'red', 72, 3], ['Bo', 'blue', 91, 1], ['Cy', 'red', 91, 2], ['Di', 'green', 55, 4],
  ['Eli', 'blue', 72, 5], ['Flo', 'green', 88, 2], ['Gus', 'red', 40, 1], ['Hal', 'blue', 55, 3],
].map(([name, team, score, rank]) => ({ name, team, score, meta: { rank } }) as Person);

type Fields = string | ((d: Person) => unknown) | (string | ((d: Person) => unknown))[];
const presets: Record<string, { fields: Fields; orders?: string | string[] }> = {
  "compare('team')": { fields: 'team' },
  "compare(['team', 'score'], ['ascending', 'descending'])": { fields: ['team', 'score'], orders: ['ascending', 'descending'] },
  "compare('score', 'descending')": { fields: 'score', orders: 'descending' },
  "compare(['meta.rank', 'name'])": { fields: ['meta.rank', 'name'] },
  "compare([field('team'), 'score'], ['descending'])": { fields: [vega.field('team'), 'score'], orders: ['descending'] },
};
const names = Object.keys(presets);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const columns = [{ title: 'name', width: 70 }, { title: 'team', width: 70 }, { title: 'score', width: 70 }, { title: 'meta.rank', width: 90 }];
  const order = (key: string): string[][] => {
    const p = presets[key] ?? presets[names[0] ?? '']!;
    return people.slice().sort(vega.compare(p.fields as string, p.orders) as unknown as (a: Person, b: Person) => number).map((d) => [d.name, d.team, String(d.score), String(d.meta.rank)]);
  };
  const t = tableParts(columns, order(names[0] ?? ''), { y: 26 });

  const spec: Spec = {
    width: t.width + 40,
    height: t.height + 26,
    padding: 8,
    signals: [{ name: 'shown', value: 99 }, { name: 'call', value: names[0] }],
    data: [t.data],
    marks: [
      {
        type: 'text',
        encode: { enter: { x: { value: 0 }, y: { value: 0 }, fill: { value: '#f59e0b' }, font: { value: 'monospace' }, fontSize: { value: 12 } }, update: { text: { signal: 'call' } } },
      },
      ...t.marks,
    ],
  };
  const view = await stage.render(spec);

  const apply = async (key: string): Promise<void> => {
    view.signal('call', key);
    view.data('table', tableData(order(key)));
    await view.runAsync();
  };
  if (stage.bar) select(stage.bar, 'comparator', names, names[0] ?? '', (v) => void apply(v));
  if (stage.preview) stage.every(1600, (i) => apply(names[i % names.length] ?? ''));
  return () => stage.dispose();
};

export default mount;
