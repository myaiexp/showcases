// getPointRadiusByIndex and getLinkWidthByIndex report sizes as drawn
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { CENTER, perItem } from '../../shared/data.ts';
import { frames, overlay, type Tag } from '../../shared/overlay.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The numbers are read every frame while sizes and widths transition.' });
  const count = 5;
  const gap = 90;
  const positions = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    positions[i * 2] = CENTER + (i - (count - 1) / 2) * gap;
    positions[i * 2 + 1] = CENTER;
  }
  const links = new Float32Array([0, 1, 1, 2, 2, 3, 3, 4]);
  const labels = overlay(stage);
  const small = (): Float32Array => perItem(count, () => 8);
  const big = (): Float32Array => perItem(count, (i) => 12 + i * 8);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false,
        transitionDuration: 2000,
        pointDefaultSize: 8,
        linkDefaultColor: '#8a93a3',
        linkDefaultWidth: 1,
        fitViewOnInit: false,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(positions);
  graph.setPointSizes(small());
  graph.setLinks(links);
  graph.setLinkWidths(perItem(4, () => 1));
  graph.render();
  void graph.ready.then(() => graph.fitViewByPointPositions([CENTER - 190, CENTER - 40, CENTER + 190, CENTER + 40], 0, 0.1));

  frames(stage, () => {
    if (!graph.isReady) return;
    const tags: [string, Tag][] = [];
    for (let i = 0; i < count; i++) {
      const [x, y] = graph.spaceToScreenPosition([positions[i * 2] ?? 0, positions[i * 2 + 1] ?? 0]);
      const r = graph.getPointRadiusByIndex(i);
      tags.push([`p${i}`, { x, y: y - (r ?? 0) * 0.3, text: `r ${r?.toFixed(1) ?? '–'}`, offset: (r ?? 8) + 6, color: '#9ecbff' }]);
    }
    for (let l = 0; l < 4; l++) {
      const [x, y] = graph.spaceToScreenPosition([CENTER + (l - 1.5) * gap, CENTER]);
      const wd = graph.getLinkWidthByIndex(l);
      tags.push([`l${l}`, { x, y, text: `w ${wd?.toFixed(1) ?? '–'}`, offset: -22, color: '#ffd84d' }]);
    }
    labels.show(tags);
  });

  let grown = false;
  const toggle = async (): Promise<void> => {
    await graph.ready;
    grown = !grown;
    graph.setPointSizes(grown ? big() : small());
    graph.setLinkWidths(perItem(4, (l) => (grown ? 2 + l * 2.5 : 1)));
    graph.render();
    stage.say(grown ? 'setPointSizes + setLinkWidths: the readings climb to the targets' : 'Back to small: the readings fall');
  };
  stage.button('Grow / shrink', () => void toggle());
  stage.say('r = point radius, w = link width, as drawn now');
  if (stage.preview) stage.cycle([{ run: toggle }], 3200);
  return () => stage.dispose();
};

export default mount;
