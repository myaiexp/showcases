// Timeline helpers: events, the registration, and a spec builder for the four timeline examples
import { registerTimelineChart } from '@visactor/vchart-extension';
import type { ISpec } from './chart.ts';

registerTimelineChart();

export interface TimelineEvent {
  year: number;
  event: string;
  detail: string;
  icon: string;
  track: string;
}

export const EVENTS: TimelineEvent[] = [
  { year: 2019, event: 'Prototype', detail: 'First clickable demo', icon: 'star', track: 'Product' },
  { year: 2020, event: 'Private beta', detail: '40 teams invited', icon: 'diamond', track: 'Product' },
  { year: 2021, event: 'Launch', detail: 'Public release 1.0', icon: 'triangleUp', track: 'Product' },
  { year: 2022, event: 'Mobile app', detail: 'iOS and Android', icon: 'square', track: 'Product' },
  { year: 2023, event: 'Plugins', detail: 'Open extension API', icon: 'cross', track: 'Product' },
  { year: 2024, event: 'Version 2', detail: 'New rendering core', icon: 'star', track: 'Product' },
];

export const TEAM: TimelineEvent[] = [
  { year: 2019, event: 'Founded', detail: '3 people', icon: 'circle', track: 'Team' },
  { year: 2021, event: 'Seed round', detail: '12 people', icon: 'circle', track: 'Team' },
  { year: 2023, event: 'Second office', detail: '35 people', icon: 'circle', track: 'Team' },
];

export interface TimelineOptions {
  direction: 'horizontal' | 'vertical';
  labelPosition: string;
  events?: TimelineEvent[];
  icons?: boolean;
  iconOffset?: number;
  titleOffset?: number;
  arrowThickness?: number;
  grouped?: boolean;
  preview: boolean;
}

export function timelineSpec(o: TimelineOptions): ISpec {
  const p = o.preview;
  const events = o.events ?? (o.grouped ? [...EVENTS, ...TEAM].sort((a, b) => a.year - b.year) : EVENTS);
  return {
    type: 'timeline',
    animation: false,
    direction: o.direction,
    data: [{ id: 'events', values: p ? events.slice(0, 3) : events }],
    timeField: 'year',
    eventField: 'event',
    subTitleField: p ? undefined : 'detail',
    ...(o.icons ? { iconField: 'icon' } : {}),
    ...(o.grouped ? { seriesField: 'track' } : {}),
    labelPosition: o.labelPosition,
    dot: { style: { size: p ? 8 : 12, stroke: '#0c0d11', lineWidth: 2 } },
    ...(o.icons ? { icon: { visible: true, offset: o.iconOffset ?? 0, style: { size: p ? 12 : 20 } } } : {}),
    title: { offset: o.titleOffset ?? 0, style: { fontSize: p ? 10 : 14, fontWeight: 'bold', fill: '#e6e8ee' } },
    subTitle: { style: { fontSize: 12, fill: '#9aa1b0' } },
    line: { style: { stroke: '#4a5060', lineWidth: 2 } },
    arrow: { visible: true, thickness: o.arrowThickness ?? 14, style: { fill: '#3b82a0' } },
    padding: p ? 8 : 24,
  } as unknown as ISpec;
}
