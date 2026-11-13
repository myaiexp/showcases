// lod: true on a decoded file: Spark builds the LoD tree in a worker; lodSplatCount caps the draw
import * as THREE from 'three';
import { PackedSplats, SplatMesh, writeSpz } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, select, slider } from '../../shared/controls.ts';
import { BUTTERFLY_URL, pushTerrain } from '../../shared/subjects.ts';

const SOURCES = ['terrain (in-memory .spz)', 'butterfly.spz (sparkjs.dev)'] as const;

/** Encodes a procedural terrain as .spz bytes, standing in for a file on disk. */
async function terrainSpz(count: number): Promise<Uint8Array> {
  const splats = new PackedSplats({ construct: (s) => pushTerrain(s, count) });
  await splats.initialized;
  const { fileBytes } = await writeSpz(splats);
  splats.dispose();
  return fileBytes;
}

const mount: Mount = async (el, ctx) => {
  const total = ctx.preview ? 60000 : 400000;
  const budget = ctx.preview ? 6000 : 40000;
  const stage = createStage(el, ctx, {
    position: [0, 1.6, 4.5],
    orbit: 0.12,
    // A low budget so the coarser interior splats of the tree are easy to see.
    spark: { lodSplatCount: budget },
  });
  const status = overlay(el, 'encoding…');
  const bytes = await terrainSpz(total);
  if (ctx.signal.aborted) return () => stage.dispose();

  let mesh: SplatMesh | null = null;
  const show = (source: (typeof SOURCES)[number]): void => {
    if (mesh) {
      stage.scene.remove(mesh);
      mesh.dispose();
    }
    // lod: true asks the loader to build the tree (tiny-lod) in a background worker.
    if (source === SOURCES[0]) mesh = new SplatMesh({ fileBytes: bytes.slice(), lod: true });
    else {
      mesh = new SplatMesh({ url: BUTTERFLY_URL, lod: true });
      mesh.quaternion.set(1, 0, 0, 0);
      mesh.position.y = 0.6;
    }
    stage.scene.add(mesh);
  };
  show(SOURCES[0]);

  if (!ctx.preview) {
    const bar = controlBar(el);
    select(bar, 'source', SOURCES, show);
    slider(bar, 'lodSplatCount (k)', 2, 400, 2, budget / 1000, (v) => (stage.spark.lodSplatCount = v * 1000));
  }

  stage.run(() => {
    // SparkRenderer draws one instanced quad per selected splat (typed as a plain BufferGeometry).
    const drawn = (stage.spark.geometry as THREE.InstancedBufferGeometry).instanceCount;
    const source = mesh?.packedSplats;
    const tree = source?.lodSplats ? `${source.lodSplats.numSplats.toLocaleString()} tree nodes` : 'building tree…';
    status.textContent = `${tree} · ${drawn.toLocaleString()} drawn (budget ${(stage.spark.lodSplatCount ?? 0).toLocaleString()})`;
  });
  return () => stage.dispose();
};

export default mount;
