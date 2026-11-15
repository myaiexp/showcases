// setConfig resets omitted keys to defaults; setConfigPartial keeps them
import { Graph, type GraphConfig } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Run the buttons in order and watch which settings survive.', background: '#1d2a44' });
  const data = communities(3, 12, 5);

  const base: GraphConfig = {
    backgroundColor: '#1d2a44',
    pointDefaultSize: 12,
    linkDefaultColor: '#ffb347',
    linkDefaultWidth: 2.5,
    curvedLinks: true,
    fitViewDelay: 800,
  };
  const graph = stage.own(new Graph(stage.div, base, stage.device()));
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  stage.refit(graph);

  const apply = (call: string, run: () => void, bg: string) => {
    run();
    stage.div.style.background = bg;
    stage.say(call);
  };
  const steps = [
    { label: "setConfigPartial({ backgroundColor: '#14332a' })", note: 'Only the background changes. Big points, orange curved links stay.',
      run: () => apply("setConfigPartial({ backgroundColor: '#14332a' })", () => graph.setConfigPartial({ backgroundColor: '#14332a' }), '#14332a') },
    { label: "setConfigPartial({ backgroundColor: undefined })", note: 'undefined puts the background back to #222222; the other keys stay.',
      run: () => apply("setConfigPartial({ backgroundColor: undefined }) → background back to default, the rest stays", () => graph.setConfigPartial({ backgroundColor: undefined }), '#222222') },
    { label: "setConfig({ backgroundColor: '#3a1d44' })", note: 'Everything not listed goes back to its default.',
      run: () => apply("setConfig({ backgroundColor: '#3a1d44' }) → size, link color, width and curves all reset", () => graph.setConfig({ backgroundColor: '#3a1d44' }), '#3a1d44') },
    { label: 'setConfig(base)', note: 'Back to the starting config.',
      run: () => apply('setConfig(base) → the starting look again', () => graph.setConfig(base), '#1d2a44') },
  ];
  for (const s of steps) stage.button(s.label, s.run);
  stage.say('Start: backgroundColor, pointDefaultSize 12, orange curved links.');
  stage.cycle(steps.map((s) => ({ run: s.run })), 2600);
  return () => stage.dispose();
};

export default mount;
