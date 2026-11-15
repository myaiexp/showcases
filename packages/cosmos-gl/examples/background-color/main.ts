// backgroundColor repaints the canvas, changed live with setConfigPartial
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { web } from '../../shared/static-layouts.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const SWATCHES = [
  { value: '#222222', label: 'Default #222222' },
  { value: '#0b1d3a', label: 'Navy' },
  { value: '#2a0f1f', label: 'Wine' },
  { value: '#10261c', label: 'Forest' },
  { value: '#f2efe6', label: 'Paper' },
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a background. Points and links keep their own colors.' });
  const data = web(10, 4, 34);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        backgroundColor: '#222222',
        enableSimulation: false, // the web stays where it is placed
        pointDefaultSize: 9,
        linkDefaultColor: '#8a93a6',
        linkDefaultWidth: 1.5,
        fitViewPadding: 0.2,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();

  const paint = (color: string, name: string) => {
    graph.setConfigPartial({ backgroundColor: color });
    stage.div.style.background = color;
    stage.say(`setConfigPartial({ backgroundColor: '${color}' }) — ${name}`);
  };

  const pick = stage.select('backgroundColor', SWATCHES, '#222222', (v) => {
    paint(v, SWATCHES.find((s) => s.value === v)?.label ?? v);
  });
  stage.slider('Hue', 0, 360, 1, 220, (h) => {
    if (pick) pick.value = '';
    const color = `hsl(${h} 45% 18%)`;
    graph.setConfigPartial({ backgroundColor: color });
    stage.say(`setConfigPartial({ backgroundColor: '${color}' })`);
  });
  stage.say("backgroundColor: '#222222' (the default)");

  stage.cycle(
    SWATCHES.map((s) => ({ run: () => paint(s.value, s.label) })),
    2200,
  );
  return () => stage.dispose();
};

export default mount;
