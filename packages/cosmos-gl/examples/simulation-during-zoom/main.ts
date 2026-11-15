// enableSimulationDuringZoom and the per-call enableSimulation argument
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The layout is kept hot; each zoom reports how many simulation ticks ran during it.' });
  const data = communities(4, 30, 3);
  let zooming = false;
  let ticksInZoom = 0;
  let what = '';

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 8,
        linkDefaultColor: '#5a5f6a',
        enableSimulationDuringZoom: false,
        simulationDecay: 400, // a low decay cools slowly, so the layout is still moving
        fitViewOnInit: false,
        onSimulationTick: () => {
          if (zooming) ticksInZoom++;
        },
        onZoomStart: () => {
          zooming = true;
          ticksInZoom = 0;
        },
        onZoomEnd: () => {
          zooming = false;
          stage.say(`${what}: ${ticksInZoom} simulation ticks during the zoom`, ticksInZoom > 0 ? 'ok' : 'warn');
        },
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  // The init fit sees only the start scatter: in the full view, fit again once the layout has spread.
  if (!stage.preview) stage.after(2500, () => graph.fitView(600, 0.12));

  let duringZoom = false;
  const go = (label: string, fn: () => void): void => {
    graph.start(1);
    what = label;
    stage.after(300, fn);
  };
  const zoomIn = (): void => go('setZoomLevel(3, 1500)', () => graph.setZoomLevel(3, 1500));
  const zoomOut = (): void => go('setZoomLevel(1, 1500)', () => graph.setZoomLevel(1, 1500));
  stage.toggle('enableSimulationDuringZoom', false, (on) => {
    duringZoom = on;
    graph.setConfigPartial({ enableSimulationDuringZoom: on });
  });
  stage.button('setZoomLevel(3, 1500): follows the config', zoomIn);
  stage.button('setZoomLevel(1, 1500): follows the config', zoomOut);
  stage.button('setZoomLevel(3, 1500, true)', () => go('setZoomLevel(3, 1500, true)', () => graph.setZoomLevel(3, 1500, true)));
  stage.button('setZoomLevel(3, 1500, false)', () => go('setZoomLevel(3, 1500, false)', () => graph.setZoomLevel(3, 1500, false)));
  stage.button('fitView(1500)', () => go('fitView(1500)', () => graph.fitView(1500)));
  stage.say(`enableSimulationDuringZoom: ${duringZoom}`);

  stage.cycle(
    [
      { say: 'setZoomLevel(3, 1500, true): layout runs while zooming', run: () => go('setZoomLevel(3, 1500, true)', () => graph.setZoomLevel(3, 1500, true)), hold: 3000 },
      { run: () => go('fitView(1500, 0.1, false)', () => graph.fitView(1500, 0.1, false)), hold: 3000 },
      { run: () => go('setZoomLevel(3, 1500, false)', () => graph.setZoomLevel(3, 1500, false)), hold: 3000 },
      { run: () => go('fitView(1500, 0.1, true)', () => graph.fitView(1500, 0.1, true)), hold: 3000 },
    ],
    3000,
  );
  return () => stage.dispose();
};

export default mount;
