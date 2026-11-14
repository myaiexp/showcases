// Registering plugins, interactions and the environment
import VChart, { registerBrowserEnv, registerElementHighlight, registerElementSelect, registerFormatPlugin, registerMediaQuery } from '@visactor/vchart';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, readout, slider } from '../../shared/chart.ts';
import { monthRows, setSize } from '../../shared/adapt-data.ts';

const mount: Mount = (el, ctx) => {
  // Groups from Load_on_Demand.md: a plugin (formatter, media query), the interactions, the environment.
  VChart.useRegisters([registerFormatPlugin, registerMediaQuery, registerElementHighlight, registerElementSelect, registerBrowserEnv]);

  const bar = ctx.preview ? null : controlBar(el);
  const wide = Math.max(el.clientWidth || 600, 320);
  const limit = Math.round(wide * 0.6);
  const { container, release } = createChart(el, ctx, {
    type: 'bar',
    data: [{ id: 'sales', values: monthRows }],
    xField: 'month',
    yField: 'sales',
    // These two need the plugins registered above: label.formatter (formatter plugin) and media (media query).
    label: { visible: true, formatter: '{sales:.1f}k', style: { fontSize: ctx.preview ? 9 : 12, fill: '#E6E9F2' } },
    media: [{ query: { maxWidth: limit }, action: [{ filterType: 'label', spec: { visible: false } }] }],
  } as never);
  const out = bar ? readout(el) : null;
  const show = (w: number): void => {
    if (out) {
      out.textContent = `VChart.useRegisters([registerFormatPlugin, registerMediaQuery,\n  registerElementHighlight, registerElementSelect, registerBrowserEnv]);\n\nwidth ${w}px: labels (formatter '{sales:.1f}k') ${w <= limit ? 'hidden by the media query' : 'shown'}\nThe full import has registered all of these already; registration is shown, not measured.`;
    }
  };
  setSize(container, 'width', wide);
  show(wide);

  let stop = (): void => {};
  if (ctx.preview) {
    let narrow = false;
    stop = every(2300, () => {
      narrow = !narrow;
      setSize(container, 'width', narrow ? Math.round(wide * 0.5) : wide);
    });
  } else if (bar) {
    slider(bar, 'width px', [220, wide, 10], wide, (w) => {
      setSize(container, 'width', w);
      show(w);
    });
  }

  return () => {
    stop();
    release();
  };
};

export default mount;
