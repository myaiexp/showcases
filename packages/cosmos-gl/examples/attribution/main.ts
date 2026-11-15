// attribution puts HTML in the corner; a CSS variable colors it
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { rebuilder } from '../../shared/rebuild.ts';
import { web } from '../../shared/static-layouts.ts';

const TEXTS = [
  { value: '<b>Map data</b> © the example project', label: 'Plain HTML' },
  { value: '<a href="#attribution" style="color:inherit">Made with cosmos.gl</a>', label: 'A link' },
  { value: '', label: 'Empty string: hidden' },
] as const;
const COLORS = ['#9aa4b5', '#ffd84d', '#ff7a90'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The text is read only when the graph is built, so each pick builds the graph again.' });
  const data = web(8, 3, 36);
  const rb = rebuilder(stage);

  const build = (attribution: string, color: string) => {
    stage.div.style.setProperty('--cosmosgl-attribution-color', color);
    const graph = rb.adopt(new Graph(stage.div, { attribution, enableSimulation: false, pointDefaultSize: 9, linkDefaultColor: '#667', fitViewPadding: 0.2 }, rb.device));
    graph.setPointPositions(data.positions);
    graph.setLinks(data.links);
    graph.render();
    graph.fitView(0, 0.2); // a rebuilt graph frames itself again
    stage.say(`attribution: ${JSON.stringify(attribution)}, --cosmosgl-attribution-color: ${color}`);
  };

  let text: string = TEXTS[0].value;
  let color: string = COLORS[0];
  build(text, color);
  stage.select('attribution', TEXTS.map((t) => ({ value: t.label, label: t.label })), TEXTS[0].label, (label) => {
    text = TEXTS.find((t) => t.label === label)?.value ?? '';
    build(text, color);
  });
  stage.select('--cosmosgl-attribution-color', COLORS.map((c) => ({ value: c, label: c })), COLORS[0], (c) => {
    color = c;
    stage.div.style.setProperty('--cosmosgl-attribution-color', c); // a CSS variable: no rebuild needed
    stage.say(`--cosmosgl-attribution-color: ${c}`);
  });

  let n = 0;
  stage.every(2800, () => {
    n++;
    build(TEXTS[n % 2]?.value ?? '', COLORS[n % COLORS.length] ?? '#fff');
  });
  return () => stage.dispose();
};

export default mount;
