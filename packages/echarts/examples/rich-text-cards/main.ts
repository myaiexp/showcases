// Rich-text label cards: a title block, icon fragments, a horizontal rule and a table
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { ICONS, type Weather } from './icons.ts';

const CITIES = ['Helsinki', 'Jyväskylä', 'Oulu'];
const KINDS: Weather[] = ['sunny', 'cloudy', 'showers'];

interface Reading {
  weather: Weather;
  temp: number;
  wind: number;
}
const roll = (): Reading => ({
  weather: KINDS[Math.floor(Math.random() * KINDS.length)]!,
  temp: Math.round(-5 + Math.random() * 25),
  wind: Math.round(1 + Math.random() * 12),
});

/**
 * One label per city. `{style|text}` applies a rich style to a fragment; an empty
 * `{sunny|}` fragment shows only its background image. Fragments with the same `width`
 * in different lines line up as table columns.
 */
const card = (city: string, r: Reading): string =>
  [
    `{title|${city}}`,
    `  {${r.weather}|}{big|${r.temp}°}  `,
    '{hr|}',
    `  {key|Sky}{val|${r.weather}}  `,
    `  {key|Wind}{val|${r.wind} m/s}  `,
  ].join('\n');

const mount: Mount = (el, ctx) => {
  const { chart, dispose } = createChart(el, ctx);
  const scale = ctx.preview ? 0.9 : 1;
  const px = (n: number): number => Math.round(n * scale);

  // The 260px card has room for one card at a time, so the preview cycles cities.
  let shown = 0;
  const cities = (): string[] => (ctx.preview ? [CITIES[shown++ % CITIES.length]!] : CITIES);

  const render = (): void => {
    const list = cities();
    chart.setOption({
      xAxis: { show: false, min: -0.5, max: list.length - 0.5 },
      yAxis: { show: false, min: 0, max: 1 },
      grid: { left: 0, right: 0, top: 0, bottom: 0 },
      series: [
        {
          type: 'scatter',
          symbolSize: 1,
          data: list.map((city, i) => ({ value: [i, 0.5], label: { formatter: card(city, roll()) } })),
          label: {
            show: true,
            position: 'inside',
            // Left-aligned with a half-width offset: a centre-aligned block placed the
            // '100%' fragments off its own background box.
            align: 'left',
            offset: [-px(80), 0],
            // Text block styles: the card's own box. An explicit width gives the '100%'
            // fragments (title, rule) a box to fill; without it the block takes the width
            // of its longest line. No block padding: spaces pad the lines instead.
            width: px(160),
            backgroundColor: '#1e2533',
            borderColor: '#3a4559',
            borderWidth: 1,
            borderRadius: 6,
            color: '#d7dde8',
            fontSize: px(13),
            lineHeight: px(22),
            // Fragment styles, by name.
            rich: {
              title: {
                // width '100%' stretches the title block across the content box.
                width: '100%',
                height: px(28),
                backgroundColor: '#3b5fae',
                borderRadius: [6, 6, 0, 0],
                padding: [0, px(10)],
                color: '#fff',
                fontWeight: 'bold',
              },
              // Icons: an image background with only height set keeps its aspect ratio.
              ...Object.fromEntries(KINDS.map((k) => [k, { backgroundColor: { image: ICONS[k] }, height: px(34), align: 'left' }])),
              big: { fontSize: px(28), fontWeight: 'bold', padding: [0, 0, 0, px(8)], color: '#fff' },
              // A horizontal rule: a zero-height fragment with a border, 100% wide.
              hr: { borderColor: '#55607a', width: '100%', borderWidth: 0.5, height: 0 },
              key: { width: px(52), color: '#8a96ad' },
              val: { width: px(64), align: 'right' },
            },
          },
        },
      ],
    });
  };

  render();
  const stop = every(ctx.preview ? 2500 : 3500, render);

  return () => {
    stop();
    dispose();
  };
};

export default mount;
