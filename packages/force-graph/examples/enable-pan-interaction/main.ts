// Interaction: enablePanInteraction takes a predicate on the event: here dragging the background pans only with Shift held
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { script } from '../../shared/tour.ts';
import { createStage } from '../../shared/stage.ts';

const RULES = {
  'always (true)': true,
  'only with Shift': (ev: MouseEvent) => ev.shiftKey,
  'never (false)': false,
} as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the background. With the Shift rule it only pans while Shift is held; wheel zoom is a separate switch and stays on.' });
  const data = clusters(3, stage.preview ? 6 : 10);

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(data)
    .nodeAutoColorBy('group')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .enablePanInteraction((ev) => ev.shiftKey)
    .cooldownTime(2500)
    .onEngineStop(() => graph.zoomToFit(300, 30));
  const say = status(stage, 'enablePanInteraction(ev => ev.shiftKey)');

  if (stage.bar) {
    select(stage.bar, 'enablePanInteraction', Object.keys(RULES) as (keyof typeof RULES)[], (k) => graph.enablePanInteraction(RULES[k]), 'only with Shift');
  } else {
    // A background drag as d3-zoom sees it, queued with every other fake drag on the page.
    const ghost = stage.ghost(graph);
    let shift = false;
    script(stage, async (wait) => {
      shift = !shift;
      say(shift ? 'drag with Shift: pans' : 'drag without Shift: ignored');
      await ghost.pan(6, 6, 48, 32, 500, { shiftKey: shift });
      await wait(1500);
      if (shift) graph.zoomToFit(600, 30);
      await wait(800);
    });
  }

  return stage.dispose;
};

export default mount;
