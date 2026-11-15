// A static cloud stepped from 10,000 up to 1,000,000 points, no layout
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { rebuilder } from '../../shared/rebuild.ts';
import { resetZoom } from '../../shared/reset-zoom.ts';
import { bigGraph } from '../../shared/scale-data.ts';

const SIZES = [10000, 100000, 500000, 1000000];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom and pan stay on the GPU. Step the count up; each step builds the arrays and uploads them again.' });
  const rb = rebuilder(stage);
  let building = 0;
  let withLinks = false;
  let shown = SIZES[0]!;

  const build = async (count: number): Promise<void> => {
    const id = ++building;
    shown = count;
    stage.say(`Generating ${count.toLocaleString()} points…`);
    await stage.wait(30);
    const t0 = performance.now();
    const data = bigGraph(count, withLinks ? 1 : 0, 40, 9);
    const made = performance.now() - t0;
    if (id !== building || stage.disposed) return;
    resetZoom(stage.div);
    const graph = rb.adopt(
      new Graph(
        stage.div,
        {
          enableSimulation: false, // the positions are the layout: nothing steps, so nothing is spent
          showFPSMonitor: !stage.preview,
          pointDefaultSize: count >= 500000 ? 1 : count >= 100000 ? 1.5 : 2.5,
          pointOpacity: count >= 100000 ? 0.7 : 1,
          linkOpacity: 0.08,
          linkDefaultColor: '#8a90a0',
          fitViewPadding: 0.08,
          fitViewDelay: 300,
        },
        rb.device,
      ),
    );
    const t1 = performance.now();
    graph.setPointPositions(data.positions);
    graph.setPointColors(data.colors);
    if (withLinks) graph.setLinks(data.links);
    graph.render();
    await graph.ready;
    const links = withLinks ? ` and ${(data.links.length / 2).toLocaleString()} links` : '';
    stage.say(
      `${count.toLocaleString()} points${links}, enableSimulation: false. Arrays built in ${Math.round(made)} ms, uploaded in ${Math.round(performance.now() - t1)} ms.`,
      'ok',
    );
  };

  const choose = (v: string): void => void build(Number(v));
  stage.select<string>(
    'Points',
    SIZES.map((n) => ({ value: String(n), label: n.toLocaleString() })),
    String(SIZES[0]),
    choose,
  );
  stage.toggle('One link per point', false, (on) => {
    withLinks = on;
    void build(shown);
  });
  void build(stage.preview ? 3000 : SIZES[0]!);
  if (stage.preview) {
    const counts = [3000, 8000, 3000];
    let k = 0;
    stage.every(3500, () => void build(counts[++k % counts.length]!));
  }
  return () => stage.dispose();
};

export default mount;
