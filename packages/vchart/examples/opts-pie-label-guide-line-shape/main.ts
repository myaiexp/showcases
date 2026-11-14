// Pie label guide lines: customShape draws the connector itself; spaceWidth sets the gap to the text
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const ROWS = [
  { k: 'Search', v: 38 }, { k: 'Social', v: 22 }, { k: 'Direct', v: 18 }, { k: 'Email', v: 12 }, { k: 'Referral', v: 10 },
];
const SHAPES = ['default', 'straight', 'curve'];

type Attrs = { points?: { x: number; y: number }[] };
interface Path { moveTo(x: number, y: number): void; lineTo(x: number, y: number): void; quadraticCurveTo(cx: number, cy: number, x: number, y: number): void }

interface S { shape: string; space: number }

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { shape: 'curve', space: 5 },
    previewMs: 1500,
    step: (s, i) => ({ shape: SHAPES[i % 3] as string, space: [5, 18][i % 2] as number }),
    build: (s, preview) =>
      ({
        type: 'pie',
        data: [{ id: 'd', values: ROWS }],
        categoryField: 'k',
        valueField: 'v',
        outerRadius: 0.7,
        innerRadius: 0.35,
        legends: { visible: false },
        label: {
          visible: true,
          position: 'outside',
          spaceWidth: s.space,
          layoutArcGap: 8,
          style: { fontSize: preview ? 10 : 13 },
          line: {
            visible: true,
            style: { stroke: '#fbbf24', lineWidth: 1.5 },
            // customShape returns the path to stroke instead of the default polyline (pie.md § line.customShape).
            ...(s.shape === 'default'
              ? {}
              : {
                  customShape: (_mark: unknown, attrs: Attrs, path: Path) => {
                    const pts = attrs.points ?? [];
                    const a = pts[0];
                    const b = pts[pts.length - 1];
                    if (!a || !b) return path;
                    path.moveTo(a.x, a.y);
                    if (s.shape === 'straight') path.lineTo(b.x, b.y);
                    else path.quadraticCurveTo(a.x, b.y, b.x, b.y);
                    return path;
                  },
                }),
          },
        },
      }) as never,
    controls: (bar, live) => {
      select(bar, 'line.customShape', SHAPES, (v) => live.set({ shape: v })).value = 'curve';
      slider(bar, 'spaceWidth', [0, 30, 1], live.state.space, (v) => live.set({ space: v }));
    },
  });

export default mount;
