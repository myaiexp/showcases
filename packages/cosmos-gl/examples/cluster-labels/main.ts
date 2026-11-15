// HTML labels following cluster centres via getClusterPositions
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { randomLinks, scatter } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';
import { keepFramed } from '../../shared/load.ts';

const NAMES = ['Alpha', 'Beta', 'Gamma', 'Delta'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the background or zoom: the labels stay on their clusters.' });
  const count = 140;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 7,
        linkDefaultColor: '#3a3f4b',
        simulationCluster: 0.6,
        simulationGravity: 0.1,
        fitViewDelay: 1200,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(scatter(count, 160, 2));
  graph.setPointColors(colors(count, (i) => paletteColor(i % 4)));
  graph.setLinks(randomLinks(count, 140, 2));
  graph.setPointClusters(Array.from({ length: count }, (_, i) => i % 4));
  graph.render();
  keepFramed(stage, graph, 2500);

  const labels = NAMES.map((name, c) => {
    const tag = document.createElement('div');
    const [r, g, b] = paletteColor(c);
    tag.textContent = stage.preview ? name : `Cluster ${name}`;
    tag.style.cssText =
      'position:absolute;left:0;top:0;pointer-events:none;font:600 11px sans-serif;padding:1px 6px;border-radius:8px;white-space:nowrap;' +
      `color:#fff;background:rgb(${r * 255} ${g * 255} ${b * 255} / 0.55);visibility:hidden`;
    stage.div.append(tag);
    return tag;
  });

  let frame = 0;
  const place = (): void => {
    frame = requestAnimationFrame(place);
    if (!graph.isReady) return;
    const centres = graph.getClusterPositions({ nonBlocking: true });
    labels.forEach((tag, c) => {
      const x = centres[c * 2];
      const y = centres[c * 2 + 1];
      if (x === undefined || y === undefined || !Number.isFinite(x)) return;
      const [sx, sy] = graph.spaceToScreenPosition([x, y]);
      tag.style.transform = `translate(${sx.toFixed(1)}px, ${sy.toFixed(1)}px) translate(-50%, -50%)`;
      tag.style.visibility = 'visible';
    });
  };
  frame = requestAnimationFrame(place);
  stage.onDispose(() => cancelAnimationFrame(frame));

  stage.say('getClusterPositions({ nonBlocking: true }) → spaceToScreenPosition → label transform, every frame');
  stage.button('Reheat', () => graph.start(1));
  if (stage.preview) stage.every(6000, () => graph.start(1));
  return () => stage.dispose();
};

export default mount;
