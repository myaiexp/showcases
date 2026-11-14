// Polar axes: an angle band axis and a radius linear axis on a radar chart
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const SKILLS = ['Speed', 'Power', 'Range', 'Defence', 'Stamina', 'Luck'];
const data = [
  ...[70, 55, 80, 40, 65, 50].map((v, i) => ({ skill: SKILLS[i], value: v, hero: 'Ash' })),
  ...[45, 85, 35, 75, 50, 70].map((v, i) => ({ skill: SKILLS[i], value: v, hero: 'Birch' })),
];
interface State { smooth: boolean; zebra: boolean; domain: boolean; max: number }
const SCENES: Partial<State>[] = [
  { smooth: false, zebra: false, domain: false, max: 100 },
  { smooth: true, zebra: false, domain: false, max: 100 },
  { smooth: true, zebra: true, domain: true, max: 100 },
  { smooth: false, zebra: true, domain: true, max: 120 },
];

const build = (s: State): ISpec =>
  ({
    type: 'radar',
    data: [{ values: data }],
    categoryField: 'skill',
    valueField: 'value',
    seriesField: 'hero',
    area: { visible: true, style: { fillOpacity: 0.15 } },
    axes: [
      {
        orient: 'radius',
        min: 0,
        max: s.max,
        grid: { visible: true, smooth: s.smooth, ...(s.zebra ? { alternateColor: ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.01)'] } : {}) },
      },
      { orient: 'angle', domainLine: { visible: s.domain, style: { stroke: '#ffd43b', lineWidth: 2 } }, grid: { visible: true } },
    ],
  }) as unknown as ISpec;

const bool = (v: string): boolean => v === 'true';
const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: SCENES[2] as State,
    build,
    mode: 'rebuild',
    previewMs: 1700,
    step: (_s, i) => SCENES[i % SCENES.length] ?? {},
    controls: (bar, live) => {
      select(bar, 'radius grid.smooth', ['true', 'false'], (v) => live.set({ smooth: bool(v) }));
      select(bar, 'alternateColor', ['true', 'false'], (v) => live.set({ zebra: bool(v) }));
      select(bar, 'angle domainLine', ['true', 'false'], (v) => live.set({ domain: bool(v) }));
      slider(bar, 'radius max', [60, 160, 10], 100, (v) => live.set({ max: v }));
    },
  });

export default mount;
