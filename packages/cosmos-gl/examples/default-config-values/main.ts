// defaultConfigValues beside a graph built with no config
import { Graph, defaultConfigValues } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';

const SHOWN = [
  'backgroundColor', 'pointDefaultColor', 'pointDefaultSize', 'pointOpacity', 'linkDefaultColor',
  'linkDefaultWidth', 'linkOpacity', 'curvedLinks', 'simulationGravity', 'simulationRepulsion',
  'simulationFriction', 'transitionDuration', 'fitViewPadding', 'pixelRatio',
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The graph below was built with new Graph(div) and no config.' });
  const data = communities(3, 14, 9);

  const graph = stage.own(new Graph(stage.div, {}, stage.device())); // no config: every key is its default
  graph.setPointPositions(data.positions);
  graph.setLinks(data.links);
  graph.render();
  stage.refit(graph);

  const values = defaultConfigValues as unknown as Record<string, unknown>;
  const line = (k: string) => `${k}: ${JSON.stringify(values[k])}`;
  const panel = stage.side();
  if (panel) panel.textContent = ['defaultConfigValues', '', ...SHOWN.map(line)].join('\n');
  stage.say(`${Object.keys(values).length} keys in defaultConfigValues, each one the value an omitted key gets.`);
  stage.cycle(
    SHOWN.slice(0, 6).map((k) => ({ say: `defaultConfigValues.${line(k)}`, run: () => undefined })),
    1800,
  );
  return () => stage.dispose();
};

export default mount;
