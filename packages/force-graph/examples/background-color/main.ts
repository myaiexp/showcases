// Container layout: backgroundColor paints the canvas; light nodes and links are set to match a dark one
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { color, readout } from '../../shared/controls.ts';
import { clusters } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

/** Perceived brightness 0..1 of a #rrggbb colour. */
const brightness = (hex: string): number => {
  const n = parseInt(hex.slice(1), 16);
  return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { paper: 'transparent', hint: 'Pick a background: the node and link colours follow its brightness.' });
  const note = stage.bar && readout(stage.bar);

  let bg = '#14213d';
  const graph = stage
    .own(new ForceGraph(stage.container))
    .graphData(clusters(3, stage.preview ? 9 : 14))
    .nodeAutoColorBy('group')
    .backgroundColor(bg)
    .linkColor(() => (brightness(bg) < 0.5 ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'))
    // The colour accessors only run when the canvas redraws, so keep it drawing while the colours change.
    .autoPauseRedraw(false);

  const apply = (c: string): void => {
    bg = c;
    graph.backgroundColor(c).linkColor(graph.linkColor());
    if (note) note.textContent = `backgroundColor('${c}')`;
  };

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 12));
    const cycle = ['#14213d', '#3d0c11', '#0b3d2e', '#f6f3ec', '#2b2d42'];
    let i = 0;
    stage.every(1800, () => apply(cycle[++i % cycle.length]!));
  } else if (stage.bar) {
    color(stage.bar, 'backgroundColor', bg, apply);
    apply(bg);
  }

  return stage.dispose;
};

export default mount;
