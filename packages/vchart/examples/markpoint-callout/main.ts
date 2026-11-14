// markPoint callout: coordinate target, itemContent text, itemLine guide and targetSymbol
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, slider, every } from '../../shared/chart.ts';
import { walk } from '../../shared/components-data.ts';

const LINES = ['type-s', 'type-do', 'type-po', 'type-op', 'type-arc'] as const;
type LineType = (typeof LINES)[number];

const build = (lineType: LineType, offsetX: number, offsetY: number, seed: number): ISpec => {
  const rows = walk(14, seed);
  const peak = rows.reduce((a, b) => (b.y > a.y ? b : a));
  return {
    type: 'line',
    data: [{ id: 'line', values: rows }],
    xField: 'x',
    yField: 'y',
    axes: [{ orient: 'left', max: 110 }, { orient: 'bottom', label: { autoHide: true } }],
    markPoint: [
      {
        // coordinate picks a data point by its field values.
        coordinate: { x: peak.x, y: peak.y },
        itemContent: {
          type: 'text',
          position: 'top',
          offsetX,
          offsetY,
          confine: true,
          text: {
            text: `Peak ${peak.y}`,
            style: { fill: '#0f172a', fontWeight: 'bold' },
            labelBackground: { visible: true, padding: 5, style: { fill: '#fbbf24', cornerRadius: 4 } },
          },
        },
        itemLine: {
          type: lineType,
          line: { style: { stroke: '#fbbf24', lineWidth: 1.5 } },
          endSymbol: { visible: true, symbolType: 'circle', size: 6, style: { fill: '#fbbf24' } },
        },
        // The ring drawn on the data point itself.
        targetSymbol: { visible: true, size: 14, style: { fill: 'transparent', stroke: '#fbbf24', lineWidth: 2 } },
      },
    ],
  };
};

const mount: Mount = (el, ctx) => {
  let lineType: LineType = 'type-do';
  let offsetX = 30;
  let offsetY = -40;
  let seed = 8;
  const { vchart, release } = createChart(el, ctx, build(lineType, offsetX, offsetY, seed));
  let released = false;
  const apply = (): void => {
    if (!released) void vchart.updateSpec(build(lineType, offsetX, offsetY, seed));
  };

  let stop = (): void => {};
  if (ctx.preview) {
    // New data each tick: the callout follows whichever point is the peak.
    stop = every(2000, () => {
      seed += 1;
      lineType = LINES[seed % LINES.length] as LineType;
      apply();
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'itemLine.type', LINES, (v) => ((lineType = v as LineType), apply())).value = lineType;
    slider(bar, 'offsetX', [-120, 120, 5], offsetX, (v) => ((offsetX = v), apply()));
    slider(bar, 'offsetY', [-120, 60, 5], offsetY, (v) => ((offsetY = v), apply()));
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
