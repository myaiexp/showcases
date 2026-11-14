// BrushingExtension and DataFilterExtension together on one layer
import { Deck } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { BrushingExtension, DataFilterExtension, type BrushingExtensionProps, type DataFilterExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { dots, EU_VIEW, KIND_COLORS, wanderPointer, type Dot } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Props = BrushingExtensionProps<Dot> & DataFilterExtensionProps<Dot>;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = dots(ctx.preview ? 600 : 1800);
  let range: [number, number] = [0, 60];

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<Dot, Props>({
      id: 'dots',
      data,
      getPosition: (d) => d.position,
      getRadius: 12000,
      radiusMinPixels: 3,
      getFillColor: (d) => [...KIND_COLORS[d.kind]!, 230],
      // DataFilterExtension: keep dots whose time is within filterRange
      getFilterValue: (d) => d.time,
      filterRange: range,
      // BrushingExtension: of those, show the ones near the pointer
      brushingRadius: ctx.preview ? 500_000 : 350_000,
      // Both extensions draw in the same pass: an object must pass both tests.
      extensions: [new DataFilterExtension({ filterSize: 1 }), new BrushingExtension()],
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: ctx.preview ? { ...EU_VIEW, zoom: 3.3 } : EU_VIEW,
    controller: !ctx.preview,
    layers: layers(),
  });

  const stops: (() => void)[] = [];
  if (ctx.preview) {
    stops.push(wanderPointer(stage));
    stops.push(
      animate((t) => {
        const lo = 50 * (0.5 + 0.5 * Math.sin(t * 0.7));
        range = [lo, lo + 40];
        deck.setProps({ layers: layers() });
      }),
    );
  } else {
    const bar = controlBar(el);
    slider(bar, 'filterRange min', 0, 100, 1, 0, (v) => {
      range = [v, Math.max(v, range[1])];
      deck.setProps({ layers: layers() });
    });
    slider(bar, 'filterRange max', 0, 100, 1, 60, (v) => {
      range = [Math.min(v, range[0]), v];
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    for (const s of stops) s();
    stage.release(deck);
  };
};

export default mount;
