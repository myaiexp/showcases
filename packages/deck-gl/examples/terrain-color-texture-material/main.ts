// TerrainLayer surface: a texture, or a flat colour, lit by material
import { Deck } from '@deck.gl/core';
import type { Color, MapViewState } from '@deck.gl/core';
import { TerrainLayer } from '@deck.gl/geo-layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, select } from '../../shared/controls.ts';
import { heightImage, MAPBOX_DECODER, surfaceImage, TERRAIN_BOUNDS, TERRAIN_CENTER } from '../../shared/geo-layers-art.ts';
import { terrainLoadOptions } from '../../shared/geo-layers-terrain.ts';
import { animate, createStage } from '../../shared/stage.ts';

const COLORS: Record<string, Color> = {
  white: [255, 255, 255],
  sand: [222, 196, 140],
  'sea blue': [90, 170, 230],
  rose: [240, 130, 160],
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: TERRAIN_CENTER[0] - 0.03, latitude: TERRAIN_CENTER[1] - 0.03, zoom: ctx.preview ? 8.4 : 9.4, pitch: 62, bearing: 100 };
  const elevationData = heightImage(256, MAPBOX_DECODER);
  const surface = surfaceImage(512);

  const terrain = (useTexture: boolean, color: Color, lit: boolean): TerrainLayer =>
    new TerrainLayer({
      id: 'terrain',
      elevationData,
      // With no texture the mesh is drawn in `color`.
      texture: useTexture ? surface : null,
      color,
      // true is the default lighting; false draws unlit colour.
      material: lit,
      elevationDecoder: MAPBOX_DECODER,
      bounds: TERRAIN_BOUNDS,
      meshMaxError: 8,
      loadOptions: terrainLoadOptions,
    });
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [terrain(true, COLORS.white!, true)] });

  let timer = 0;
  const stop = ctx.preview ? animate((t) => deck.setProps({ viewState: { ...view, bearing: 100 + t * 8 } })) : () => {};
  if (ctx.preview) {
    let i = 0;
    const states: [boolean, string, boolean][] = [[true, 'white', true], [false, 'sand', true], [false, 'sea blue', true], [false, 'rose', false]];
    timer = window.setInterval(() => {
      const [t, c, l] = states[++i % states.length]!;
      deck.setProps({ layers: [terrain(t, COLORS[c]!, l)] });
    }, 2200);
  } else {
    let [useTexture, color, lit] = [true, 'white', true];
    const refresh = (): void => deck.setProps({ layers: [terrain(useTexture, COLORS[color]!, lit)] });
    const bar = controlBar(el);
    check(bar, 'texture', useTexture, (v) => ((useTexture = v), refresh()));
    select(bar, 'color (no texture)', Object.keys(COLORS), (v) => ((color = v), refresh()), color);
    check(bar, 'material (lighting)', lit, (v) => ((lit = v), refresh()));
  }
  return () => {
    clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
