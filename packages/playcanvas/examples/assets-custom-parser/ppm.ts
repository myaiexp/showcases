// A PPM (P6) image generator and a custom texture parser that decodes it
import * as pc from 'playcanvas';

type Pixel = (x: number, y: number) => [number, number, number];

/** Encodes pixels as a binary PPM file: "P6", the size, 255, then raw RGB bytes. */
export function makePpm(size: number, pixel: Pixel): Uint8Array<ArrayBuffer> {
  const header = new TextEncoder().encode(`P6\n${size} ${size}\n255\n`);
  const out = new Uint8Array(header.length + size * size * 3);
  out.set(header);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) out.set(pixel(x / size, y / size).map((v) => Math.round(v * 255)), header.length + (y * size + x) * 3);
  }
  return out;
}

export const IMAGES: Record<string, Pixel> = {
  swirl: (x, y) => {
    const a = Math.atan2(y - 0.5, x - 0.5) + Math.hypot(x - 0.5, y - 0.5) * 12;
    return [0.5 + 0.5 * Math.sin(a), 0.4 + 0.3 * Math.sin(a + 2), 0.6 + 0.4 * Math.cos(a)];
  },
  stripes: (x, y) => {
    const s = Math.floor((x + y) * 8) % 2;
    return s ? [0.95, 0.75, 0.2] : [0.15, 0.3, 0.6];
  },
  rings: (x, y) => {
    const r = Math.hypot(x - 0.5, y - 0.5) * 14;
    return [0.2 + 0.7 * (r % 1), 0.8 - 0.5 * (r % 1), 0.4];
  },
};

type Context = { ext: string };
type Callback = (err: string | null, data?: unknown) => void;
type Handler = { fetch(url: unknown, type: string, cb: Callback, asset?: pc.Asset): void };

/** Claims files ending in .ppm. A second instance with `invert` shows that the newest parser wins. */
export class PpmParser {
  // The handler assigns itself here when the parser is added to it.
  handler!: Handler;
  readonly label: string;
  private invert: boolean;
  private onOpen: (label: string) => void;

  constructor(label: string, invert: boolean, onOpen: (label: string) => void) {
    this.label = label;
    this.invert = invert;
    this.onOpen = onOpen;
  }

  canParse(context: Context): boolean {
    return context.ext === 'ppm';
  }

  // The handler hands over the file's bytes as an ArrayBuffer.
  load(url: unknown, callback: Callback, asset?: pc.Asset): void {
    this.handler.fetch(url, pc.Http.ResponseType.ARRAY_BUFFER, callback, asset);
  }

  // Texture parsers get the graphics device and the options derived from the asset.
  open(url: string, data: ArrayBuffer, device: pc.GraphicsDevice, textureOptions: object): pc.Texture {
    const bytes = new Uint8Array(data);
    const head = new TextDecoder().decode(bytes.subarray(0, 24));
    const m = /^P6\s+(\d+)\s+(\d+)\s+255\s/.exec(head);
    if (!m) throw new Error('not a binary PPM');
    const [offset, width, height] = [m[0].length, Number(m[1]), Number(m[2])];
    const rgba = new Uint8Array(width * height * 4);
    for (let i = 0; i < width * height; i++) {
      for (let c = 0; c < 3; c++) {
        const v = bytes[offset + i * 3 + c]!;
        rgba[i * 4 + c] = this.invert ? 255 - v : v;
      }
      rgba[i * 4 + 3] = 255;
    }
    this.onOpen(this.label);
    const texture = new pc.Texture(device, {
      name: url,
      width,
      height,
      format: pc.PIXELFORMAT_RGBA8,
      levels: [rgba],
      // Asset settings spread last, so they override the defaults above.
      ...textureOptions,
    });
    texture.upload();
    return texture;
  }
}
