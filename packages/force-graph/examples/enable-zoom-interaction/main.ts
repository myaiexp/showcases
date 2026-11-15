// Interaction: enableZoomInteraction takes a predicate on the event: here the wheel only zooms with Ctrl or Cmd held
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { script } from '../../shared/tour.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll over the graph: nothing happens. Hold Ctrl (or Cmd) and scroll: it zooms. Drags still pan.' });
  const data = clusters(3, stage.preview ? 6 : 10);

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(data)
    .nodeAutoColorBy('group')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .enableZoomInteraction((ev) => ev.ctrlKey || ev.metaKey)
    .cooldownTime(2500)
    .onEngineStop(() => graph.zoomToFit(300, 30));
  const say = status(stage, 'enableZoomInteraction(ev => ev.ctrlKey || ev.metaKey)');
  graph.onZoom(({ k }) => say(`zoom k ${k.toFixed(2)}`));

  if (stage.bar) {
    checkbox(stage.bar, 'require Ctrl / Cmd for wheel zoom', true, (on) =>
      graph.enableZoomInteraction(on ? (ev) => ev.ctrlKey || ev.metaKey : true),
    );
  } else {
    const canvas = stage.container.querySelector('canvas')!;
    const wheel = (deltaY: number, ctrlKey: boolean): void => {
      const r = canvas.getBoundingClientRect();
      canvas.dispatchEvent(
        new WheelEvent('wheel', { deltaY, ctrlKey, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, bubbles: false, cancelable: true }),
      );
    };
    let out = false;
    script(stage, async (wait) => {
      say('wheel: filter says no');
      wheel(-60, false);
      await wait(1400);
      say('Ctrl + wheel: filter says yes');
      wheel(out ? 30 : -30, true);
      out = !out;
      await wait(2000);
    });
  }

  return stage.dispose;
};

export default mount;
