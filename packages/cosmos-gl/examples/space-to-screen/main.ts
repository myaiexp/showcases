// An HTML marker follows a point via spaceToScreenPosition and Radius
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';
import { load } from '../../shared/load.ts';
import './style.css';

const MARGIN = 6; // ring gap around the point, in point-radius units

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a point to attach the marker to it. Zoom and pan: the marker stays on the point.' });
  const data = communities(4, 30, 3);

  const marker = document.createElement('div');
  marker.className = 's2s-marker';
  const ring = document.createElement('div');
  ring.className = 's2s-ring';
  const label = document.createElement('div');
  label.className = 's2s-label';
  marker.append(ring, label);
  stage.div.append(marker);

  let tracked = 17;
  let cursor = '';
  // Reads the tracked point's graph position and puts the marker on the matching screen pixel.
  const place = (): void => {
    const p = graph.getTrackedPointPositionsMap({ nonBlocking: true }).get(tracked);
    if (!p) return;
    const [sx, sy] = graph.spaceToScreenPosition(p);
    // spaceToScreenRadius converts a point radius; it only follows the zoom with scalePointsOnZoom.
    const r = graph.spaceToScreenRadius((graph.getPointRadiusByIndex(tracked) ?? 4) + MARGIN);
    marker.style.transform = `translate(${sx}px, ${sy}px)`;
    ring.style.width = ring.style.height = `${r * 2}px`;
    label.textContent = stage.preview
      ? `point ${tracked}: ring ${r.toFixed(0)} px`
      : `point ${tracked}: space (${p[0].toFixed(0)}, ${p[1].toFixed(0)}), screen (${sx.toFixed(0)}, ${sy.toFixed(0)}), ring radius ${r.toFixed(1)} px${cursor}`;
    // Keep the label on the graph: it flips to the left of the point near the right edge.
    label.style.transform = sx > stage.div.clientWidth * 0.5 ? 'translate(calc(-100% - 10px), -100%)' : 'translate(10px, -100%)';
  };
  const track = (i: number): void => {
    tracked = i;
    graph.trackPointPositionsByIndices([i]);
    place();
  };

  const graph: Graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 8,
        scalePointsOnZoom: true, // point radii, and so the ring, grow with the zoom
        linkDefaultColor: '#5a5f6a',
        fitViewDelay: 1500,
        onSimulationTick: place,
        onZoom: place,
        onZoomEnd: place,
        onPointClick: (index) => track(index),
        onMouseMove: (_i, _p, event) => {
          const box = stage.div.getBoundingClientRect();
          const [x, y] = graph.screenToSpacePosition([event.clientX - box.left, event.clientY - box.top]);
          cursor = `; pointer at space (${x.toFixed(0)}, ${y.toFixed(0)})`;
        },
      },
      stage.device(),
    ),
  );
  load(graph, data);
  // The init fit sees only the start scatter: in the full view, fit again once the layout has spread.
  if (!stage.preview) stage.after(2500, () => graph.fitView(600, 0.12));
  graph.trackPointPositionsByIndices([tracked]);
  stage.say('spaceToScreenPosition puts the marker on the point; spaceToScreenRadius sizes the dashed ring around the point');

  stage.button('Zoom in on it', () => graph.zoomToPointByIndex(tracked, 800, 4));
  stage.button('fitView()', () => graph.fitView(800));
  stage.button('Reheat the layout', () => graph.start(1));

  if (stage.preview) {
    stage.cycle(
      [
        { run: () => graph.start(1), hold: 2000 },
        { run: () => graph.zoomToPointByIndex(tracked, 900, 3), hold: 2000 },
        { run: () => track(88), hold: 600 },
        { run: () => graph.zoomToPointByIndex(88, 900, 2.5), hold: 2000 },
        { run: () => (track(17), graph.fitView(900)), hold: 2000 },
      ],
      2000,
    );
  }
  return () => stage.dispose();
};

export default mount;
