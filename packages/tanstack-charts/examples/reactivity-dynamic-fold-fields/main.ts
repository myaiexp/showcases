// A dynamic field list: validate before fold, re-run the whole pipeline when the list changes
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { fold } from '@tanstack/charts/transform/fold';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { rng, walk } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const random = rng(12);
const wide = Array.from({ length: 24 }, (_, hour) => ({ hour, cpu: 0, memory: 0, disk: 0, network: 0 }));
for (const field of ['cpu', 'memory', 'disk', 'network'] as const) {
  walk(random, 24, 40 + random() * 30, 5).forEach((v, i) => (wide[i]![field] = v));
}
type Field = 'cpu' | 'memory' | 'disk' | 'network';
const all: readonly Field[] = ['cpu', 'memory', 'disk', 'network'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Untick every box: the empty list is refused before fold runs.' });

  const build = (chosen: readonly Field[]) => {
    // fold wants a literal tuple at the type level; a runtime list is cast and checked first.
    const points = fold(wide, { fields: chosen as readonly ['cpu'], as: { key: 'metric', value: 'percent' } });
    return defineChart({
      marks: [lineY(points, { x: 'hour', y: 'percent', color: 'metric', strokeWidth: 2 })],
      scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear().domain([0, 100]), grid: true, axis: { label: 'Percent' } } },
    });
  };

  const options = (chosen: readonly Field[]) => ({ definition: build(chosen), height: stage.height, ariaLabel: 'Folded metrics' });
  let chosen: readonly Field[] = all.slice(0, 2);
  const host = stage.own(mountChart(stage.box, options(chosen)));
  const apply = (next: readonly Field[]): void => {
    if (next.length === 0 || new Set(next).size !== next.length) {
      stage.say('fold needs at least one distinct field: change refused, chart kept.');
      return;
    }
    chosen = next;
    host.update(options(chosen));
    stage.say(`fold({ fields: [${chosen.map((f) => `'${f}'`).join(', ')}] }) -> ${chosen.length * wide.length} rows`);
  };
  apply(chosen);
  if (stage.bar) {
    for (const f of all) {
      checkbox(stage.bar, f, chosen.includes(f), (on) => apply(on ? all.filter((x) => x === f || chosen.includes(x)) : chosen.filter((x) => x !== f)));
    }
  } else {
    const sets: Field[][] = [['cpu', 'memory'], ['cpu', 'memory', 'disk'], ['disk', 'network'], ['cpu', 'memory', 'disk', 'network']];
    stage.cycle(sets, 1800, (s) => apply(s));
  }
  return () => stage.dispose();
};

export default mount;
