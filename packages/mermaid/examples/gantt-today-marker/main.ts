// Gantt todayMarker: default line, a styled line and todayMarker off, with tasks laid out around the current date
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Dates are built from today, so the marker always falls inside the chart.
const iso = (offsetDays: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
};

const TASKS = `    dateFormat YYYY-MM-DD
    axisFormat %d %b
    section Sprint
    Plan        :done, p1, ${iso(-10)}, 5d
    Build       :active, p2, ${iso(-4)}, 10d
    Review      :p3, after p2, 4d
    Ship        :p4, after p3, 3d`;

// No todayMarker line: the default marker is drawn at the current date.
const DEFAULT = `gantt
    title Default today marker
${TASKS}`;

// todayMarker takes CSS declarations separated by commas: here a thick, translucent green line.
const STYLED = `gantt
    title Styled today marker
${TASKS}
    todayMarker stroke-width:5px,stroke:#0f0,opacity:0.5`;

// A dashed orange marker: any SVG stroke property works the same way.
const DASHED = `gantt
    title Dashed today marker
${TASKS}
    todayMarker stroke-width:2px,stroke:#fb923c,stroke-dasharray:6 4`;

// todayMarker off hides the line entirely.
const OFF = `gantt
    title Today marker off
${TASKS}
    todayMarker off`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Default', code: DEFAULT },
      { label: 'Styled', code: STYLED },
      { label: 'Dashed', code: DASHED },
      { label: 'Off', code: OFF },
    ],
  });

export default mount;
