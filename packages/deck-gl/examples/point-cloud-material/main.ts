// PointCloudLayer material: ambient, diffuse, shininess and specular colour of the lit points
import { COORDINATE_SYSTEM, Deck, OrbitView } from '@deck.gl/core';
import { PointCloudLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { sphereCloud, type CloudPoint } from '../../shared/core-layers-geometry.ts';
import { animate, createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0d1117' });
  const zoom = ctx.preview ? -0.4 : 0.6;
  const viewState = (rotationOrbit: number) => ({ target: [0, 0, 0] as [number, number, number], rotationX: 25, rotationOrbit, zoom });
  const data = sphereCloud(ctx.preview ? 2500 : 8000);
  const material = { ambient: 0.35, diffuse: 0.6, shininess: 32, specularColor: [0.15, 0.15, 0.15] as [number, number, number] };

  const build = (): PointCloudLayer<CloudPoint> =>
    new PointCloudLayer<CloudPoint>({
      id: 'cloud',
      data,
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      getPosition: (d) => d.position,
      getNormal: (d) => d.normal,
      getColor: [90, 150, 230],
      pointSize: 5,
      material: { ...material },
    });
  const update = (): void => deck.setProps({ layers: [build()] });
  const deck = new Deck({
    device: stage.device,
    views: new OrbitView({ orbitAxis: 'Y' }),
    initialViewState: viewState(0),
    controller: !ctx.preview,
    layers: [build()],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    // Sweep the shininess and the specular colour so the highlights visibly change.
    stop = animate((t) => {
      const s = 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(t * 1.3));
      material.specularColor = [s, s, s];
      material.shininess = 8 + 90 * s;
      deck.setProps({ viewState: viewState(t * 20), layers: [build()] });
    });
  } else {
    const bar = controlBar(el);
    slider(bar, 'ambient', 0, 1, 0.05, 0.35, (v) => { material.ambient = v; update(); });
    slider(bar, 'diffuse', 0, 1, 0.05, 0.6, (v) => { material.diffuse = v; update(); });
    slider(bar, 'shininess', 1, 128, 1, 32, (v) => { material.shininess = v; update(); });
    slider(bar, 'specular', 0, 1, 0.05, 0.15, (v) => { material.specularColor = [v, v, v]; update(); });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
