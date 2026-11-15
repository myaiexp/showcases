// The context option: WebGL attributes (alpha, antialias) over stripes
import createGlobe, { type Arc, type Globe } from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['default', 'alpha: false', 'antialias: false'],
    hint: 'Context attributes are fixed when the canvas gets its context, so a change recreates the globe on a fresh canvas.',
  });
  const [a, b, c] = stage.panes as [(typeof stage.panes)[0], (typeof stage.panes)[0], (typeof stage.panes)[0]];
  for (const p of stage.panes) {
    p.layer.style.background = 'repeating-linear-gradient(45deg, #3a3a44 0 8px, #1a1a1e 8px 16px)';
  }

  const arcs: Arc[] = [
    { from: [37.78, -122.44], to: [40.71, -74.01] },
    { from: [51.51, -0.13], to: [35.68, 139.65] },
  ];
  // Written once per pane; only `context` differs.
  const make = (pane: typeof a, context: WebGLContextAttributes): Globe =>
    stage.own(
      createGlobe(pane.canvas, {
        devicePixelRatio: stage.dpr,
        width: pane.width,
        height: pane.height,
        phi: 0,
        theta: 0.25,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [1, 0.5, 0.2],
        glowColor: [0.25, 0.25, 0.3],
        markers: [
          { location: [37.78, -122.44], size: 0.05 },
          { location: [35.68, 139.65], size: 0.05 },
        ],
        arcs,
        arcColor: [0.3, 0.6, 1],
        arcWidth: 1,
        arcHeight: 0.3,
        context, // WebGLContextAttributes: cobe's defaults are alpha true, antialias true
      }),
      pane,
    );

  const g1 = make(a, {});
  const g2 = make(b, { alpha: false });
  let g3 = make(c, { antialias: false });

  let phi = 0;
  stage.loop(() => {
    phi += 0.005;
    for (const g of [g1, g2, g3]) g.update({ phi, arcs });
  });

  if (stage.bar) {
    const describe = (o: Record<string, boolean>): string =>
      Object.entries(o)
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');
    const ctl = { alpha: true, antialias: false, premultipliedAlpha: true };
    const recreate = (): void => {
      stage.release(g3); // swaps in a fresh canvas: read c.canvas again afterwards
      g3 = make(c, { ...ctl });
      c.caption!.textContent = describe(ctl);
    };
    checkbox(stage.bar, 'alpha', ctl.alpha, (v) => {
      ctl.alpha = v;
      recreate();
    });
    checkbox(stage.bar, 'antialias', ctl.antialias, (v) => {
      ctl.antialias = v;
      recreate();
    });
    checkbox(stage.bar, 'premultipliedAlpha', ctl.premultipliedAlpha, (v) => {
      ctl.premultipliedAlpha = v;
      recreate();
    });
    c.caption!.textContent = describe(ctl);
  }

  return stage.dispose;
};

export default mount;
