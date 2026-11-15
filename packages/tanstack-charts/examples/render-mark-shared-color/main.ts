// A custom mark contributes to the shared color scale and paints with context.color
import { colorLegend, createMark, defineChart, mountChart } from '@tanstack/charts';
import type { SceneNode } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

interface Team {
  team: string;
  wins: number;
}
const teams: readonly Team[] = [
  { team: 'Owls', wins: 14 },
  { team: 'Foxes', wins: 11 },
  { team: 'Hares', wins: 9 },
  { team: 'Wrens', wins: 6 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each pill takes its color from the shared scale; the legend comes from the same channel.' });

  const pills = createMark<Team, string, number>(({ markIndex }) => ({
    id: `pills-${markIndex}`,
    channels: {
      x: { scale: 'x', values: teams.map((t) => t.team) },
      y: { scale: 'y', values: teams.map((t) => t.wins), includeZero: true },
      // scale 'color' joins the one color scale the chart builds for every mark.
      color: { scale: 'color', values: teams.map((t) => t.team) },
    },
    render({ chart, scales, color }) {
      const base = chart.y + chart.height;
      const nodes: SceneNode[] = teams.map((t) => {
        const x = scales.x!.map(t.team);
        const y = scales.y!.map(t.wins);
        return { kind: 'rect', key: t.team, x: x - 18, y, width: 36, height: base - y, radius: 18, style: { fill: color(t.team) } };
      });
      return { nodes };
    },
  }));

  const definition = defineChart({
    marks: [pills],
    scales: { x: { scale: () => scalePoint<string>().padding(0.5) }, y: { scale: scaleLinear, nice: true, grid: true } },
    color: { legend: colorLegend() },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Wins by team' }));
  return () => stage.dispose();
};

export default mount;
