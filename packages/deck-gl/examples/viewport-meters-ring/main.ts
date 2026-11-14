// addMetersToLngLat(): a ring of points one radius away, against deck's own circle
import { Deck, WebMercatorViewport } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { city, type LngLat } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const CENTRE = city('Helsinki').coordinates;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const zoom = ctx.preview ? 5.2 : 6.2;
  const info = ctx.preview ? null : readout(el);
  // The viewport only supplies the local scale: any size will do.
  const viewport = new WebMercatorViewport({ width: 600, height: 400, longitude: CENTRE[0], latitude: CENTRE[1], zoom });

  const layers = (km: number) => {
    const ring: LngLat[] = Array.from({ length: 48 }, (_, i) => {
      const a = (i / 48) * Math.PI * 2;
      // Metres east and north of the centre, converted with a linear approximation.
      const [lng, lat] = viewport.addMetersToLngLat(CENTRE, [Math.cos(a) * km * 1000, Math.sin(a) * km * 1000]);
      return [lng!, lat!];
    });
    if (info) {
      const scales = viewport.getDistanceScales();
      info.textContent = `${km} km ring from addMetersToLngLat (dots) vs a ${km} km circle in metres (outline)   unitsPerMeter[0] ${scales.unitsPerMeter[0]!.toExponential(2)}`;
    }
    return [
      landLayer(),
      new ScatterplotLayer<{ at: LngLat }>({
        id: 'circle',
        data: [{ at: CENTRE }],
        getPosition: (d) => d.at,
        getRadius: km * 1000,
        radiusUnits: 'meters',
        filled: false,
        stroked: true,
        getLineColor: [110, 170, 255],
        lineWidthUnits: 'pixels',
        getLineWidth: 2,
      }),
      new ScatterplotLayer<LngLat>({ id: 'ring', data: ring, getPosition: (d) => d, getRadius: 4, radiusUnits: 'pixels', getFillColor: [255, 170, 70] }),
    ];
  };

  const deck = new Deck({
    device: stage.device,
    initialViewState: { longitude: CENTRE[0], latitude: CENTRE[1], zoom },
    controller: !ctx.preview,
    layers: layers(ctx.preview ? 200 : 300),
  });

  let stop = (): void => {};
  if (ctx.preview) stop = animate((t) => deck.setProps({ layers: layers(Math.round(120 + (Math.sin(t) + 1) * 80)) }));
  else slider(controlBar(el), 'radius (km)', 10, 600, 10, 300, (km) => deck.setProps({ layers: layers(km) }));
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
