// focusedPointIndex draws a ring around one point, in focusedPointRingColor
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';
import { keepFramed, load } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Choose the focused point and the colour of its ring.' });
  const data = communities(4, 30, 3);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 10,
        linkDefaultColor: '#5a5f6a',
        focusedPointIndex: 7,
        focusedPointRingColor: '#ffd84d',
        fitViewDelay: 1500,
      },
      stage.device(),
    ),
  );
  load(graph, data);
  keepFramed(stage, graph);
  stage.say('focusedPointIndex: 7');

  const focus = (i: number | undefined): void => {
    graph.setConfigPartial({ focusedPointIndex: i });
    stage.say(i === undefined ? 'focusedPointIndex: undefined (no focus)' : `focusedPointIndex: ${i}`);
  };
  const slider = stage.slider('focusedPointIndex', 0, data.count - 1, 1, 7, (v) => focus(v));
  stage.button('undefined (clear)', () => focus(undefined));
  stage.button('Random point', () => {
    const i = Math.floor(Math.random() * data.count);
    if (slider) slider.value = String(i);
    slider?.dispatchEvent(new Event('input'));
  });
  stage.select(
    'focusedPointRingColor',
    [
      { value: '#ffd84d', label: 'yellow' },
      { value: '#ff5d73', label: 'red' },
      { value: '#5de2ff', label: 'cyan' },
      { value: '#ffffff', label: 'white (default)' },
    ],
    '#ffd84d',
    (v) => graph.setConfigPartial({ focusedPointRingColor: v }),
  );

  const stops: [number, string][] = [
    [7, '#ffd84d'],
    [48, '#ff5d73'],
    [75, '#5de2ff'],
    [110, '#ffffff'],
  ];
  stage.cycle([
    ...stops.map(([i, c]) => ({
      say: `focusedPointIndex: ${i}, focusedPointRingColor: ${c}`,
      run: () => graph.setConfigPartial({ focusedPointIndex: i, focusedPointRingColor: c }),
    })),
    { say: 'focusedPointIndex: undefined', run: () => graph.setConfigPartial({ focusedPointIndex: undefined }), hold: 1500 },
  ], 2000);
  return () => stage.dispose();
};

export default mount;
