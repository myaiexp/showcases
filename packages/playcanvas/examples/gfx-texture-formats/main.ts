// Texture pixel formats: 8-bit, sRGB, half and full float
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCanvasLabels } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial, sway } from '../../shared/pbr.ts';

const SIZE = 64;

interface Format {
  name: string;
  format: number;
  channels: number;
  /** Converts a 0..1 gradient value into stored data: bytes, half floats or floats. */
  kind: 'u8' | 'f16' | 'f32';
  scale?: number;
}

const FORMATS: Format[] = [
  { name: 'R8', format: pc.PIXELFORMAT_R8, channels: 1, kind: 'u8' },
  { name: 'RG8', format: pc.PIXELFORMAT_RG8, channels: 2, kind: 'u8' },
  { name: 'RGBA8', format: pc.PIXELFORMAT_RGBA8, channels: 4, kind: 'u8' },
  { name: 'SRGBA8', format: pc.PIXELFORMAT_SRGBA8, channels: 4, kind: 'u8' },
  { name: 'RGBA16F (HDR to 3.0)', format: pc.PIXELFORMAT_RGBA16F, channels: 4, kind: 'f16', scale: 3 },
  { name: 'RGBA32F (HDR to 3.0)', format: pc.PIXELFORMAT_RGBA32F, channels: 4, kind: 'f32', scale: 3 },
];

/** A gradient: red runs left to right, green top to bottom, blue is constant. */
function gradient({ channels, kind, scale = 1 }: Format): Uint8Array | Uint16Array | Float32Array {
  const n = SIZE * SIZE * channels;
  const data = kind === 'u8' ? new Uint8Array(n) : kind === 'f16' ? new Uint16Array(n) : new Float32Array(n);
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const px = [x / (SIZE - 1), y / (SIZE - 1), 0.5, 1];
      for (let c = 0; c < channels; c++) {
        const v = px[c]! * (c < 3 ? scale : 1);
        data[(y * SIZE + x) * channels + c] = kind === 'u8' ? Math.round(v * 255) : kind === 'f16' ? pc.FloatPacking.float2Half(v) : v;
      }
    }
  }
  return data;
}

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { sky: false, sun: false, distance: 9.5, pitch: 0, yaw: 0, clearColor: new pc.Color(0.1, 0.11, 0.15) });
  const { app, stage } = rig;
  sway(app, rig.orbit, 8, 0.4);

  const sizes: string[] = [];
  const labels = FORMATS.map((f, i) => {
    // Float formats are not always filterable (32-bit needs an extension), so they sample nearest.
    const filter = f.kind === 'f32' ? pc.FILTER_NEAREST : pc.FILTER_LINEAR;
    const texture = rig.own(
      new pc.Texture(stage.device, { name: f.name, width: SIZE, height: SIZE, format: f.format, mipmaps: false, minFilter: filter, magFilter: filter, addressU: pc.ADDRESS_CLAMP_TO_EDGE, addressV: pc.ADDRESS_CLAMP_TO_EDGE, levels: [gradient(f) as Uint8Array] }),
    );
    sizes.push(`${f.name}: ${(texture.gpuSize / 1024).toFixed(1)} KB`);
    const material = pbrMaterial('#ffffff', { diffuseMap: texture, useLighting: false });
    addMesh(app, 'plane', material, [((i % 3) - 1) * 3, i < 3 ? 1.6 : -1.6, 0], 2.6).setLocalEulerAngles(90, 0, 0);
    return { text: f.name, rect: [(i % 3) / 3, i < 3 ? 0.5 : 0, 1 / 3, 0.5] as [number, number, number, number] };
  });
  addCanvasLabels(stage.canvas, labels);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.readout(sizes.join(' | '));
    panel.row();
    panel.readout('same gradient in every format: R8 holds only red, RG8 red and green; SRGBA8 is decoded to linear when sampled');
  }
  return () => rig.dispose();
};

export default mount;
