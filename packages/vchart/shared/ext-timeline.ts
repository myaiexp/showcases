// Timeline helpers: the registration and the event data for the four timeline examples
import { registerTimelineChart } from '@visactor/vchart-extension';

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
