// SimpleMeshLayer with a luma.gl Geometry as its mesh
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { SimpleMeshLayer } from '@deck.gl/mesh-layers';
import { ConeGeometry, CubeGeometry, CylinderGeometry, IcoSphereGeometry, SphereGeometry } from '@luma.gl/engine';
import type { Geometry } from '@luma.gl/engine';
import type { Mount } from '@/types.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { sites, type Site } from '../../shared/mesh-layers-assets.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const SHAPES = ['cube', 'sphere', 'ico sphere', 'cone', 'cylinder'] as const;
type Shape = (typeof SHAPES)[number];

// Each shape is a luma.gl Geometry; the layer reads its POSITION, NORMAL and TEXCOORD_0.
const GEOMETRIES: Record<Shape, () => Geometry> = {
  cube: () => new CubeGeometry(),
  sphere: () => new SphereGeometry({ radius: 0.5, nlat: 14, nlong: 20 }),
  'ico sphere': () => new IcoSphereGeometry({ iterations: 2 }),
  cone: () => new ConeGeometry({ radius: 0.5, height: 1.2 }),
  cylinder: () => new CylinderGeometry({ radius: 0.5, height: 1.2 }),
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 50, zoom: ctx.preview ? 2.6 : 3.6, pitch: 50 };
  const data = sites(ctx.preview ? 12 : 26, 11);
  let shape: Shape = 'cube';
  let sizeScale = ctx.preview ? 260000 : 200000;

  const render = (): void => {
    deck.setProps({
      layers: [
        landLayer(),
        new SimpleMeshLayer<Site>({
          id: 'shapes',
          data,
          mesh: GEOMETRIES[shape](),
          getPosition: (d) => d.position,
          getColor: (d) => [255 - d.height * 90, 120 + d.height * 60, 90, 255],
          getOrientation: (d) => [0, d.heading, 0],
          sizeScale,
        }),
      ],
    });
  };

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [] });
  render();

  let timer = 0;
  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => {
      shape = SHAPES[++i % SHAPES.length]!;
      render();
    }, 1400);
    stop = animate((t) => deck.setProps({ viewState: { ...view, bearing: t * 10 } }));
  } else {
    const bar = controlBar(el);
    select(bar, 'geometry', SHAPES, (v) => {
      shape = v;
      render();
    }, shape);
    slider(bar, 'sizeScale', 50000, 400000, 10000, sizeScale, (v) => {
      sizeScale = v;
      render();
    });
  }

  return () => {
    window.clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
