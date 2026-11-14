// PathStyleExtension dash: getDashArray [dash, gap] in widths, pixels or meters
import { Deck } from '@deck.gl/core';
import { PathLayer } from '@deck.gl/layers';
import { PathStyleExtension, type DashUnits, type PathStyleExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { EU_VIEW, wigglyPaths } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Route = ReturnType<typeof wigglyPaths>[number];
const UNITS: readonly DashUnits[] = ['widths', 'pixels', 'meters'];
const DEFAULTS: Record<string, number> = { widths: 4, pixels: 14, meters: 40_000 };

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = wigglyPaths(ctx.preview ? 8 : 12);
  let dashUnits: DashUnits = 'widths';
  let dash = 4;
  let gap = 3;

  const layers = () => [
    landLayer(),
    new PathLayer<Route, PathStyleExtensionProps<Route>>({
      id: 'routes',
      data,
      getPath: (d) => d.path,
      getColor: [255, 170, 70],
      getWidth: 4,
      widthUnits: 'pixels',
      // [dash length, gap length] in dashUnits. With 'widths': multiples of half the width.
      getDashArray: [dash, gap],
      dashUnits,
      extensions: [new PathStyleExtension({ dash: true, dashMode: 'path' })],
      updateTriggers: { getDashArray: [dash, gap] },
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: ctx.preview ? { ...EU_VIEW, zoom: 3.3 } : EU_VIEW,
    controller: !ctx.preview,
    layers: layers(),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      dash = 2 + 4 * (0.5 + 0.5 * Math.sin(t * 0.9));
      gap = 2 + 3 * (0.5 + 0.5 * Math.cos(t * 0.7));
      deck.setProps({ layers: layers() });
    });
  } else {
    const bar = controlBar(el);
    const dashSlider = slider(bar, 'dash', 1, 20, 1, dash, (v) => {
      dash = v * (dashUnits === 'meters' ? 10_000 : 1);
      deck.setProps({ layers: layers() });
    });
    const gapSlider = slider(bar, 'gap', 1, 20, 1, gap, (v) => {
      gap = v * (dashUnits === 'meters' ? 10_000 : 1);
      deck.setProps({ layers: layers() });
    });
    select(bar, 'dashUnits', UNITS, (v) => {
      dashUnits = v;
      // Restart from a sensible dash for the unit; the sliders count in steps of it.
      const base = DEFAULTS[v]!;
      dash = base;
      gap = base * 0.75;
      const k = v === 'meters' ? 10_000 : 1;
      dashSlider.value = String(Math.round(dash / k));
      gapSlider.value = String(Math.max(1, Math.round(gap / k)));
      dashSlider.dispatchEvent(new Event('input'));
      gapSlider.dispatchEvent(new Event('input'));
    }, 'widths');
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
