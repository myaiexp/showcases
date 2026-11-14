// BrushingExtension: points show only within a radius of the pointer
import { Deck } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { BrushingExtension, type BrushingExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { dots, EU_VIEW, movePointer, wander, type Dot } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = dots(ctx.preview ? 500 : 1500);
  let brushingRadius = ctx.preview ? 450_000 : 300_000;
  let brushingEnabled = true;

  const layers = () => [
    landLayer(),
    // The same points, dim, so you can see what brushing hides.
    new ScatterplotLayer<Dot>({
      id: 'ghosts',
      data,
      getPosition: (d) => d.position,
      getRadius: 9000,
      radiusMinPixels: 2,
      getFillColor: [130, 150, 180, 110],
    }),
    new ScatterplotLayer<Dot, BrushingExtensionProps<Dot>>({
      id: 'brushed',
      data,
      getPosition: (d) => d.position,
      getRadius: 14000,
      radiusMinPixels: 3,
      getFillColor: [255, 170, 70, 230],
      // props added by BrushingExtension: only objects within the radius of the pointer draw
      brushingEnabled,
      brushingRadius, // meters
      extensions: [new BrushingExtension()],
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: ctx.preview ? { ...EU_VIEW, zoom: 3.3 } : EU_VIEW, controller: !ctx.preview, layers: layers() });

  let stop = (): void => {};
  if (ctx.preview) {
    // No pointer in a card: dispatch pointer events so the brush wanders over the map.
    stop = animate((t) => {
      const [x, y] = wander(t, stage.box.clientWidth, stage.box.clientHeight);
      movePointer(stage.canvas, x, y);
    });
  } else {
    const bar = controlBar(el);
    slider(bar, 'brushingRadius (km)', 50, 1000, 10, 300, (v) => {
      brushingRadius = v * 1000;
      deck.setProps({ layers: layers() });
    });
    check(bar, 'brushingEnabled', true, (v) => {
      brushingEnabled = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
