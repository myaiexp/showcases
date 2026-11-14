// DataFilterExtension: show only the dots whose value falls inside filterRange
import { Deck } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { DataFilterExtension, type DataFilterExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { dots, EU_VIEW, type Dot } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = dots(ctx.preview ? 800 : 3000);
  let filterRange: [number, number] = [20, 50];
  let filterEnabled = true;

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<Dot, DataFilterExtensionProps<Dot>>({
      id: 'dots',
      data,
      getPosition: (d) => d.position,
      getRadius: 9000,
      radiusMinPixels: 2.5,
      // Colour by the same number we filter on, so the window is visible
      getFillColor: (d) => [60 + d.time * 1.9, 160 - d.time, 255 - d.time * 1.5, 230],
      // The number each object is filtered by (uploaded once, as a 32-bit float)
      getFilterValue: (d) => d.time,
      // Objects inside [min, max] draw. Changing this is nearly free: no attribute is rebuilt.
      filterRange,
      filterEnabled,
      extensions: [new DataFilterExtension({ filterSize: 1 })],
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
      const lo = 60 * (0.5 + 0.5 * Math.sin(t * 0.8));
      filterRange = [lo, lo + 30];
      deck.setProps({ layers: layers() });
    });
  } else {
    const bar = controlBar(el);
    slider(bar, 'filterRange min', 0, 100, 1, 20, (v) => {
      filterRange = [v, Math.max(v, filterRange[1])];
      deck.setProps({ layers: layers() });
    });
    slider(bar, 'filterRange max', 0, 100, 1, 50, (v) => {
      filterRange = [Math.min(v, filterRange[0]), v];
      deck.setProps({ layers: layers() });
    });
    check(bar, 'filterEnabled', true, (v) => {
      filterEnabled = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
