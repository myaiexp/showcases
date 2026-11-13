// A hand-written SVG cinema hall as a geo map: seats are named regions you select, with a running total
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, echarts, every } from '../../shared/chart.ts';
import { COLS, HALL, PRICE, ROWS, TAKEN, seatName } from './hall.ts';

// registerMap accepts a raw SVG string; every named element becomes a region.
echarts.registerMap('svg-seat-map-hall', { svg: HALL });

const TIER: Record<number, string> = { 16: '#8a4a7a', 12: '#2f6f9f', 9: '#3f8a5f' };
const SEATS = ROWS.flatMap((row) => Array.from({ length: COLS }, (_, c) => seatName(row, c)));
const priceOf = (seat: string): number => PRICE[seat[0]!]!;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const status = document.createElement('span');
  status.textContent = 'Click free seats to pick them. Premium rows A and B, standard C and D, economy E and F.';
  bar?.append(status);
  const { chart, dispose } = createChart(el, ctx, { height: 460 });

  chart.setOption({
    tooltip: {},
    geo: {
      map: 'svg-seat-map-hall',
      roam: false,
      selectedMode: 'multiple',
      layoutCenter: ['50%', '50%'],
      layoutSize: '96%',
      // Seat names double as labels; fontSize keeps them inside the 42px rects.
      label: { show: true, color: '#e6e6e6', fontSize: 10 },
      emphasis: { focus: 'self', itemStyle: { areaColor: '#6b8fd6' }, label: { color: '#fff' } },
      select: { itemStyle: { areaColor: '#f2b94c' }, label: { color: '#111' } },
      blur: { itemStyle: { opacity: 0.5 } },
      tooltip: { show: true },
      regions: [
        { name: 'Screen', silent: true, label: { show: false }, itemStyle: { areaColor: '#c8d2e8' } },
        ...SEATS.map((name) =>
          TAKEN.has(name)
            ? {
                name,
                // A sold seat: dark, not interactive (region.silent, 5.6) and no hover tooltip.
                silent: true,
                itemStyle: { areaColor: '#272b36' },
                label: { color: '#555b6b' },
              }
            : {
                name,
                itemStyle: { areaColor: TIER[priceOf(name)] },
                tooltip: { formatter: `Seat ${name}: ${priceOf(name)} EUR` },
              },
        ),
      ],
    },
  });

  const picked = new Set<string>();
  const report = (): void => {
    const list = [...picked].sort();
    const total = list.reduce((sum, s) => sum + priceOf(s), 0);
    status.textContent = list.length ? `Selected ${list.join(', ')}: ${total} EUR` : 'No seats selected.';
  };

  let stop = (): void => {};
  if (ctx.preview) {
    // Pick free seats one by one, then clear them all and start over.
    const free = SEATS.filter((s) => !TAKEN.has(s));
    let i = 0;
    stop = every(500, () => {
      const seat = free[(i * 7) % free.length]!;
      chart.dispatchAction({ type: 'geoToggleSelect', geoIndex: 0, name: seat });
      i++;
    });
  } else if (bar) {
    // geoselectchanged lists every selected region name of the geo.
    chart.on('geoselectchanged', (e) => {
      const all = (e as { allSelected: { name: string[] }[] }).allSelected[0]?.name ?? [];
      picked.clear();
      for (const n of all) picked.add(n);
      report();
    });
    button(bar, 'Clear selection', () => {
      for (const seat of [...picked]) chart.dispatchAction({ type: 'geoUnSelect', geoIndex: 0, name: seat });
      picked.clear();
      report();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
