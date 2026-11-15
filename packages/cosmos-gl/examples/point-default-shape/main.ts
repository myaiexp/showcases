// pointDefaultShape is the shape of points without a valid shape
import { Graph, PointShape } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { web } from '../../shared/static-layouts.ts';
import { colors, paletteColor } from '../../shared/color.ts';
import { perItem } from '../../shared/data.ts';

const SHAPES = [
  { value: String(PointShape.Circle), label: 'Circle (default)' },
  { value: String(PointShape.Square), label: 'Square' },
  { value: String(PointShape.Triangle), label: 'Triangle' },
  { value: String(PointShape.Diamond), label: 'Diamond' },
  { value: String(PointShape.Pentagon), label: 'Pentagon' },
  { value: String(PointShape.Hexagon), label: 'Hexagon' },
  { value: String(PointShape.Star), label: 'Star' },
  { value: String(PointShape.Cross), label: 'Cross' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The hub and the outer ring are stars; every other point uses the default shape.' });
  const data = web(10, 3, 38);

  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, pointDefaultShape: PointShape.Circle, pointDefaultSize: 14, linkDefaultColor: '#556', fitViewPadding: 0.2 },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  // NaN is not a valid shape, so those points fall back to pointDefaultShape.
  graph.setPointShapes(perItem(data.count, (i) => ([0, 3].includes(data.group[i] ?? 0) ? PointShape.Star : NaN)));
  graph.render();

  const set = (v: string) => {
    graph.setConfigPartial({ pointDefaultShape: Number(v) });
    stage.say(`pointDefaultShape: ${SHAPES.find((s) => s.value === v)?.label ?? v} (${v})`);
  };
  stage.select('pointDefaultShape', SHAPES, '0', set);
  stage.say('pointDefaultShape: Circle (0)');
  stage.cycle(SHAPES.slice(1).map((s) => ({ run: () => set(s.value) })), 1600);
  return () => stage.dispose();
};

export default mount;
