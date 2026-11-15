// Scepter head: a two-tone stone with a metal rim, shaped by per-axis factors
import * as THREE from 'three/webgpu';
import { scepterHead } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range, rgb } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  // The docs' parameters with their documented ranges (seed and any range the docs omit are my pick).
  const { u } = params(
    stage,
    {
      xFactor: range(10, 0, 100),
      yFactor: range(22, 0, 100),
      zFactor: range(10, 0, 100),
      colorRim: rgb(0xffffff),
      colorA: rgb(0xffe0e0),
      colorB: rgb(0x3000ff),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { xFactor: 10, yFactor: 22, zFactor: 10, colorRim: 16777215, colorA: 7397631, colorB: 3145983 },
        { xFactor: 66, yFactor: 31, zFactor: 18, colorRim: 16765184, colorA: 7521605, colorB: 49717 },
        { xFactor: 0, yFactor: 18, zFactor: 6, colorRim: 16765184, colorA: 11599872, colorB: 16763851 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = scepterHead({
    xFactor: u.xFactor,
    yFactor: u.yFactor,
    zFactor: u.zFactor,
    colorRim: u.colorRim,
    colorA: u.colorA,
    colorB: u.colorB,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
