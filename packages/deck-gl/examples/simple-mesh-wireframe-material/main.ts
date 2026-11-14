// SimpleMeshLayer wireframe and material lighting
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { SimpleMeshLayer } from '@deck.gl/mesh-layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, select } from '../../shared/controls.ts';
import { crystalMesh, sites, type Site } from '../../shared/mesh-layers-assets.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type MaterialProps = { ambient: number; diffuse: number; shininess: number; specularColor: [number, number, number] };
const MATERIAL_NAMES = ['default', 'matte', 'glossy', 'flat lit'] as const;
type MaterialName = (typeof MATERIAL_NAMES)[number];
const MATERIALS: Record<MaterialName, true | MaterialProps> = {
  default: true,
  matte: { ambient: 0.6, diffuse: 0.5, shininess: 4, specularColor: [0, 0, 0] },
  glossy: { ambient: 0.2, diffuse: 0.7, shininess: 120, specularColor: [1, 1, 1] },
  'flat lit': { ambient: 1, diffuse: 0, shininess: 1, specularColor: [0, 0, 0] },
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 50, zoom: ctx.preview ? 2.6 : 3.6, pitch: 55 };
  const data = sites(ctx.preview ? 10 : 20, 14);
  const mesh = crystalMesh(7, 1.5);
  let wireframe = false;
  let material: MaterialName = 'glossy';

  const render = (): void => {
    deck.setProps({
      layers: [
        landLayer(),
        new SimpleMeshLayer<Site>({
          id: 'lit',
          data,
          mesh,
          getPosition: (d) => d.position,
          getColor: [255, 190, 110, 255],
          getOrientation: (d) => [0, d.heading, 0],
          // Ambient, diffuse, shininess and specularColor, as the lighting guide lists them.
          material: MATERIALS[material],
          wireframe,
          sizeScale: ctx.preview ? 170000 : 125000,
        }),
      ],
    });
  };

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [] });
  render();

  let timer = 0;
  let stop = (): void => {};
  if (ctx.preview) {
    // Cycle wireframe on and off and step through the materials.
    const names = MATERIAL_NAMES;
    let i = 0;
    timer = window.setInterval(() => {
      i++;
      wireframe = i % 4 === 3;
      material = names[i % names.length]!;
      render();
    }, 1300);
    stop = animate((t) => deck.setProps({ viewState: { ...view, bearing: t * 14 } }));
  } else {
    const bar = controlBar(el);
    check(bar, 'wireframe', wireframe, (v) => {
      wireframe = v;
      render();
    });
    select(bar, 'material', MATERIAL_NAMES, (v) => {
      material = v;
      render();
    }, material);
  }

  return () => {
    window.clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
