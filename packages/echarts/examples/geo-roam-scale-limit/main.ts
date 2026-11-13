// geo.roam modes, scaleLimit and roamTrigger, with the zoom ratio read back from the georoam event
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, echarts, every, select, slider } from '../../shared/chart.ts';
import { COUNTRIES } from '../../shared/world.ts';

echarts.registerMap('geo-roam-scale-limit-world', { geoJSON: COUNTRIES as never, specialAreas: {} });

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const status = document.createElement('span');
  status.textContent = 'Drag or scroll over the map.';
  bar?.append(status);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });
  let roam: string = 'true';
  let min = 1;
  let max = 6;
  let trigger = 'selfRect';

  const limits = (): object => ({ min, max });
  const roamValue = (): boolean | string => (roam === 'true' ? true : roam === 'false' ? false : roam);

  chart.setOption({
    geo: {
      map: 'geo-roam-scale-limit-world',
      // roam: true | false | 'scale' (zoom only) | 'move' (pan only).
      roam: ctx.preview ? false : roamValue(),
      // scaleLimit: the range the zoom ratio may reach by roaming.
      scaleLimit: limits(),
      // roamTrigger: 'selfRect' roams only over the map's own rect, 'global' anywhere on the canvas.
      roamTrigger: trigger,
      itemStyle: { areaColor: '#2a2f3a', borderColor: '#0d1117', borderWidth: 0.5 },
      emphasis: { label: { show: false }, itemStyle: { areaColor: '#4a5265' } },
    },
  });

  const resend = (): void => {
    chart.setOption({ geo: { roam: roamValue(), scaleLimit: limits(), roamTrigger: trigger } });
  };

  if (bar) {
    // totalZoom is the accumulated zoom ratio since the map was last set by the option.
    chart.on('georoam', (e) => {
      const z = (e as { totalZoom?: number }).totalZoom;
      if (z !== undefined) status.textContent = `zoom ${z.toFixed(2)} (limit ${min} to ${max})`;
    });
    select(bar, 'roam', ['true', 'false', 'scale', 'move'], (v) => {
      roam = v;
      resend();
    });
    slider(bar, 'scaleLimit.min', [0.5, 3, 0.1], min, (v) => {
      min = Math.min(v, max);
      resend();
    });
    slider(bar, 'scaleLimit.max', [1, 12, 0.5], max, (v) => {
      max = Math.max(v, min);
      resend();
    });
    select(bar, 'roamTrigger', ['selfRect', 'global'], (v) => {
      trigger = v;
      resend();
    });
    button(bar, 'Reset view', () => {
      status.textContent = 'View reset';
      chart.setOption({ geo: { zoom: 1, center: ['50%', '50%'] } });
    });
  }

  // The preview has no pointer, so it plays the zoom and pan a reader would produce.
  let t = 0;
  const stop = ctx.preview
    ? every(100, () => {
        t += 0.05;
        chart.setOption({ geo: { zoom: 2.5 + 1.5 * Math.sin(t), center: [20 + 80 * Math.sin(t * 0.6), 20 + 25 * Math.sin(t * 0.9)] } });
      })
    : (): void => {};
  if (ctx.preview) chart.setOption({ animation: false });

  return () => {
    stop();
    dispose();
  };
};

export default mount;
