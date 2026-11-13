// A labelLayout callback that moves pie labels to the chart's left and right edges and re-aims the guide lines
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { UNEVEN } from '../../shared/pie-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const look = { layout: 'edge columns', margin: 12 };
  const apply = (): void => {
    const width = chart.getWidth();
    chart.setOption(
      {
        series: [
          {
            type: 'pie',
            radius: ctx.preview ? '55%' : '60%',
            center: ['50%', ctx.preview ? '50%' : '46%'],
            label: { position: 'outside', formatter: '{b}  {d}%', fontSize: ctx.preview ? 10 : 12 },
            labelLine: { length: 10, length2: 10 },
            // The callback gets each label's rectangle, the sector's rectangle and the default guide line points.
            // Returning x/y/align moves the text; labelLinePoints re-routes the line to where the text now is.
            labelLayout:
              look.layout === 'default'
                ? undefined
                : look.layout === 'shift apart'
                  ? { moveOverlap: 'shiftY' } // fixed option form: push overlapping labels apart vertically
                  : (p: {
                      labelRect: { x: number; y: number; width: number; height: number };
                      rect: { x: number; y: number; width: number; height: number };
                      labelLinePoints?: number[][];
                    }) => {
                      const left = p.labelRect.x < width / 2;
                      const points = p.labelLinePoints!;
                      // Third point is the end of the line: next to the text's inner side.
                      points[2]![0] = left ? look.margin + p.labelRect.width : width - look.margin - p.labelRect.width;
                      return {
                        x: left ? look.margin : width - look.margin,
                        y: p.labelRect.y + p.labelRect.height / 2,
                        verticalAlign: 'middle',
                        align: left ? 'left' : 'right',
                        labelLinePoints: points,
                      };
                    },
            data: UNEVEN,
          },
        ],
      },
      true,
    );
  };
  apply();

  let stop = (): void => {};
  if (ctx.preview) {
    const modes = ['edge columns', 'default', 'shift apart'];
    let n = 0;
    stop = every(1800, () => {
      n += 1;
      look.layout = modes[n % modes.length]!;
      apply();
    });
  } else {
    select(bar!, 'labelLayout', ['edge columns', 'shift apart', 'default'], (v) => { look.layout = v; apply(); });
    slider(bar!, 'edge margin', [0, 80, 2], look.margin, (v) => { look.margin = v; apply(); });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
