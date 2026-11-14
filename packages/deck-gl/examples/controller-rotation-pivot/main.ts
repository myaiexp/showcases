// MapController rotationPivot and TerrainController: rotate around a pivot
import { Deck, MapController, TerrainController } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { blocks, HOME, type Block } from '../../shared/core-layers-geometry.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';

const CHOICES = ['MapController: center', 'MapController: 2d', 'MapController: 3d', 'TerrainController'] as const;
type Choice = (typeof CHOICES)[number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#14202f' });
  const home: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: ctx.preview ? 13.3 : 14.4, pitch: 55, bearing: 20 };
  const info = ctx.preview ? overlay(stage.box, 'rotate around the picked building', 'bottom') : readout(el, 'Right-drag or shift-drag to rotate; where you start the drag is the pivot for 2d and 3d.');

  const controller = (c: Choice) =>
    c === 'TerrainController'
      ? { type: TerrainController }
      : { type: MapController, rotationPivot: c.split(': ')[1] as 'center' | '2d' | '3d' };

  const deck = new Deck({
    device: stage.device,
    initialViewState: home,
    controller: ctx.preview ? false : controller('MapController: 3d'),
    layers: [
      new PolygonLayer<Block>({
        id: 'blocks',
        data: blocks(8, 8, { cell: 0.0016 }),
        getPolygon: (d) => d.polygon,
        extruded: true,
        getElevation: (d) => d.height * 0.5,
        getFillColor: (d) => [90 + d.value * 120, 110 + d.value * 70, 150 + d.value * 60],
        // '3d' picking lets the controller read the height of what is under the pointer.
        pickable: '3d',
        autoHighlight: !ctx.preview,
        highlightColor: [255, 190, 90, 220],
        material: { ambient: 0.45, diffuse: 0.7, shininess: 20 },
      }),
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) stop = animate((t) => deck.setProps({ viewState: { ...home, bearing: 20 + t * 14, pitch: 55 } }));
  else select(controlBar(el), 'controller', CHOICES, (c) => deck.setProps({ controller: controller(c) }), 'MapController: 3d');
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
