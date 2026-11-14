// DataFilterExtension countItems: onFilteredItemsChange reports how many objects pass
import { Deck } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { DataFilterExtension, type DataFilterExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { dots, EU_VIEW, type Dot } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = dots(ctx.preview ? 800 : 3000);
  let filterRange: [number, number] = [30, 60];
  let count = '';
  let shown: HTMLElement | null = null;

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<Dot, DataFilterExtensionProps<Dot>>({
      id: 'dots',
      data,
      getPosition: (d) => d.position,
      getRadius: 9000,
      radiusMinPixels: 2.5,
      getFillColor: (d) => [60 + d.time * 1.9, 160 - d.time, 255 - d.time * 1.5, 230],
      getFilterValue: (d) => d.time,
      filterRange,
      // Called whenever the filter changes (only because countItems is on)
      onFilteredItemsChange: ({ id, count: n }) => {
        count = `${id}: ${n} of ${data.length} dots pass the filter`;
        if (shown) shown.textContent = count;
      },
      extensions: [new DataFilterExtension({ filterSize: 1, countItems: true })],
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
      const lo = 70 * (0.5 + 0.5 * Math.sin(t * 0.8));
      filterRange = [lo, lo + 25];
      deck.setProps({ layers: layers() });
    });
  } else {
    const bar = controlBar(el);
    shown = readout(el, 'counting...');
    slider(bar, 'filterRange min', 0, 100, 1, 30, (v) => {
      filterRange = [v, Math.max(v, filterRange[1])];
      deck.setProps({ layers: layers() });
    });
    slider(bar, 'max', 0, 100, 1, 60, (v) => {
      filterRange = [Math.min(v, filterRange[0]), v];
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    shown = null;
    stage.release(deck);
  };
};

export default mount;
