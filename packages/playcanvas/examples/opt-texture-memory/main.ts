// Texture formats and VRAM: one checker in five formats, sized by gpuSize
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { addCanvasLabels } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { FORMATS, TRANSCODE_TARGETS, checkerData, supported } from './formats.ts';

const SIZES = ['64', '128', '256', '512'] as const;
const kib = (bytes: number): string => (bytes >= 1048576 ? `${(bytes / 1048576).toFixed(2)} MiB` : `${(bytes / 1024).toFixed(1)} KiB`);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 340 });
  const { app, device, canvas } = stage;
  const camera = new pc.Entity('camera');
  camera.addComponent('camera', { clearColor: new pc.Color(0.07, 0.08, 0.11), projection: pc.PROJECTION_ORTHOGRAPHIC, orthoHeight: 1.5 });
  camera.setPosition(0, 0, 5);
  app.root.addChild(camera);

  // Five tiles, one per fifth of the canvas width, with a label column under each.
  const layer = addCanvasLabels(canvas, []);
  const row = document.createElement('div');
  Object.assign(row.style, { position: 'absolute', left: '0', right: '0', bottom: '6px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', textAlign: 'center', font: '11px/1.35 monospace', color: '#e8ebf2' });
  layer.append(row);

  let textures: pc.Texture[] = [];
  let tiles: pc.Entity[] = [];
  let materials: pc.StandardMaterial[] = [];
  const build = (size: number): void => {
    tiles.forEach((t) => t.destroy());
    materials.forEach((m) => m.destroy());
    textures.forEach((t) => t.destroy());
    textures = [];
    tiles = [];
    materials = [];
    row.replaceChildren();
    FORMATS.forEach((info, i) => {
      const label = document.createElement('div');
      if (!supported(device, info)) {
        label.textContent = `${info.name}\nnot supported`;
        label.style.whiteSpace = 'pre';
        row.append(label);
        return;
      }
      const texture = new pc.Texture(device, {
        name: info.name,
        width: size,
        height: size,
        format: info.format,
        mipmaps: false,
        minFilter: pc.FILTER_NEAREST,
        magFilter: pc.FILTER_NEAREST,
        addressU: pc.ADDRESS_CLAMP_TO_EDGE,
        addressV: pc.ADDRESS_CLAMP_TO_EDGE,
        levels: [checkerData(info.format, size) as unknown as Uint8ClampedArray],
      });
      const m = new pc.StandardMaterial();
      m.useLighting = false;
      m.diffuse = new pc.Color(0, 0, 0);
      m.emissiveMap = texture;
      m.update();
      const tile = new pc.Entity(info.name);
      tile.addComponent('render', { type: 'plane', material: m, castShadows: false });
      tile.setLocalEulerAngles(90, 0, 0);
      tile.setLocalPosition(i - 2, 0.2, 0);
      tile.setLocalScale(0.86, 1, 0.86);
      app.root.addChild(tile);
      textures.push(texture);
      materials.push(m);
      tiles.push(tile);
      label.textContent = `${info.name}\n${kib(texture.gpuSize)}`;
      label.style.whiteSpace = 'pre';
      row.append(label);
    });
  };
  build(ctx.preview ? 128 : 256);

  app.on('update', () => {
    // Five unit-wide columns fill the canvas width whatever its aspect.
    camera.camera!.orthoHeight = 2.5 / (canvas.clientWidth / Math.max(1, canvas.clientHeight));
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('texture size (px)', SIZES, '256', (v) => build(Number(v)));
    const vram = panel.readout('');
    app.on('update', () => {
      vram.textContent = `app.stats.vramTextureBytes: ${kib(app.stats.vramTextureBytes)} (all textures on this device)`;
    });
    panel.row();
    // What a Basis file transcodes to depends on the device: its flags decide.
    const table = TRANSCODE_TARGETS.map((f) => {
      const size = pc.TextureUtils.calcGpuSize(512, 512, 1, f.format, true, false);
      return `${f.name}: ${supported(device, f) ? 'yes' : 'no'}, 512 px with mips ${kib(size)}`;
    });
    const rgba = pc.TextureUtils.calcGpuSize(512, 512, 1, pc.PIXELFORMAT_RGBA8, true, false);
    panel.readout(`Transcode targets here (512 x 512, RGBA8 would be ${kib(rgba)}): ${table.join(' | ')}`);
  }

  return () => {
    materials.forEach((m) => m.destroy());
    textures.forEach((t) => t.destroy());
    stage.dispose();
  };
};

export default mount;
