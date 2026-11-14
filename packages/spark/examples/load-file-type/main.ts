// Extension-less blob: URLs loaded with no hint, fileName, fileType, wrong type
import * as THREE from 'three';
import { SplatFileType, SplatMesh, type SplatMeshOptions } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, readout, select } from '../../shared/controls.ts';
import { wrapInCard } from '../../shared/labels.ts';
import { blobUrl, plyPointCloud, type PlyPoint } from '../../shared/bytes.ts';

type Hint = Pick<SplatMeshOptions, 'fileName' | 'fileType'>;

const MODES: Record<string, { hint: Hint; code: string }> = {
  'no hint': { hint: {}, code: '{ url }' },
  'fileName': { hint: { fileName: 'scene.ply' }, code: "{ url, fileName: 'scene.ply' }" },
  'fileType PLY': { hint: { fileType: SplatFileType.PLY }, code: '{ url, fileType: SplatFileType.PLY }' },
  'fileType SPLAT (wrong)': { hint: { fileType: SplatFileType.SPLAT }, code: '{ url, fileType: SplatFileType.SPLAT }' },
};

/** A conical spiral of coloured points. */
function spiralPoints(n: number): PlyPoint[] {
  const color = new THREE.Color();
  return Array.from({ length: n }, (_, i) => {
    const t = i / n;
    const a = t * Math.PI * 14;
    const r = 0.15 + t * 0.7;
    color.setHSL(t, 0.8, 0.55);
    return {
      p: { x: Math.cos(a) * r, y: 0.9 - t * 1.6, z: Math.sin(a) * r },
      rgb: [Math.round(color.r * 255), Math.round(color.g * 255), Math.round(color.b * 255)],
    };
  });
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.6, 2.2], orbit: 0.4, spark: { preBlurAmount: 0.5 } });
  const label = overlay(el);
  wrapInCard(label, ctx.preview);
  // A URL with no extension: Spark can only learn the type from the content or from a hint.
  const url = blobUrl(plyPointCloud(spiralPoints(ctx.preview ? 9000 : 14000)));
  const names = Object.keys(MODES);
  let mesh: SplatMesh | null = null;
  let run = 0;
  let timer = 0;
  let log: HTMLElement | null = null;

  const load = (name: string): void => {
    const mine = ++run;
    const { hint, code } = MODES[name]!;
    if (mesh) {
      stage.scene.remove(mesh);
      mesh.dispose();
      mesh = null;
    }
    label.textContent = `new SplatMesh(${code})\nloading…`;
    const next = new SplatMesh({ url, ...hint });
    next.initialized.then(
      () => {
        if (mine !== run) return;
        mesh = next;
        stage.scene.add(next);
        label.textContent = `new SplatMesh(${code})\n${next.numSplats} splats`;
        if (log) log.textContent = `${name}: decoded ${next.numSplats} splats`;
      },
      (err: unknown) => {
        next.dispose();
        if (mine !== run) return;
        const msg = err instanceof Error ? err.message : String(err);
        label.textContent = `new SplatMesh(${code})\nfailed: ${msg.slice(0, 48)}`;
        if (log) log.textContent = `${name}: ${msg}`;
      },
    );
  };

  let i = 0;
  load(names[0]!);
  if (ctx.preview) {
    timer = window.setInterval(() => load(names[++i % names.length]!), 3000);
  } else {
    const bar = controlBar(el);
    select(bar, 'type hint', names, load);
    log = readout(el, 'The URL has no extension. Content sniffing recognises PLY and SPZ; .splat and .ksplat need a fileType or an extension.');
  }

  stage.run();
  return () => {
    run++;
    window.clearInterval(timer);
    stage.dispose();
    URL.revokeObjectURL(url);
  };
};

export default mount;
