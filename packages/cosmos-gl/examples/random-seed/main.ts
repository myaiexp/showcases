// randomSeed makes layouts repeat: same seed, same layout
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { rebuilder } from '../../shared/rebuild.ts';
import { tree } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'randomSeed is read only when the graph is built, so each run builds it again.' });
  const data = tree(80, 2, 120);
  const rb = rebuilder(stage);
  const log = stage.side();
  const lines: string[] = [];

  // Builds the same graph, runs the layout for 3 s and reads where point 3 ended up.
  const run = async (seed: number | undefined) => {
    const graph = rb.adopt(new Graph(stage.div, {
      randomSeed: seed, // read once, when the graph is built
      simulationLinkDistRandomVariationRange: [0.8, 2], // wide, so the randomness shows
      pointDefaultSize: 6,
      linkDefaultColor: '#667',
      fitViewDelay: 2500,
    }, rb.device));
    graph.setPointPositions(data.positions);
    graph.setLinks(data.links);
    graph.render();
    stage.say(`randomSeed: ${seed ?? 'undefined'}, layout running…`);
    await stage.wait(3200);
    const p = graph.getPointPositions();
    const mark = `point 3 at (${(p[6] ?? 0).toFixed(2)}, ${(p[7] ?? 0).toFixed(2)})`;
    stage.say(`randomSeed: ${seed ?? 'undefined'} → ${mark}`, 'ok');
    lines.push(`randomSeed ${seed ?? 'undefined'}: ${mark}`);
    if (log) log.textContent = lines.slice(-8).join('\n');
  };

  if (stage.preview) stage.every(1500, () => rb.current?.fitView(600, 0.15));
  stage.button('Seed 7', () => void run(7));
  stage.button('Seed 8', () => void run(8));
  stage.button('No seed', () => void run(undefined));
  stage.cycle([{ run: () => run(7) }, { run: () => run(7), hold: 1500 }, { run: () => run(8), hold: 1500 }], 800);
  return () => stage.dispose();
};

export default mount;
