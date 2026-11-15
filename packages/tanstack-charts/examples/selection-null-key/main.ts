// keyedSelection key: return null for locked rows so they cannot be selected
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { keyedSelection, whenSelected } from '@tanstack/charts/selection';
import type { Mount } from '@/types.ts';
import { spotsOf, visit } from '../../shared/interact-drive.ts';
import { scatter } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = scatter(16, 14).map((r, i) => ({ ...r, locked: i % 4 === 3 }));
type Row = (typeof rows)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the hollow dots: nothing happens. Click a filled dot: it is selected.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let selectedId: string | null = null;
  const open = rows.filter((r) => !r.locked);
  const locked = rows.filter((r) => r.locked);

  const build = () => {
    const selection = keyedSelection<Row, string, number, number>({
      selected: controlledSignal(selectedId, (next) => choose(next)),
      key: (datum) => (datum.locked ? null : datum.id),
    });
    return defineChart({
      marks: [
        dot(locked, { id: 'locked', x: 'x', y: 'y', key: 'id', r: 5, fillOpacity: 0, stroke: '#94a3b8', strokeWidth: 1.5 }),
        dot(open, { id: 'open', x: 'x', y: 'y', key: 'id', r: 5, fill: '#60a5fa' }),
        whenSelected(dot(open, { id: 'selected', x: 'x', y: 'y', key: 'id', r: 10, fillOpacity: 0, stroke: '#fbbf24', strokeWidth: 3 }), selection),
      ],
      scales: { x: { scale: scaleLinear, nice: true }, y: { scale: scaleLinear, nice: true, grid: true } },
      selection,
    });
  };
  const options = () => ({ definition: build(), height: stage.height, initialWidth: 640, ariaLabel: 'Scatter where hollow dots are locked' });
  const host = stage.own(mountChart(stage.box, options()));
  function choose(id: string | null): void {
    selectedId = id;
    host.update(options());
    stage.say(id ? `selected: ${id}` : 'nothing selected');
  }
  stage.say('nothing selected');
  if (stage.preview) {
    stage.after(500, () => {
      const scene = host.getScene();
      const idx = (id: string) => scene.points.findIndex((p) => (p.datum as Row).id === id);
      visit(stage, spotsOf(scene, [idx(locked[0]!.id), idx(open[1]!.id), idx(locked[1]!.id), idx(open[4]!.id)]), 1500, { click: () => true, delay: 0 });
    });
  }
  return () => stage.dispose();
};

export default mount;
