// setHostHoveredPoint and setHostHoveredLink hover what the page picked itself
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { web } from '../../shared/static-layouts.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover an entry in the list: the page, not the pointer over the canvas, picked the point or link.' });
  const data = web(8, 2, 55);
  const linkCount = data.links.length / 2;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false,
        pointDefaultSize: 11,
        linkDefaultColor: '#5a5f6a',
        linkDefaultWidth: 2,
        renderHoveredPointRing: true,
        hoveredPointRingColor: '#ffd84d',
        hoveredLinkColor: '#ffd84d',
        hoveredLinkWidthIncrease: 5,
        fitViewPadding: 0.15,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();

  const hoverPoint = (i?: number): void => {
    graph.setHostHoveredLink(undefined);
    graph.setHostHoveredPoint(i);
    stage.say(i === undefined ? 'setHostHoveredPoint(undefined): cleared' : `setHostHoveredPoint(${i}): the ring is drawn, no pointer is over the canvas`);
  };
  const hoverLink = (k?: number): void => {
    graph.setHostHoveredPoint(undefined);
    graph.setHostHoveredLink(k);
    stage.say(k === undefined ? 'setHostHoveredLink(undefined): cleared' : `setHostHoveredLink(${k}): the link takes the hovered width and colour`);
  };

  if (!stage.preview) {
    // The page's own picking: a list of buttons.
    const panel = document.createElement('div');
    panel.className = 'cg-side';
    panel.style.cssText += ';display:flex;flex-wrap:wrap;gap:4px;align-content:flex-start;max-height:420px';
    const item = (label: string, on: () => void): void => {
      const b = document.createElement('button');
      b.textContent = label;
      b.style.cssText = 'padding:2px 7px;font-size:12px';
      b.addEventListener('pointerenter', on, { signal: stage.signal });
      b.addEventListener('pointerleave', () => hoverPoint(undefined), { signal: stage.signal });
      panel.append(b);
    };
    for (let i = 0; i < data.count; i++) item(`point ${i}`, () => hoverPoint(i));
    for (let k = 0; k < linkCount; k++) item(`link ${k}`, () => hoverLink(k));
    stage.root.append(panel);
    stage.onDispose(() => panel.remove());
    stage.say('Hover an entry in the list.');
  } else {
    const steps = [3, 9, 14].map((i) => ({ run: () => hoverPoint(i) }));
    stage.cycle([...steps, { run: () => hoverLink(5) }, { run: () => hoverLink(20) }], 1400);
  }
  return () => stage.dispose();
};

export default mount;
