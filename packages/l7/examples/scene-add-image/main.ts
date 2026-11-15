// addImage, hasImage and removeImage: scene-wide images that icon layers draw by id
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { cityFeatures } from '../../shared/data.ts';
import { icon } from '../../shared/images.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const IDS = ['pin', 'star', 'house'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 25], zoom: ctx.preview ? 0.6 : 1.4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  // Images are registered once on the scene; any point layer can then use the id as a shape.
  for (const id of IDS) await scene.addImage(id, icon(id));
  const features = cityFeatures();
  features.features.forEach((f, i) => Object.assign(f.properties, { kind: IDS[i % IDS.length] }));
  const icons = new PointLayer().source(features).shape('kind', [...IDS]).size(12);
  scene.addLayer(icons);

  const show = valuePanel(stage.container, 'br');
  const report = (): void => show(Object.fromEntries(IDS.map((id) => [`hasImage('${id}')`, String(scene.hasImage(id))])));
  report();
  // removeImage only empties the registry: icons the layer already drew keep their texture.
  const flip = async (id: (typeof IDS)[number]): Promise<void> => {
    if (scene.hasImage(id)) scene.removeImage(id);
    else await scene.addImage(id, icon(id));
    scene.render();
    report();
  };

  if (stage.bar) for (const id of IDS) button(stage.bar, `toggle '${id}'`, () => void flip(id));
  if (stage.preview) stage.every(1500, (i) => void flip(IDS[i % IDS.length]!));

  return () => stage.dispose();
};

export default mount;
