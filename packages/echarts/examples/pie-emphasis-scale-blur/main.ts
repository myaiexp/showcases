// Pie hover states: emphasis.scale and scaleSize, emphasis.focus with blur, and the emphasis label
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { SOURCES } from '../../shared/pie-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const look = { scale: true, scaleSize: 12, focus: 'self', blurOpacity: 0.25, bigLabel: true };
  const apply = (): void => {
    chart.setOption({
      legend: ctx.preview ? { show: false } : {},
      series: [
        {
          type: 'pie',
          radius: ['35%', '62%'],
          center: ['50%', ctx.preview ? '50%' : '52%'],
          label: { show: !ctx.preview, position: 'outside' },
          itemStyle: { borderColor: '#1b1f27', borderWidth: 2 },
          emphasis: {
            // The hovered sector grows outwards by scaleSize pixels.
            scale: look.scale,
            scaleSize: look.scaleSize,
            // 'self' fades every other sector (their blur state), 'none' leaves them alone.
            focus: look.focus,
            label: { show: true, fontSize: look.bigLabel ? 20 : 12, fontWeight: 'bold' },
            itemStyle: { shadowBlur: 16, shadowColor: 'rgba(0,0,0,0.6)' },
          },
          blur: { itemStyle: { opacity: look.blurOpacity } },
          data: SOURCES,
        },
      ],
    });
  };
  apply();

  let stop = (): void => {};
  if (ctx.preview) {
    // Hover sectors one after another with the highlight action.
    let n = 0;
    stop = every(900, () => {
      chart.dispatchAction({ type: 'downplay', seriesIndex: 0 });
      chart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: n % SOURCES.length });
      n += 1;
    });
  } else {
    const scale = button(bar!, 'emphasis.scale: on', () => {
      look.scale = !look.scale;
      scale.textContent = `emphasis.scale: ${look.scale ? 'on' : 'off'}`;
      apply();
    });
    slider(bar!, 'scaleSize', [0, 30, 1], look.scaleSize, (v) => { look.scaleSize = v; apply(); });
    select(bar!, 'focus', ['self', 'none'], (v) => { look.focus = v; apply(); });
    slider(bar!, 'blur opacity', [0, 1, 0.05], look.blurOpacity, (v) => { look.blurOpacity = v; apply(); });
    const big = button(bar!, 'emphasis label: large', () => {
      look.bigLabel = !look.bigLabel;
      big.textContent = `emphasis label: ${look.bigLabel ? 'large' : 'small'}`;
      apply();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
