// Every plugin hook, logged in the order Chart.js calls it
import type { Plugin } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, createStage, every } from '../../shared/stage.ts';
import { button, controlBar, toggle } from '../../shared/controls.ts';
import { C, alpha, numbers, seeded } from '../../shared/data.ts';

// The hooks of the Plugin interface (plugins.md § Plugin Core API), roughly in call order.
const HOOKS = [
  'beforeInit',
  'afterInit',
  'beforeUpdate',
  'beforeElementsUpdate',
  'beforeDatasetsUpdate',
  'beforeDatasetUpdate',
  'afterDatasetUpdate',
  'afterDatasetsUpdate',
  'beforeLayout',
  'beforeDataLimits',
  'afterDataLimits',
  'beforeBuildTicks',
  'afterBuildTicks',
  'afterLayout',
  'afterUpdate',
  'beforeRender',
  'beforeDraw',
  'beforeDatasetsDraw',
  'beforeDatasetDraw',
  'afterDatasetDraw',
  'afterDatasetsDraw',
  'afterDraw',
  'afterRender',
  'beforeEvent',
  'afterEvent',
  'resize',
  'beforeDestroy',
  'afterDestroy',
] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 66, height: 200 });
  const rand = seeded(3);
  const rows = ctx.preview ? 8 : 18;

  const out = document.createElement('pre');
  Object.assign(out.style, {
    width: '100%',
    margin: '8px 0 0',
    font: `${ctx.preview ? 11 : 12}px/1.35 ui-monospace, monospace`,
    color: 'var(--fg-2)',
    height: `${rows * (ctx.preview ? 14.85 : 16.2)}px`,
    overflow: 'hidden',
    columns: ctx.preview ? '1' : '2',
    columnFill: 'auto',
  });
  el.append(out);

  let seq = 0;
  let lines: string[] = [];
  let revealed = Infinity;
  let withPointer = false;
  const show = (): void => {
    const upto = Math.min(lines.length, revealed);
    const room = ctx.preview ? rows : rows * 2;
    out.textContent = lines.slice(Math.max(0, upto - room), upto).join('\n');
  };
  const record = (name: string): void => {
    if (!withPointer && (name === 'beforeEvent' || name === 'afterEvent')) return;
    lines.push(`${String(++seq).padStart(3, '0')} ${name}`);
  };

  // One function per hook, all writing to the same list. They return nothing, so no
  // before* hook cancels what follows.
  const logger: Plugin<'bar'> = { id: 'showcaseLifecycleLog' };
  for (const name of HOOKS) (logger as unknown as Record<string, unknown>)[name] = () => record(name);

  let chart: Chart<'bar'>;
  const build = (): void => {
    chart = new Chart(stage.canvas, {
      type: 'bar',
      plugins: [logger],
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{ label: 'Tickets closed', data: numbers(5, 4, 20, rand), backgroundColor: alpha(C.cyan, 0.65) }],
      },
      options: { maintainAspectRatio: false, animation: false, plugins: { legend: { display: false } } },
    });
  };
  // Hooks fire in bursts, so the text is written once per burst, not once per hook.
  const flush = every(120, () => {
    if (!ctx.preview) show();
  });
  build();
  show();

  const newData = (): void => {
    chart.data.datasets[0]!.data = numbers(5, 4, 20, rand);
  };
  if (bar) {
    button(bar, 'update()', () => (newData(), chart.update()));
    button(bar, 'render()', () => chart.render());
    button(bar, 'resize(300, 200)', () => chart.resize(300, 200));
    button(bar, 'resize()', () => chart.resize());
    button(bar, 'Destroy and rebuild', () => (chart.destroy(), build()));
    button(bar, 'Clear log', () => ((lines = []), (seq = 0), show()));
    toggle(bar, 'animate', false, (v) => {
      chart.options.animation = v ? { duration: 600 } : false;
    });
    toggle(bar, 'log pointer events', false, (v) => (withPointer = v));
  }

  // A card replays one update pass line by line, like a scrolling terminal.
  let stopCard = (): void => {};
  if (ctx.preview) {
    const pass = (): void => {
      lines = [];
      seq = 0;
      newData();
      chart.update('none');
      revealed = 0;
    };
    pass();
    const type = every(90, () => {
      revealed++;
      show();
    });
    const again = every(4200, pass);
    stopCard = () => {
      type();
      again();
    };
  }

  return () => {
    flush();
    stopCard();
    out.remove();
    stage.release(chart);
  };
};

export default mount;
