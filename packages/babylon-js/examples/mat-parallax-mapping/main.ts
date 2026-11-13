// Normal mapping, parallax and parallax occlusion on a brick wall made in code
import {
  ArcRotateCamera,
  MeshBuilder,
  PointLight,
  StandardMaterial,
  Texture,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';
import { brickColor, brickNormalHeight } from './bricks.ts';

const MODES = ['flat', 'normal map', 'parallax', 'parallax occlusion'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.3, 6, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  const light = new PointLight('lamp', new Vector3(0, 1, -3), scene);

  const wall = MeshBuilder.CreatePlane('wall', { size: 5 }, scene);
  const mat = new StandardMaterial('bricks', scene);
  const diffuse = new Texture(brickColor(), scene);
  const bump = new Texture(brickNormalHeight(), scene);
  for (const t of [diffuse, bump]) t.uScale = t.vScale = 2;
  mat.diffuseTexture = diffuse;
  mat.specularPower = 64;
  wall.material = mat;

  // Parallax extends normal mapping: it needs a bumpTexture, and reads height from its alpha.
  const apply = (mode: (typeof MODES)[number]): void => {
    mat.bumpTexture = mode === 'flat' ? null : bump;
    mat.useParallax = mode === 'parallax' || mode === 'parallax occlusion';
    mat.useParallaxOcclusion = mode === 'parallax occlusion';
  };
  apply('parallax occlusion');
  mat.parallaxScaleBias = 0.08;

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('mode', MODES, 'parallax occlusion', apply);
    panel.slider('parallaxScaleBias', 0, 0.2, 0.005, mat.parallaxScaleBias, (v) => (mat.parallaxScaleBias = v));
  }

  let t = 0;
  let step = 0;
  stage.run(() => {
    // A moving lamp shows off the relief; the card also cycles the four modes.
    t += 0.015;
    light.position.set(Math.sin(t) * 2.5, Math.cos(t * 0.7) * 1.5, -2.5);
    camera.alpha = -Math.PI / 2 + Math.sin(t * 0.5) * 0.5;
    if (ctx.preview && ++step % 150 === 0) apply(MODES[(step / 150) % MODES.length]!);
  });

  return () => stage.dispose();
};

export default mount;
