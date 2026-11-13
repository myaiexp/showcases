// transcodeSpz re-encodes an .spz with fewer bits, a clip box, opacity cutoff
import * as THREE from 'three';
import { PackedSplats, SplatFileType, SplatMesh, transcodeSpz } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, slider } from '../../shared/controls.ts';
import { wrapInCard } from '../../shared/labels.ts';
import { pushTorusKnot, rng } from '../../shared/subjects.ts';
import { formatBytes, spzFromPacked } from '../../shared/bytes.ts';

/** A knot whose splats have scattered opacities, so an opacity threshold has something to cut. */
async function sourceBytes(count: number): Promise<Uint8Array> {
  const splats = new PackedSplats();
  pushTorusKnot(splats, count);
  const rand = rng(5);
  splats.forEachSplat((i, center, scales, quat, _opacity, color) => {
    splats.setSplat(i, center, scales, quat, 0.1 + 0.9 * rand(), color);
  });
  return spzFromPacked(splats);
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.3, 3.3], orbit: 0.2 });
  const left = overlay(el);
  wrapInCard(left, ctx.preview);
  const right = document.createElement('div');
  right.style.cssText = left.style.cssText;
  right.style.left = 'auto';
  right.style.right = '8px';
  right.style.textAlign = 'right';
  el.append(right);

  let original: SplatMesh | null = null;
  let result: SplatMesh | null = null;
  let source: Uint8Array | null = null;
  let disposed = false;
  let run = 0;
  const opts = { fractionalBits: ctx.preview ? 3 : 12, opacityThreshold: ctx.preview ? 0.4 : 0, clip: 1.2 };

  const place = (m: SplatMesh, x: number): SplatMesh => {
    m.position.set(x, 0, 0);
    m.scale.setScalar(0.7);
    stage.scene.add(m);
    return m;
  };

  const transcode = async (): Promise<void> => {
    if (!source) return;
    const mine = ++run;
    const { fractionalBits, opacityThreshold, clip } = opts;
    const out = await transcodeSpz({
      inputs: [{ fileBytes: source.slice(), fileType: SplatFileType.SPZ }],
      fractionalBits,
      opacityThreshold,
      clipXyz: { min: [-clip, -clip, -clip], max: [clip, clip, clip] },
    });
    if (disposed || mine !== run) return;
    const next = new SplatMesh({ fileBytes: out.fileBytes });
    await next.initialized;
    if (disposed || mine !== run) return next.dispose();
    if (result) {
      stage.scene.remove(result);
      result.dispose();
    }
    result = place(next, 0.85);
    right.textContent = `transcoded\n${formatBytes(out.fileBytes.length)}, ${next.numSplats} splats\nclippedCount ${out.clippedCount}`;
  };

  void (async () => {
    source = await sourceBytes(ctx.preview ? 9000 : 24000);
    if (disposed) return;
    const base = new SplatMesh({ fileBytes: source.slice() });
    await base.initialized;
    if (disposed) return base.dispose();
    original = place(base, -0.85);
    left.textContent = `original\n${formatBytes(source.length)}, ${base.numSplats} splats`;
    await transcode();
  })();

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'fractionalBits', 1, 16, 1, opts.fractionalBits, (v) => ((opts.fractionalBits = v), void transcode()));
    slider(bar, 'opacityThreshold', 0, 0.9, 0.05, 0, (v) => ((opts.opacityThreshold = v), void transcode()));
    slider(bar, 'clip half-size', 0.2, 1.2, 0.05, opts.clip, (v) => ((opts.clip = v), void transcode()));
  }

  const spin = new THREE.Euler();
  stage.run((t) => {
    spin.set(0, t * 0.3, 0);
    original?.rotation.copy(spin);
    result?.rotation.copy(spin);
  });
  return () => {
    disposed = true;
    run++;
    stage.dispose();
  };
};

export default mount;
