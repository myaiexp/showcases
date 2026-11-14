// Tooltip appearance: colours, border, padding, corners, caret, fonts
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { autoHover } from '../../shared/hover.ts';
import { controlBar, select, slider, toggle } from '../../shared/controls.ts';
import { C } from '../../shared/data.ts';
import { drinkLines, SALES_MONTHS } from '../../shared/config-data.ts';

// tooltip.md § Tooltip Configuration. Every preset sets every key, so switching is clean.
const BASE = {
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  titleColor: '#ffffff',
  bodyColor: '#ffffff',
  borderColor: 'rgba(0, 0, 0, 0)',
  borderWidth: 0,
  padding: 6,
  cornerRadius: 6,
  caretSize: 5,
  displayColors: true,
  titleFontSize: 12,
};
type Look = typeof BASE;
const PRESETS: Record<string, { label: string; look: Look }> = {
  default: { label: 'defaults', look: BASE },
  'light card': {
    label: 'light card, cornerRadius 10',
    look: { ...BASE, backgroundColor: '#fafafa', titleColor: '#18181b', bodyColor: '#3f3f46', borderColor: '#d4d4d8', borderWidth: 1, padding: 12, cornerRadius: 10, caretSize: 8 },
  },
  amber: {
    label: 'amber, bold title, big caret',
    look: { ...BASE, backgroundColor: '#3a2a05', titleColor: C.amber, bodyColor: '#fde68a', borderColor: C.amber, borderWidth: 2, padding: 10, cornerRadius: 2, caretSize: 12, titleFontSize: 16 },
  },
  minimal: {
    label: 'no boxes, no caret, tight',
    look: { ...BASE, backgroundColor: 'rgba(24, 24, 27, 0.95)', padding: 4, cornerRadius: 0, caretSize: 0, displayColors: false },
  },
};
const NAMES = Object.keys(PRESETS);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el, PRESETS.default!.label);

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: { labels: SALES_MONTHS, datasets: drinkLines(2).map((d) => ({ ...d, pointRadius: 4 })) },
    options: {
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  const sliders: Record<string, HTMLInputElement> = {};
  let colours: HTMLInputElement | null = null;
  const apply = (name: string): void => {
    const { label, look } = PRESETS[name]!;
    note.textContent = label;
    const { titleFontSize, ...rest } = look;
    Object.assign(chart.options.plugins!.tooltip!, rest, { titleFont: { size: titleFontSize, weight: 'bold' } });
    if (sliders.padding) {
      for (const key of ['padding', 'cornerRadius', 'caretSize'] as const) {
        sliders[key]!.value = String(look[key]);
        sliders[key]!.dispatchEvent(new Event('input'));
      }
    }
    if (colours) colours.checked = look.displayColors;
    chart.update();
  };
  const set = (patch: object): void => {
    Object.assign(chart.options.plugins!.tooltip!, patch);
    chart.update();
  };

  if (bar) {
    select(bar, 'Preset', NAMES, 'default', apply);
    sliders.padding = slider(bar, 'padding', [0, 24, 1], 6, (v) => set({ padding: v }));
    sliders.cornerRadius = slider(bar, 'cornerRadius', [0, 24, 1], 6, (v) => set({ cornerRadius: v }));
    sliders.caretSize = slider(bar, 'caretSize', [0, 20, 1], 5, (v) => set({ caretSize: v }));
    colours = toggle(bar, 'displayColors', true, (v) => set({ displayColors: v }));
  }
  const stopLook = ctx.preview ? cycle(NAMES, 2800, apply) : () => {};
  const stopHover = ctx.preview
    ? autoHover(chart, 1400, (s) => [0, 1].map((datasetIndex) => ({ datasetIndex, index: (s * 2 + 1) % 6 })))
    : () => {};

  return () => {
    stopLook();
    stopHover();
    stage.release(chart);
  };
};

export default mount;
