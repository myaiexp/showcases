// An idle graph stops drawing; a counter of GPU passes shows when frames resume
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mesh } from '../../shared/data.ts';
import { colors, hsl } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Wait for the layout to settle: the pass counter drops to zero. Zoom or hover to wake it.' });
  const data = mesh(12, 8, 30);
  const device = stage.device();
  let passes = 0;
  let rate = 0;
  let last = 0;
  let monitor = false;

  // Counts the passes cosmos.gl records on this example's own device: the simulation's and the draw's.
  void device.then((d) => {
    const original = d.beginRenderPass.bind(d);
    d.beginRenderPass = (props) => {
      passes++;
      return original(props);
    };
    stage.onDispose(() => (d.beginRenderPass = original));
  });

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 8,
        linkDefaultColor: '#6a7080',
        simulationDecay: 150, // a short cool-down, so the idle state arrives soon
        simulationGravity: 0.1,
        showFPSMonitor: false,
        fitViewDelay: 600,
      },
      device,
    ),
  );
  graph.setPointPositions(data.positions.map((v, i) => v + (((i * 7919) % 13) - 6) * 3));
  graph.setPointColors(colors(data.count, (i) => hsl(180 + (i % 12) * 12, 0.65, 0.62)));
  graph.setLinks(data.links);
  graph.render();
  stage.refit(graph, 3000);
  if (!stage.preview) stage.after(2500, () => graph.fitView(500, 0.2));

  stage.every(500, () => {
    rate = (passes - last) * 2;
    last = passes;
    const idle = rate === 0;
    stage.say(
      idle
        ? `Idle: 0 GPU passes per second. No frames are scheduled until something changes. (showFPSMonitor: ${monitor})`
        : `Drawing: ${rate} GPU passes per second (showFPSMonitor: ${monitor})`,
      idle ? 'ok' : 'info',
    );
  });
  const wake = (what: string, run: () => void): void => {
    stage.say(`${what}…`);
    run();
  };
  stage.button('Reheat layout', () => wake('graph.start(1)', () => graph.start(1)));
  stage.button('Zoom in', () => wake('graph.zoom(1.6, 400)', () => graph.zoom(1.6, 400)));
  stage.button('Zoom out', () => wake('graph.zoom(1, 400)', () => graph.zoom(1, 400)));
  stage.toggle('showFPSMonitor (keeps frames coming)', false, (on) => {
    monitor = on;
    graph.setConfigPartial({ showFPSMonitor: on });
  });
  stage.cycle(
    [
      { run: () => graph.start(1), hold: 5200 },
      { run: () => graph.zoom(1.5, 400), hold: 3200 },
      { run: () => graph.zoom(1, 400), hold: 3200 },
    ],
    3000,
  );
  return () => stage.dispose();
};

export default mount;
