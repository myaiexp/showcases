// Gantt config parameters as live controls: gantt: frontmatter is rebuilt on every change
import type { Mount } from '@/types.ts';
import { liveDiagram, type State } from '../../shared/controls.ts';

const BODY = `gantt
    title Release plan
    dateFormat YYYY-MM-DD
    axisFormat %d %b
    section Backend
    API design        :done, a1, 2025-03-03, 6d
    Implementation    :active, a2, after a1, 10d
    Hardening         :a3, after a2, 5d
    section Frontend
    Mockups           :b1, 2025-03-05, 5d
    Wiring            :b2, after b1, 9d
    section Docs
    Guides            :c1, 2025-03-12, 12d`;

// The values below are the defaults from the library's own config. The docs' parameter list
// names these keys.
const INITIAL: State = {
  barHeight: 20,
  barGap: 4,
  topPadding: 50,
  leftPadding: 75,
  rightPadding: 75,
  fontSize: 11,
  sectionFontSize: 11,
  numberSectionStyles: 4,
  topAxis: false,
  displayMode: 'default',
};

// Every key is written out, so the frontmatter under the diagram shows what the controls set.
// displayMode "compact" puts tasks that do not overlap on one row; any other value keeps one row each.
const build = (v: State): string => {
  const lines = Object.keys(INITIAL).map((k) =>
    k === 'displayMode' ? `    displayMode: ${v[k] === 'compact' ? 'compact' : '""'}` : `    ${k}: ${v[k]}`,
  );
  return `---\nconfig:\n  gantt:\n${lines.join('\n')}\n---\n${BODY}`;
};

const mount: Mount = (el, ctx) =>
  liveDiagram(el, ctx, {
    initial: INITIAL,
    build,
    controls: [
      { kind: 'range', key: 'barHeight', label: 'barHeight', min: 10, max: 50 },
      { kind: 'range', key: 'barGap', label: 'barGap', min: 0, max: 30 },
      { kind: 'range', key: 'topPadding', label: 'topPadding', min: 20, max: 120, step: 5 },
      { kind: 'range', key: 'leftPadding', label: 'leftPadding', min: 20, max: 200, step: 5 },
      { kind: 'range', key: 'rightPadding', label: 'rightPadding', min: 0, max: 200, step: 5 },
      { kind: 'range', key: 'fontSize', label: 'fontSize', min: 8, max: 20 },
      { kind: 'range', key: 'sectionFontSize', label: 'sectionFontSize', min: 8, max: 24 },
      { kind: 'range', key: 'numberSectionStyles', label: 'numberSectionStyles', min: 1, max: 4 },
      { kind: 'check', key: 'topAxis', label: 'topAxis' },
      { kind: 'select', key: 'displayMode', label: 'displayMode', options: ['default', 'compact'] },
    ],
    // A card has no controls; it steps through three combinations.
    presets: [
      INITIAL,
      { ...INITIAL, barHeight: 34, barGap: 10, fontSize: 14, topAxis: true },
      { ...INITIAL, displayMode: 'compact', barHeight: 26, sectionFontSize: 16, numberSectionStyles: 2 },
    ],
  });

export default mount;
