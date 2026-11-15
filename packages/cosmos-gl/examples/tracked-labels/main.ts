// trackPointPositionsByIndices and non-blocking reads keep labels on points
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';
import { frames, overlay, type Tag } from '../../shared/overlay.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The labels follow the points while the layout moves. Track more or fewer points with the slider.' });
  const data = communities(4, 40, 6);
  const labels = overlay(stage);
  let nonBlocking = true;

  const graph = stage.own(
    new Graph(
      stage.div,
      { pointDefaultSize: 7, linkDefaultColor: '#5a6070', simulationDecay: 5000, simulationRepulsion: 0.7, fitViewDelay: 900, fitViewPadding: 0.15 },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  stage.refit(graph, 2200);

  const track = (every: number): void => {
    const indices: number[] = [];
    for (let i = 0; i < data.count; i += every) indices.push(i);
    graph.trackPointPositionsByIndices(indices);
    stage.say(`trackPointPositionsByIndices: ${indices.length} points, one label each`);
  };
  track(stage.preview ? 20 : 16);

  frames(stage, () => {
    if (!graph.isReady) return;
    // { nonBlocking: true } takes the latest copy the GPU has handed back and never stalls it.
    const map = graph.getTrackedPointPositionsMap(nonBlocking ? { nonBlocking: true } : undefined);
    const tags: [number, Tag][] = [];
    for (const [index, position] of map) {
      const [x, y] = graph.spaceToScreenPosition(position);
      tags.push([index, { x, y, text: `#${index}`, offset: 10 }]);
    }
    labels.show(tags);
  });

  stage.slider('every Nth point', 4, 40, 4, 16, (v) => track(v));
  stage.toggle('nonBlocking read', true, (on) => {
    nonBlocking = on;
    stage.say(on ? 'getTrackedPointPositionsMap({ nonBlocking: true })' : 'getTrackedPointPositionsMap(): reads the GPU and waits');
  });
  if (stage.preview) stage.every(6000, () => graph.start(1));
  return () => stage.dispose();
};

export default mount;
