// Touch and pen: a tap clicks, a 500 ms hold opens the context menu
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { finger } from '../../shared/touch.ts';
import { web } from '../../shared/static-layouts.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'On a touch screen: tap a point, hold it for half a second, hold the background. The buttons send the same events.' });
  const data = web(8, 2, 55);
  const log = stage.side();
  const lines: string[] = [];
  const note = (text: string, tone: 'ok' | 'info' = 'ok'): void => {
    lines.push(text);
    if (log) log.textContent = lines.slice(-12).join('\n');
    stage.say(text, tone);
  };

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false,
        enableDrag: true,
        enableZoom: true,
        pointDefaultSize: 12,
        linkDefaultColor: '#5a5f6a',
        fitViewPadding: 0.15,
        onPointClick: (i) => note(`onPointClick: point ${i} (a tap)`),
        onPointContextMenu: (i) => note(`onPointContextMenu: point ${i} (held 500 ms, the click after it is dropped)`),
        onBackgroundClick: () => note('onBackgroundClick (a tap on empty space)'),
        onBackgroundContextMenu: () => note('onBackgroundContextMenu (held on empty space)'),
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();

  const touchAction = (): string => getComputedStyle(stage.div.querySelector('canvas') ?? stage.div).touchAction;
  const finger1 = finger(stage);
  const at = (index: number): [number, number] => {
    const p = graph.getPointPositions();
    return graph.spaceToScreenPosition([p[index * 2] ?? 0, p[index * 2 + 1] ?? 0]);
  };
  const empty: [number, number] = [22, 22];
  const tapPoint = (): void => finger1.tap(...at(3));
  const holdPoint = (): Promise<void> => finger1.hold(...at(11), 700);
  const holdBackground = (): Promise<void> => finger1.hold(...empty, 700);

  const readout = (): void => stage.say(`enableDrag ${graph.config.enableDrag}, enableZoom ${graph.config.enableZoom}: canvas touch-action is "${touchAction() || 'unset'}"`, 'info');
  const setGestures = (drag: boolean, zoom: boolean): void => {
    graph.setConfigPartial({ enableDrag: drag, enableZoom: zoom });
    readout();
  };
  stage.button('Tap a point', tapPoint);
  stage.button('Hold a point', () => void holdPoint());
  stage.button('Hold the background', () => void holdBackground());
  stage.toggle('enableDrag', true, (on) => setGestures(on, graph.config.enableZoom));
  stage.toggle('enableZoom', true, (on) => setGestures(graph.config.enableDrag, on));
  stage.say('Touch the graph, or use the buttons.');
  stage.cycle(
    [
      { run: tapPoint, hold: 1600 },
      { run: holdPoint, hold: 1800 },
      { run: holdBackground, hold: 1800 },
      { say: 'enableDrag and enableZoom off: the canvas stops claiming touches', run: () => setGestures(false, false), hold: 2200 },
      { run: () => setGestures(true, true), hold: 1800 },
    ],
    1000,
  );
  return () => stage.dispose();
};

export default mount;
