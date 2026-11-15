// Four funnelarea traces in a 2x2 grid; scalegroup keeps each pair on one scale
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const p = stage.preview;
  const title = (text: string, position: 'top center' | 'top left') => (p ? undefined : { position, text });

  const data = [
    { type: 'funnelarea' as const, scalegroup: 'first', values: [500, 450, 340, 230, 220, 110], textinfo: 'value', title: title('Sales for Sale Person A in U.S.', 'top center'), domain: { x: [0, 0.5] as [number, number], y: [0, 0.5] as [number, number] } },
    { type: 'funnelarea' as const, scalegroup: 'first', values: [600, 500, 400, 300, 200, 100], textinfo: 'value', title: title('Sales of Sale Person B in Canada', 'top center'), domain: { x: [0, 0.5] as [number, number], y: [0.55, 1] as [number, number] } },
    { type: 'funnelarea' as const, scalegroup: 'second', values: [510, 480, 440, 330, 220, 100], textinfo: 'value', title: title('Sales of Sale Person A in Canada', 'top left'), domain: { x: [0.55, 1] as [number, number], y: [0, 0.5] as [number, number] } },
    { type: 'funnelarea' as const, scalegroup: 'second', values: [360, 250, 240, 130, 120, 60], textinfo: 'value', title: title('Sales of Sale Person B in U.S.', 'top left'), domain: { x: [0.55, 1] as [number, number], y: [0.55, 1] as [number, number] } },
  ];

  await Plotly.newPlot(
    stage.div,
    data,
    {
      template: stage.template,
      margin: p ? { l: 4, r: 4, t: 4, b: 4 } : undefined,
      showlegend: false,
      shapes: [
        { x0: 0, x1: 0.5, y0: 0, y1: 0.5 },
        { x0: 0, x1: 0.5, y0: 0.55, y1: 1 },
        { x0: 0.55, x1: 1, y0: 0, y1: 0.5 },
        { x0: 0.55, x1: 1, y0: 0.55, y1: 1 },
      ].map((s) => ({ ...s, type: 'rect' as const, xref: 'paper' as const, yref: 'paper' as const, line: { color: 'rgba(160,170,190,0.4)', width: 1 } })),
    },
    stage.config,
  );

  // Cards: every pair's values drift, so scalegroup visibly keeps the pair on one scale.
  if (stage.preview) {
    stage.every(600, (i) => {
      const k = 1 + 0.5 * Math.sin(i / 5);
      void Plotly.restyle(stage.div, { values: data.map((d, j) => d.values.map((v) => (j % 2 === 0 ? v * k : v))) });
    });
  }

  return () => stage.dispose();
};

export default mount;
