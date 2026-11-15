// getTrackedPointPositionsArray returns [x1, y1, …] in tracked order
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The yellow line joins the tracked points in the order they were given to trackPointPositionsByIndices.' });
  const data = communities(3, 40, 4);
  const panel = stage.side();
  // Tracking order is the array order, not the index order.
  const tracked = [90, 5, 60, 25, 100, 45, 75, 10];

  const svgNs = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNs, 'svg');
  svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1';
  const line = document.createElementNS(svgNs, 'polyline');
  line.setAttribute('fill', 'none');
  line.setAttribute('stroke', '#ffd84d');
  line.setAttribute('stroke-width', '1.5');
  svg.append(line);
  stage.div.append(svg);
  stage.onDispose(() => svg.remove());

  const graph = stage.own(
    new Graph(
      stage.div,
      { pointDefaultSize: 7, linkDefaultColor: '#5a6070', simulationDecay: 5000, fitViewDelay: 900, fitViewPadding: 0.15 },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  graph.trackPointPositionsByIndices(tracked);
  stage.refit(graph, 2200);
  stage.say(`trackPointPositionsByIndices([${tracked.join(', ')}])`);

  stage.every(120, () => {
    if (!graph.isReady) return;
    const flat = graph.getTrackedPointPositionsArray(); // [x1, y1, …], tracked order
    const screen: string[] = [];
    for (let k = 0; k + 1 < flat.length; k += 2) {
      const [x, y] = graph.spaceToScreenPosition([flat[k] ?? 0, flat[k + 1] ?? 0]);
      screen.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    line.setAttribute('points', screen.join(' '));
    if (panel) {
      panel.textContent = tracked.map((idx, k) => `#${idx}: ${(flat[k * 2] ?? NaN).toFixed(0)}, ${(flat[k * 2 + 1] ?? NaN).toFixed(0)}`).join('\n');
    }
  });
  if (stage.preview) stage.every(6000, () => graph.start(1));
  return () => stage.dispose();
};

export default mount;
