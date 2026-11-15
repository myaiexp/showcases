// getPointPositions reads all points back to draw a 2D-canvas minimap
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';
import { bounds } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The minimap is a plain 2D canvas fed by getPointPositions(). The box is what the main view shows.' });
  const data = communities(4, 60, 9);

  const w = stage.preview ? 90 : 170;
  const h = stage.preview ? 70 : 130;
  const map = document.createElement('canvas');
  map.width = w;
  map.height = h;
  map.style.cssText = 'position:absolute;right:6px;top:6px;background:rgb(0 0 0 / 0.6);border:1px solid #555;z-index:2;pointer-events:none';
  stage.div.append(map);
  stage.onDispose(() => map.remove());
  const g2 = map.getContext('2d');

  const graph = stage.own(
    new Graph(
      stage.div,
      { pointDefaultSize: 6, linkDefaultColor: '#5a6070', simulationDecay: 6000, simulationRepulsion: 0.8, fitViewDelay: 900, fitViewPadding: 0.15 },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  stage.refit(graph, 2200);
  stage.say('getPointPositions() every 120 ms');

  stage.every(120, () => {
    if (!graph.isReady || !g2) return;
    const p = graph.getPointPositions(); // [x1, y1, x2, y2, …] for all points
    const [x0, y0, x1, y1] = bounds(p) as [number, number, number, number];
    // The map frames the layout plus the main view, so the view box always fits inside.
    const view = [graph.screenToSpacePosition([0, 0]), graph.screenToSpacePosition([stage.div.clientWidth, stage.div.clientHeight])];
    const lo = [Math.min(x0, view[0]?.[0] ?? x0), Math.min(y0, view[0]?.[1] ?? y0)];
    const hi = [Math.max(x1, view[1]?.[0] ?? x1), Math.max(y1, view[1]?.[1] ?? y1)];
    const s = Math.min((w - 8) / Math.max(1, hi[0]! - lo[0]!), (h - 8) / Math.max(1, hi[1]! - lo[1]!));
    const mx = (x: number): number => 4 + (x - lo[0]!) * s;
    const my = (y: number): number => 4 + (y - lo[1]!) * s;
    g2.clearRect(0, 0, w, h);
    for (let i = 0; i < data.count; i++) {
      const c = paletteColor(data.group[i] ?? 0);
      g2.fillStyle = `rgb(${c[0] * 255 | 0} ${c[1] * 255 | 0} ${c[2] * 255 | 0})`;
      g2.fillRect(mx(p[i * 2] ?? 0) - 1, my(p[i * 2 + 1] ?? 0) - 1, 2, 2);
    }
    g2.strokeStyle = '#ffd84d';
    g2.strokeRect(mx(view[0]?.[0] ?? 0), my(view[0]?.[1] ?? 0), ((view[1]?.[0] ?? 0) - (view[0]?.[0] ?? 0)) * s, ((view[1]?.[1] ?? 0) - (view[0]?.[1] ?? 0)) * s);
  });
  if (stage.preview) stage.every(6000, () => graph.start(1));
  return () => stage.dispose();
};

export default mount;
