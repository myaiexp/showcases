// aria.label: change the templates, counts and separators of the generated description and read the result
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];
const tea = [32, 61, 40, 75];
const iced = [48, 90, 35, 12];

type Label = Record<string, unknown>;

// Each preset is an aria.label object. Template variables are in braces, as the docs list them.
const PRESETS: Record<string, Label> = {
  'default templates': {},
  'custom templates': {
    general: { withTitle: 'Chart about "{title}".' },
    series: {
      multiple: {
        prefix: ' {seriesCount} series.',
        withName: ' #{seriesId}: {seriesName} ({seriesType}).',
        separator: { middle: ' ', end: '' },
      },
    },
    data: {
      allData: ' Values: ',
      withName: '{name} = {value}',
      separator: { middle: '; ', end: '.' },
    },
  },
  'data.maxCount 2': {
    data: { maxCount: 2, partialData: ' (first {displayCnt} values only) ' },
  },
  'series.maxCount 1': {
    series: { maxCount: 1 },
  },
  'description override': {
    // description replaces the generated text completely.
    description: 'A seasonal comparison of hot and iced tea orders; iced tea peaks in summer.',
  },
  'label.enabled false': { enabled: false },
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, container, dispose } = createChart(el, ctx, { height: 340, previewHeight: 120 });
  const text = document.createElement('p');
  text.style.cssText = ctx.preview
    ? 'font-size:11px;margin:4px 0 0;max-height:70px;overflow:hidden;width:100%'
    : 'font-size:13px;margin:8px 0 0;width:100%';
  el.append(text);

  const render = (name: string): void => {
    chart.setOption(
      {
        // aria.enabled switches the feature on; aria.label holds the description templates.
        aria: { enabled: true, label: PRESETS[name] },
        title: { text: 'Tea orders by season', left: 'center', textStyle: { fontSize: ctx.preview ? 12 : 16 } },
        legend: { show: !ctx.preview, bottom: 0 },
        grid: { top: ctx.preview ? 30 : 44, left: 40, right: 16, bottom: ctx.preview ? 20 : 48 },
        xAxis: { type: 'category', data: SEASONS },
        yAxis: { type: 'value' },
        series: [
          { name: 'Hot tea', type: 'bar', data: tea },
          { name: 'Iced tea', type: 'bar', data: iced },
        ],
      },
      { notMerge: true },
    );
    // The container's aria-label is what a screen reader announces; absent when label is disabled.
    text.textContent = 'aria-label: ' + (container.getAttribute('aria-label') ?? '(none, label.enabled is false)');
  };

  const names = Object.keys(PRESETS);
  render(ctx.preview ? names[1]! : names[0]!);

  let stop = (): void => {};
  if (bar) {
    select(bar, 'aria.label', names, render);
  } else {
    let i = 1;
    stop = every(2200, () => {
      i = (i + 1) % names.length;
      render(names[i]!);
    });
  }

  return () => {
    stop();
    dispose();
    text.remove();
  };
};

export default mount;
