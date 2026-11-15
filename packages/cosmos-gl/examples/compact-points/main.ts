// Compacting drops NaN slots and renumbers links; render(undefined, 0) snaps
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mesh, rng } from '../../shared/data.ts';
import { colors, hsl } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Removed points leave empty slots. Compact squeezes them out without moving anything.' });
  const data = mesh(10, 7, 36);
  const hue = (i: number): ReturnType<typeof hsl> => hsl((i / data.count) * 300, 0.8, 0.6);
  let positions = data.positions.slice();
  let links = data.links;
  let slotColors = colors(data.count, hue);
  const pick = rng(21);

  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, transitionDuration: 900, pointDefaultSize: 9, linkDefaultColor: '#5a6070', fitViewDelay: 300, fitViewPadding: 0.15 },
      stage.device(),
    ),
  );
  graph.setPointPositions(positions);
  graph.setPointColors(slotColors);
  graph.setLinks(links);
  graph.render();

  const slots = (): number => positions.length / 2;
  const present = (): number => positions.reduce((n, v, i) => n + (i % 2 === 0 && !Number.isNaN(v) ? 1 : 0), 0);
  const remove = async (howMany: number): Promise<void> => {
    await graph.ready;
    for (let left = howMany, tries = 0; left > 0 && tries < 500; tries++) {
      const i = Math.floor(pick() * slots());
      if (Number.isNaN(positions[i * 2])) continue;
      positions[i * 2] = NaN;
      positions[i * 2 + 1] = NaN;
      left--;
    }
    graph.setPointPositions(positions);
    graph.render();
    stage.say(`${present()} points, ${slots()} slots: the empty slots still count`);
  };
  const compact = async (): Promise<void> => {
    await graph.ready;
    const newIndex = new Int32Array(slots()).fill(-1);
    const keep: number[] = [];
    for (let i = 0; i < slots(); i++) {
      if (Number.isNaN(positions[i * 2])) continue;
      newIndex[i] = keep.length;
      keep.push(i);
    }
    const nextLinks: number[] = [];
    for (let l = 0; l < links.length; l += 2) {
      const a = newIndex[links[l] ?? 0] ?? -1;
      const b = newIndex[links[l + 1] ?? 0] ?? -1;
      if (a >= 0 && b >= 0) nextLinks.push(a, b); // links to removed points are dropped
    }
    const nextPositions = new Float32Array(keep.length * 2);
    const nextColors = new Float32Array(keep.length * 4);
    keep.forEach((old, n) => {
      nextPositions.set(positions.subarray(old * 2, old * 2 + 2), n * 2);
      nextColors.set(slotColors.subarray(old * 4, old * 4 + 4), n * 4);
    });
    positions = nextPositions;
    slotColors = nextColors;
    links = new Float32Array(nextLinks);
    graph.setPointPositions(positions);
    graph.setPointColors(slotColors);
    graph.setLinks(links);
    graph.render(undefined, 0); // snap: the survivors are already where they belong
    stage.say(`Compacted to ${slots()} slots: points were renumbered and nothing moved`, 'ok');
  };
  const reset = async (): Promise<void> => {
    await graph.ready;
    positions = data.positions.slice();
    links = data.links;
    slotColors = colors(data.count, hue);
    graph.setPointPositions(positions);
    graph.setPointColors(slotColors);
    graph.setLinks(links);
    graph.render(undefined, 0);
    stage.say('Reset: 70 points again');
  };

  stage.button('Remove 10 points', () => void remove(10));
  stage.button('Compact', () => void compact());
  stage.button('Reset', () => void reset());
  stage.say('Remove some points, then compact');
  if (stage.preview) {
    stage.cycle([{ run: () => remove(14) }, { run: () => remove(14) }, { run: compact }, { run: reset }], 1900);
  }
  return () => stage.dispose();
};

export default mount;
