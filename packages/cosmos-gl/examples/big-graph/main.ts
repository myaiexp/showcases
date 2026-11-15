// A clustered graph of up to 250,000 points and links with the FPS monitor on
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { rebuilder } from '../../shared/rebuild.ts';
import { resetZoom } from '../../shared/reset-zoom.ts';
import { bigGraph } from '../../shared/scale-data.ts';

const SIZES = [3000, 25000, 100000, 250000];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Start small and step up. The layout runs on the GPU for every size; the FPS monitor (top right) shows what it costs here.' });
  const rb = rebuilder(stage);
  let building = 0;

  const build = async (count: number): Promise<void> => {
    const id = ++building;
    const t0 = performance.now();
    stage.say(`Generating ${count.toLocaleString()} points and ${count.toLocaleString()} links…`);
    await stage.wait(30); // let the caption paint before the heavy work
    const data = bigGraph(count, 1, 24, 5);
    if (id !== building || stage.disposed) return;
    resetZoom(stage.div);
    const graph = rb.adopt(
      new Graph(
        stage.div,
        {
          showFPSMonitor: !stage.preview,
          pointDefaultSize: count > 100000 ? 1.5 : count > 10000 ? 2.5 : 4,
          linkDefaultColor: '#8a90a0',
          linkOpacity: count > 10000 ? 0.12 : 0.4,
          linkDefaultWidth: 1,
          simulationDecay: 8000,
          simulationRepulsion: 0.6,
          simulationGravity: 0.1,
          fitViewDelay: 1500,
          fitViewPadding: 0.1,
        },
        rb.device,
      ),
    );
    graph.setPointPositions(data.positions);
    graph.setPointColors(data.colors);
    graph.setLinks(data.links);
    graph.render();
    await graph.ready;
    stage.say(`${count.toLocaleString()} points, ${(data.links.length / 2).toLocaleString()} links. Data built and uploaded in ${Math.round(performance.now() - t0)} ms; the layout now runs live.`, 'ok');
  };

  stage.select<string>(
    'Points and links',
    SIZES.map((n) => ({ value: String(n), label: n.toLocaleString() })),
    String(stage.preview ? SIZES[0] : SIZES[1]),
    (v) => void build(Number(v)),
  );
  void build(stage.preview ? SIZES[0]! : SIZES[1]!);
  if (stage.preview) {
    stage.every(2500, () => rb.current?.fitView(700, 0.1));
    stage.every(9000, () => rb.current?.start(1));
  } else {
    stage.after(5000, () => rb.current?.fitView(600, 0.1));
  }
  return () => stage.dispose();
};

export default mount;
