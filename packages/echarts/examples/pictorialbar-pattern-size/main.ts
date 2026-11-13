// pictorialBar pattern fill: a canvas tile as the symbol's colour, with symbolPatternSize setting the tile size
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const cats = ['Q1', 'Q2', 'Q3', 'Q4'];
const SYMBOLS: Record<string, string> = {
  rect: 'rect',
  'rounded rect': 'roundRect',
  triangle: 'triangle',
};

/** A small stripes-and-dots tile drawn on a canvas; the option docs accept an HTMLCanvasElement as the pattern image. */
function makeTile(): HTMLCanvasElement {
  const tile = document.createElement('canvas');
  tile.width = 40;
  tile.height = 40;
  const g = tile.getContext('2d')!;
  g.fillStyle = '#1f6f8b';
  g.fillRect(0, 0, 40, 40);
  g.strokeStyle = '#99e2b4';
  g.lineWidth = 6;
  g.beginPath();
  g.moveTo(-5, 45);
  g.lineTo(45, -5);
  g.stroke();
  g.fillStyle = '#fff';
  g.beginPath();
  g.arc(10, 10, 4, 0, Math.PI * 2);
  g.fill();
  return tile;
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const tile = makeTile();
  let patternSize = 40;
  let symbol = 'rect';

  const apply = (): void => {
    chart.setOption(
      {
        grid: { top: 16, left: 36, right: 16, bottom: 28 },
        xAxis: { type: 'category', data: cats },
        yAxis: { type: 'value', max: 100 },
        series: {
          type: 'pictorialBar',
          data: [62, 85, 48, 94],
          symbol,
          symbolSize: ['70%', '100%'],
          // symbolPatternSize: the on-screen size of one pattern tile, in pixels.
          symbolPatternSize: patternSize,
          // The symbol's colour is a pattern: an image (here a canvas) and how it tiles.
          itemStyle: { color: { image: tile, repeat: 'repeat' } },
        },
      },
      true,
    );
  };
  apply();

  let stop = (): void => {};
  if (bar) {
    slider(bar, 'symbolPatternSize', [10, 160, 5], patternSize, (v) => {
      patternSize = v;
      apply();
    });
    select(bar, 'symbol', Object.keys(SYMBOLS), (v) => {
      symbol = SYMBOLS[v]!;
      apply();
    });
  } else {
    const sizes = [40, 20, 80, 12];
    let i = 0;
    stop = every(1500, () => {
      patternSize = sizes[++i % sizes.length]!;
      apply();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
