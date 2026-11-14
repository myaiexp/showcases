// In-memory SPZ and PLY bytes plus byte streams, so loading needs no network
import * as THREE from 'three';
import { PackedSplats, writeSpz } from '@sparkjsdev/spark';
import { pushButterfly } from './subjects.ts';

/** "12.3 KB" style size. */
export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

/** Encodes splats as real .spz bytes with writeSpz. The source PackedSplats is disposed. */
export async function spzFromPacked(splats: PackedSplats, options?: { maxSh?: number; fractionalBits?: number }): Promise<Uint8Array> {
  const { fileBytes } = await writeSpz(splats, options);
  splats.dispose();
  return fileBytes;
}

/** A procedural butterfly written out as .spz bytes. */
export async function butterflySpz(count = 12000): Promise<Uint8Array> {
  const splats = new PackedSplats();
  pushButterfly(splats, count);
  return spzFromPacked(splats);
}

/** A blob: URL for bytes. The caller revokes it with URL.revokeObjectURL. */
export function blobUrl(bytes: Uint8Array, type = 'application/octet-stream'): string {
  return URL.createObjectURL(new Blob([bytes as BlobPart], { type }));
}

/**
 * A ReadableStream that hands out `bytes` in `chunkSize` pieces, waiting `delayMs` before each.
 * Calling `stop()` (or cancelling the stream) ends the trickle and clears the timer.
 */
export function trickleStream(
  bytes: Uint8Array,
  chunkSize: number,
  delayMs: number,
  onChunk?: (sent: number) => void,
): { stream: ReadableStream<Uint8Array>; stop: () => void } {
  let offset = 0;
  let timer = 0;
  let stopped = false;
  const stop = (): void => {
    stopped = true;
    clearTimeout(timer);
  };
  const stream = new ReadableStream<Uint8Array>({
    pull: (controller) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(() => {
          if (stopped) return resolve();
          const end = Math.min(offset + chunkSize, bytes.length);
          controller.enqueue(bytes.slice(offset, end));
          offset = end;
          onChunk?.(offset);
          if (offset >= bytes.length) controller.close();
          resolve();
        }, delayMs);
      }),
    cancel: stop,
  });
  return { stream, stop };
}

export interface PlyPoint {
  p: THREE.Vector3Like;
  /** 0..255 */
  rgb: [number, number, number];
}

export type PlyFormat = 'binary_little_endian' | 'binary_big_endian' | 'ascii';

/**
 * A plain point-cloud PLY: only x y z (float) and red green blue (uchar) per vertex,
 * no scales, rotations or opacities, in the given PLY `format`.
 */
export function plyPointCloud(points: PlyPoint[], format: PlyFormat = 'binary_little_endian'): Uint8Array {
  const ascii = format === 'ascii';
  const littleEndian = format === 'binary_little_endian';
  const header = [
    'ply',
    `format ${format} 1.0`,
    `element vertex ${points.length}`,
    'property float x',
    'property float y',
    'property float z',
    'property uchar red',
    'property uchar green',
    'property uchar blue',
    'end_header',
    '',
  ].join('\n');
  if (ascii) {
    const body = points.map(({ p, rgb }) => `${p.x.toFixed(4)} ${p.y.toFixed(4)} ${p.z.toFixed(4)} ${rgb.join(' ')}`).join('\n');
    return new TextEncoder().encode(`${header}${body}\n`);
  }
  const head = new TextEncoder().encode(header);
  const out = new Uint8Array(head.length + points.length * 15);
  out.set(head);
  const view = new DataView(out.buffer);
  let o = head.length;
  for (const { p, rgb } of points) {
    view.setFloat32(o, p.x, littleEndian);
    view.setFloat32(o + 4, p.y, littleEndian);
    view.setFloat32(o + 8, p.z, littleEndian);
    out.set(rgb, o + 12);
    o += 15;
  }
  return out;
}
