// Checker pixel data in five texture formats, uncompressed and block compressed
import * as pc from 'playcanvas';

export interface FormatInfo {
  name: string;
  format: number;
  /** Device flag that must be set for the format, or null when every device has it. */
  needs: string | null;
}

export const FORMATS: FormatInfo[] = [
  { name: 'RGBA8', format: pc.PIXELFORMAT_RGBA8, needs: null },
  { name: 'RGB565', format: pc.PIXELFORMAT_RGB565, needs: null },
  { name: 'L8', format: pc.PIXELFORMAT_L8, needs: null },
  { name: 'DXT1', format: pc.PIXELFORMAT_DXT1, needs: 'extCompressedTextureS3TC' },
  { name: 'DXT5', format: pc.PIXELFORMAT_DXT5, needs: 'extCompressedTextureS3TC' },
];

/** Formats the docs list as Basis transcode targets, shown in the support table only. */
export const TRANSCODE_TARGETS: FormatInfo[] = [
  { name: 'ASTC 4x4', format: pc.PIXELFORMAT_ASTC_4x4, needs: 'extCompressedTextureASTC' },
  { name: 'DXT5', format: pc.PIXELFORMAT_DXT5, needs: 'extCompressedTextureS3TC' },
  { name: 'ETC2 RGBA', format: pc.PIXELFORMAT_ETC2_RGBA, needs: 'extCompressedTextureETC' },
  { name: 'ETC1', format: pc.PIXELFORMAT_ETC1, needs: 'extCompressedTextureETC1' },
  { name: 'PVRTC 4bpp', format: pc.PIXELFORMAT_PVRTC_4BPP_RGBA_1, needs: 'extCompressedTexturePVRTC' },
  { name: 'ATC RGB', format: pc.PIXELFORMAT_ATC_RGB, needs: 'extCompressedTextureATC' },
];

export const supported = (device: pc.GraphicsDevice, info: FormatInfo): boolean =>
  info.needs === null || !!(device as unknown as Record<string, unknown>)[info.needs];

const A = [232, 121, 74];
const B = [30, 40, 70];
const cell = (x: number, y: number): number[] => (((x >> 3) + (y >> 3)) & 1 ? A : B);
const rgb565 = (c: number[]): number => ((c[0]! >> 3) << 11) | ((c[1]! >> 2) << 5) | (c[2]! >> 3);

/** Pixel data for `size` x `size` in `format`: a checker of 8-pixel cells. */
export function checkerData(format: number, size: number): Uint8Array | Uint16Array {
  if (format === pc.PIXELFORMAT_RGBA8) {
    const d = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) d.set([...cell(x, y), 255], (y * size + x) * 4);
    return d;
  }
  if (format === pc.PIXELFORMAT_RGB565) {
    const d = new Uint16Array(size * size);
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) d[y * size + x] = rgb565(cell(x, y));
    return d;
  }
  if (format === pc.PIXELFORMAT_L8) {
    const d = new Uint8Array(size * size);
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) d[y * size + x] = cell(x, y) === A ? 200 : 40;
    return d;
  }
  // DXT: one block is 4 x 4 pixels. Both block colours equal one flat colour, so a block is
  // that colour; DXT5 puts an opaque alpha block (8 bytes) in front of the colour block.
  const bytes = format === pc.PIXELFORMAT_DXT5 ? 16 : 8;
  const blocks = size / 4;
  const d = new Uint8Array(blocks * blocks * bytes);
  for (let by = 0; by < blocks; by++) {
    for (let bx = 0; bx < blocks; bx++) {
      const o = (by * blocks + bx) * bytes + bytes - 8;
      const c = rgb565(cell(bx * 4, by * 4));
      d[o] = d[o + 2] = c & 255;
      d[o + 1] = d[o + 3] = c >> 8;
      if (bytes === 16) d[o - 8] = d[o - 7] = 255;
    }
  }
  return d;
}
