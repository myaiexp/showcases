// DataFilterExtension filterSoftRange: dots fade in and out instead of popping
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
  const data = dots(ctx.preview ? 800 : 2500);
  let soft: [number, number] = [40, 60];
  let filterTransformSize = true;
  let filterTransformColor = true;

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<Dot, DataFilterExtensionProps<Dot>>({
      id: 'dots',
      data,
      getPosition: (d) => d.position,
      getRadius: 16000,
      radiusMinPixels: 3,
      getFillColor: [255, 170, 70, 255],
      getFilterValue: (d) => d.time,
      // Hidden outside filterRange; between filterRange and filterSoftRange: faded
      filterRange: [10, 90],
      filterSoftRange: soft,
      filterTransformSize,
      filterTransformColor,
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
      const mid = 50 + 25 * Math.sin(t * 0.8);
      soft = [mid - 10, mid + 10];
      deck.setProps({ layers: layers() });
    });
  } else {
    const bar = controlBar(el);
    slider(bar, 'filterSoftRange min', 10, 90, 1, soft[0], (v) => {
      soft = [Math.min(v, soft[1]), soft[1]];
      deck.setProps({ layers: layers() });
    });
    slider(bar, 'max', 10, 90, 1, soft[1], (v) => {
      soft = [soft[0], Math.max(v, soft[0])];
      deck.setProps({ layers: layers() });
    });
    check(bar, 'filterTransformSize', true, (v) => {
      filterTransformSize = v;
      deck.setProps({ layers: layers() });
    });
    check(bar, 'filterTransformColor', true, (v) => {
      filterTransformColor = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
