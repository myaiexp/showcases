// thumbnail: a miniature overview of a roamable graph, with its window box, placement and style
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { seeded } from '../../shared/interaction-data.ts';

// A 9 x 7 mesh of nodes with jittered positions, joined to the neighbour on the right and below.
const COLS = 9;
const ROWS = 7;
const rand = seeded(81);
const nodes = Array.from({ length: COLS * ROWS }, (_, i) => ({
  id: 'n' + i,
  name: 'Node ' + (i + 1),
  x: (i % COLS) * 120 + (rand() - 0.5) * 60,
  y: Math.floor(i / COLS) * 120 + (rand() - 0.5) * 60,
  symbolSize: 8 + Math.round(rand() * 10),
}));
const links = nodes.flatMap((_, i) => {
  const out: { source: string; target: string }[] = [];
  if (i % COLS < COLS - 1 && rand() > 0.15) out.push({ source: 'n' + i, target: 'n' + (i + 1) });
  if (i + COLS < nodes.length && rand() > 0.15) out.push({ source: 'n' + i, target: 'n' + (i + COLS) });
  return out;
});

const PLACES: Record<string, Record<string, string | number>> = {
  'bottom right': { right: 12, bottom: 12 },
  'top right': { right: 12, top: 12 },
  'bottom left': { left: 12, bottom: 12 },
  'top left': { left: 12, top: 12 },
};

interface Look { place: string; width: number; show: boolean; border: string; zoom: number; center: [number, number] }

function build(look: Look, preview: boolean): EChartsOption {
  const h = Math.round((look.width * ROWS) / COLS);
  return {
    tooltip: {},
    series: [
      {
        type: 'graph',
        layout: 'none',
        // roam: pan and zoom; the thumbnail's window box follows the viewport.
        roam: !preview,
        zoom: look.zoom,
        center: look.center,
        data: nodes,
        links,
        lineStyle: { color: '#7d8da8', opacity: 0.7 },
        itemStyle: { color: '#5fb4ff' },
        label: { show: !preview, position: 'right', fontSize: 10 },
      },
    ],
    // thumbnail (6.0): only for graph series; seriesIndex picks the series (the first graph by default).
    thumbnail: {
      show: look.show,
      seriesIndex: 0,
      ...PLACES[look.place],
      width: look.width,
      height: h,
      // itemStyle: the frame and background; windowStyle: the box showing the visible part.
      itemStyle: { borderColor: look.border, borderWidth: 2, color: 'rgba(20, 30, 45, 0.85)' },
      windowStyle: { color: '#fac858', opacity: 0.35, borderColor: '#fac858', borderWidth: 1 },
    },
  } as EChartsOption;
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 440 });
  const look: Look = { place: 'bottom right', width: ctx.preview ? 110 : 180, show: true, border: '#b7b9be', zoom: ctx.preview ? 2.5 : 1, center: [480, 360] };
  // keepView: carry the roamed zoom and centre over, so a style change does not reset the view.
  // getOption() returns undefined until the first setOption, hence the optional chain.
  const show = (keepView = true, replace = false): void => {
    if (keepView && !ctx.preview) {
      const s = (chart.getOption() as { series?: { zoom?: number; center?: number[] }[] } | undefined)?.series?.[0];
      if (s?.zoom && s.center) {
        look.zoom = s.zoom;
        look.center = [s.center[0]!, s.center[1]!];
      }
    }
    chart.setOption(build(look, ctx.preview), replace);
  };
  show();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'placement', Object.keys(PLACES), (v) => {
      look.place = v;
      show(true, true);
    });
    slider(bar, 'width', [100, 300, 20], look.width, (v) => {
      look.width = v;
      show();
    });
    select(bar, 'itemStyle.borderColor', ['#b7b9be', '#5fb4ff', '#ee6666'], (v) => {
      look.border = v;
      show();
    });
    const t = button(bar, 'show: on', () => {
      look.show = !look.show;
      t.textContent = 'show: ' + (look.show ? 'on' : 'off');
      show();
    });
    // The window box needs a zoomed-in graph to be interesting; these set series zoom/center.
    button(bar, 'Zoom to the top left', () => {
      look.zoom = 3;
      look.center = [120, 100];
      show(false);
    });
    button(bar, 'Reset view', () => {
      look.zoom = 1;
      look.center = [480, 360];
      show(false);
    });
  } else {
    // A card has no pointer, so tour the viewport across the mesh; the thumbnail window follows.
    const stops: [number, number][] = [[200, 160], [760, 160], [760, 560], [200, 560]];
    let i = 0;
    stop = every(1600, () => {
      look.center = stops[++i % stops.length]!;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
