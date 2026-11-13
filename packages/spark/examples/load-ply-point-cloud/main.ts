// A plain x y z red green blue PLY written in memory and auto-detected by Spark
import * as THREE from 'three';
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, select, slider } from '../../shared/controls.ts';
import { wrapInCard } from '../../shared/labels.ts';
import { formatBytes, plyPointCloud, type PlyFormat, type PlyPoint } from '../../shared/bytes.ts';

/** A rippled square sheet of points coloured by height. */
function wavePoints(grid: number): PlyPoint[] {
  const points: PlyPoint[] = [];
  const color = new THREE.Color();
  for (let i = 0; i < grid; i++) {
    for (let j = 0; j < grid; j++) {
      const x = (i / (grid - 1) - 0.5) * 2;
      const z = (j / (grid - 1) - 0.5) * 2;
      const y = 0.18 * Math.sin(x * 6) * Math.cos(z * 5) + 0.08 * Math.sin((x + z) * 11);
      color.setHSL(0.6 - (y + 0.26) * 0.9, 0.8, 0.55);
      points.push({ p: { x, y, z }, rgb: [Math.round(color.r * 255), Math.round(color.g * 255), Math.round(color.b * 255)] });
    }
  }
  return points;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 1.4, 2.7], orbit: 0.3, spark: { preBlurAmount: 0.6 } });
  const label = overlay(el, 'writing PLY…');
  wrapInCard(label, ctx.preview);
  let mesh: SplatMesh | null = null;
  let grid = 120;
  let format: PlyFormat = 'binary_little_endian';
  let run = 0;
  let disposed = false;

  const load = async (): Promise<void> => {
    const mine = ++run;
    // No scales, rotations or opacity in this file; Spark recognises it as a PLY from its header.
    const fileBytes = plyPointCloud(wavePoints(grid), format);
    const header = new TextDecoder().decode(fileBytes.subarray(0, 60)).split('\n').slice(0, 2).join(' / ');
    const next = new SplatMesh({ fileBytes });
    try {
      await next.initialized;
    } catch (err) {
      next.dispose();
      if (!disposed && mine === run) label.textContent = `${header}\n${formatBytes(fileBytes.length)}  ->  Spark says: ${err instanceof Error ? err.message : String(err)}`;
      return;
    }
    if (disposed || mine !== run) return next.dispose();
    if (mesh) {
      stage.scene.remove(mesh);
      mesh.dispose();
    }
    mesh = next;
    stage.scene.add(mesh);
    label.textContent = `${header}\n${formatBytes(fileBytes.length)}  ->  ${mesh.numSplats} splats`;
  };
  void load();

  if (!ctx.preview) {
    const bar = controlBar(el);
    select(bar, 'PLY format', ['binary_little_endian', 'binary_big_endian', 'ascii'] as const, (v) => ((format = v), void load()));
    slider(bar, 'grid', 20, 200, 10, grid, (v) => ((grid = v), void load()));
    // The file has no sizes, so points come out tiny; preBlurAmount enlarges every splat.
    slider(bar, 'preBlurAmount', 0, 2, 0.1, 0.6, (v) => (stage.spark.preBlurAmount = v));
  }

  stage.run();
  return () => {
    disposed = true;
    stage.dispose();
  };
};

export default mount;
