// setLinkColors and setLinkWidths animate on the next render()
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { perItem } from '../../shared/data.ts';
import { colors, hsl } from '../../shared/color.ts';
import { circlePositions, skipLinks } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Link colours and widths are arrays with one entry per link. Change one, call render().' });
  const count = 36;
  const links = skipLinks(count, 5);
  const linkCount = count;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false,
        transitionDuration: 1000,
        pointDefaultSize: 6,
        linkDefaultColor: '#5a6070',
        linkDefaultWidth: 1,
        fitViewDelay: 300,
        fitViewPadding: 0.2,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(circlePositions(count, 150));
  graph.setLinks(links);
  graph.setLinkColors(colors(linkCount, () => [0.4, 0.45, 0.55, 1]));
  graph.setLinkWidths(perItem(linkCount, () => 1));
  graph.render();

  let warm = false;
  const recolor = async (): Promise<void> => {
    await graph.ready;
    warm = !warm;
    graph.setLinkColors(colors(linkCount, (i) => (warm ? hsl((i / linkCount) * 300, 0.85, 0.6) : [0.4, 0.45, 0.55, 1])));
    graph.render();
    stage.say('setLinkColors(…); render(): each link blends to its new colour');
  };
  let thick = false;
  const widen = async (): Promise<void> => {
    await graph.ready;
    thick = !thick;
    graph.setLinkWidths(perItem(linkCount, (i) => (thick ? 1 + (i % 6) * 1.6 : 1)));
    graph.render();
    stage.say('setLinkWidths(…); render(): each link thickens or thins');
  };

  stage.button('Recolour links', () => void recolor());
  stage.button('Change widths', () => void widen());
  stage.say('Press a button to animate link colours or widths');
  if (stage.preview) stage.cycle([{ run: recolor }, { run: widen }, { run: recolor }, { run: widen }], 2200);
  return () => stage.dispose();
};

export default mount;
