// resize() with and without explicit width/height, plus the animated resize option
import type { Mount } from '@/types.ts';
import { echarts, THEME, controlBar, button, slider, every } from '../../shared/chart.ts';

const mount: Mount = (el, { preview }) => {
  // A wrapper whose width we change; the chart container fills it (chart-size.md:
  // without opts.width/height the chart takes the size of its node).
  const wrap = document.createElement('div');
  wrap.style.width = '100%';
  el.append(wrap);
  const box = document.createElement('div');
  box.style.height = preview ? '200px' : '320px';
  box.style.outline = '1px dashed #888';
  wrap.append(box);

  const chart = echarts.init(box, THEME);
  const state = { explicit: false, animate: true };

  const refit = (): void => {
    // resize(): no arguments, the chart fits the container again.
    // resize({ width, height }): the chart gets its own size (the API has no resize(w, h) form).
    // opts.animation: { duration } adds a transition; the default duration is 0.
    const animation = state.animate ? { duration: 400, easing: 'cubicOut' as const } : undefined;
    if (state.explicit) chart.resize({ width: 260, height: 180, animation });
    else chart.resize({ animation });
    chart.setOption({ title: { text: `chart ${chart.getWidth()} x ${chart.getHeight()}` } });
  };

  chart.setOption({
    title: { textStyle: { fontSize: 13 } },
    grid: { top: 40, left: 36, right: 12, bottom: 24 },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    yAxis: {},
    series: [{ type: 'bar', data: [12, 20, 15, 8, 18] }],
  });
  chart.setOption({ title: { text: `chart ${chart.getWidth()} x ${chart.getHeight()}` } });

  // The tip in chart-size.md: a ResizeObserver catches container changes made by JS/CSS.
  // A detached container measures 0×0, and resizing to that only makes ECharts warn.
  const observer = new ResizeObserver(() => {
    if (box.clientWidth > 0 && box.clientHeight > 0) refit();
  });
  observer.observe(box);

  const stops: Array<() => void> = [];
  if (preview) {
    let wide = false;
    stops.push(every(1800, () => {
      wide = !wide;
      wrap.style.width = wide ? '100%' : '45%';
    }));
  } else {
    const bar = controlBar(el);
    el.insertBefore(bar, wrap);
    slider(bar, 'container width %', [30, 100, 1], 100, (v) => {
      wrap.style.width = `${v}%`;
    });
    button(bar, 'resize(): fit container', () => {
      state.explicit = false;
      refit();
    });
    button(bar, 'resize({ width: 260, height: 180 })', () => {
      state.explicit = true;
      refit();
    });
    const anim = button(bar, 'animation: on', () => {
      state.animate = !state.animate;
      anim.textContent = `animation: ${state.animate ? 'on' : 'off'}`;
    });
  }

  return () => {
    for (const s of stops) s();
    observer.disconnect();
    chart.dispose();
  };
};

export default mount;
