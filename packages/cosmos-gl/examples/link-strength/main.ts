// setLinkStrength per link: weak bridges let groups drift apart
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';
import { keepFramed } from '../../shared/load.ts';

type Mode = 'equal' | 'weak' | 'strong';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Orange links join different groups. Pick how strongly they pull.' });
  const data = communities(3, 30, 7, 2, 0.15);
  const between: boolean[] = [];
  for (let l = 0; l < data.links.length / 2; l++) {
    between.push(data.group[data.links[l * 2] ?? 0] !== data.group[data.links[l * 2 + 1] ?? 0]);
  }

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 7,
        simulationGravity: 0.05,
        simulationRepulsion: 0.6,
        fitViewDelay: 1200,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  graph.setLinkColors(colors(between.length, (l) => (between[l] ? [1, 0.6, 0.25, 0.9] : [0.45, 0.5, 0.6, 0.5])));
  graph.render();
  keepFramed(stage, graph, 3000);

  const strengths: Record<Mode, (bridge: boolean) => number> = {
    equal: () => 1,
    weak: (bridge) => (bridge ? 0.02 : 1),
    strong: (bridge) => (bridge ? 1 : 0.2),
  };
  const words: Record<Mode, string> = {
    equal: 'every link has strength 1',
    weak: 'bridges 0.02, group links 1: the groups drift apart',
    strong: 'bridges 1, group links 0.2: the bridges pull the groups together',
  };
  const apply = (m: Mode): void => {
    graph.setLinkStrength(Float32Array.from(between, (b) => strengths[m](b)));
    graph.render(1, 0);
    stage.say(`setLinkStrength: ${words[m]}`);
  };
  stage.select<Mode>(
    'link strength',
    [
      { value: 'equal', label: 'equal' },
      { value: 'weak', label: 'weak bridges' },
      { value: 'strong', label: 'strong bridges' },
    ],
    'equal',
    apply,
  );
  apply('equal');
  if (stage.preview) stage.cycle((['equal', 'weak', 'strong'] as const).map((m) => ({ run: () => apply(m) })), 3600);
  return () => stage.dispose();
};

export default mount;
