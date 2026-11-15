// pointStrokeContrast sets how far a derived stroke differs from its fill
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { CENTER } from '../../shared/data.ts';
import { colors, hsl } from '../../shared/color.ts';

type Rule = 'auto' | 'darken' | 'lighten';
const RULES = [
  { value: 'auto', label: "'auto' (light points darken, dark ones lighten)" },
  { value: 'darken', label: "'darken'" },
  { value: 'lighten', label: "'lighten'" },
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Left to right the fills go from dark to light. Stroke width is 4 px.' });
  const cols = 8;
  const rows = 4;
  const count = cols * rows;

  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, pointDefaultSize: 28, pointDefaultStrokeWidth: 4, pointDefaultStrokeColor: 'auto', pointStrokeContrast: 0.03, fitViewPadding: 0.2 },
      stage.device(),
    ),
  );
  const positions = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    positions[i * 2] = CENTER + ((i % cols) - (cols - 1) / 2) * 34;
    positions[i * 2 + 1] = CENTER + (Math.floor(i / cols) - (rows - 1) / 2) * 34;
  }
  graph.setPointPositions(positions);
  // Columns run dark to light; rows change hue.
  graph.setPointColors(colors(count, (i) => hsl([210, 20, 330, 120][Math.floor(i / cols)] ?? 0, 0.6, 0.12 + ((i % cols) / (cols - 1)) * 0.76)));
  graph.render();

  let rule: Rule = 'auto';
  let contrast = 0.03;
  const apply = () => {
    graph.setConfigPartial({ pointDefaultStrokeColor: rule, pointStrokeContrast: contrast });
    stage.say(`pointDefaultStrokeColor: '${rule}', pointStrokeContrast: ${contrast}`);
  };
  stage.select('pointDefaultStrokeColor', RULES, 'auto', (v) => ((rule = v), apply()));
  stage.slider('pointStrokeContrast', 0, 0.3, 0.01, 0.03, (v) => ((contrast = v), apply()));
  const steps: [Rule, number][] = [['auto', 0.03], ['auto', 0.15], ['darken', 0.15], ['lighten', 0.15]];
  stage.cycle(steps.map(([r, c]) => ({ run: () => ((rule = r), (contrast = c), apply()) })), 2200);
  return () => stage.dispose();
};

export default mount;
