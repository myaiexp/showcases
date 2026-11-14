// A custom texture parser for .ppm files, registered on the texture handler
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMapBox, BlobUrls, setMap, textureAsset } from '../../shared/assets.ts';
import { createLog, tint } from '../../shared/scripting.ts';
import { IMAGES, makePpm, PpmParser } from './ppm.ts';

type AddParserArg = Parameters<pc.ResourceHandler['addParser']>[0];

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 14, orbit: { distance: 9, pitch: -26, yaw: 0, autoRotate: ctx.preview ? 10 : 0 } });
  const { app } = scene;
  const registry = app.assets;
  const urls = new BlobUrls();
  const out = createLog(el, ctx, 5);
  const textures = app.loader.getHandler('texture')!;

  // Parsers are asked newest-first; the first whose canParse says yes loads the file.
  const plain = new PpmParser('plain parser', false, (l) => out.log(`open() ran in the ${l}`));
  const invert = new PpmParser('inverting parser', true, (l) => out.log(`open() ran in the ${l}`));
  let plainOn = false;
  let invertOn = false;
  const asParser = (p: PpmParser): AddParserArg => p as unknown as AddParserArg;

  // The filename's extension is what canParse sees, so the blob URL gets a .ppm name.
  const assets = Object.entries(IMAGES).map(([name, pixel], i) => {
    const url = urls.from(makePpm(64, pixel), 'application/octet-stream');
    const asset = textureAsset(name, url, `${name}.ppm`);
    const box = addMapBox(app.root, name, [(i - 1) * 3, 0.9, 0], 2);
    asset.on('load', () => setMap(box, asset.resource as pc.Texture));
    asset.on('error', () => {
      out.log(`${name}.ppm: the built-in image parser took it and failed`);
      tint(box, '#e8794a');
    });
    registry.add(asset);
    return { asset, box };
  });

  const reload = (): void => {
    for (const { asset, box } of assets) {
      setMap(box, null);
      asset.unload();
      registry.load(asset);
    }
  };
  const apply = (plainWant: boolean, invertWant: boolean): void => {
    // Remove both, then add in a fixed order, so the inverting parser is always the newest.
    if (plainOn) textures.removeParser(asParser(plain));
    if (invertOn) textures.removeParser(asParser(invert));
    if (plainWant) textures.addParser(asParser(plain));
    if (invertWant) textures.addParser(asParser(invert));
    plainOn = plainWant;
    invertOn = invertWant;
    out.log(`texture handler parsers: ${textures.parsers.length} (${plainOn ? 'plain ' : ''}${invertOn ? 'inverting' : ''})`);
    reload();
  };
  apply(true, false);

  if (ctx.preview) {
    let t = 0;
    let flip = false;
    app.on('update', (dt: number) => {
      t += dt;
      if (t > 2.2) {
        t = 0;
        flip = !flip;
        apply(true, flip);
      }
    });
  } else {
    const panel = createPanel(el);
    const state = { plain: true, invert: false };
    panel.check('plain .ppm parser registered', true, (on) => {
      state.plain = on;
      apply(state.plain, state.invert);
    });
    panel.check('inverting parser registered after it (wins)', false, (on) => {
      state.invert = on;
      apply(state.plain, state.invert);
    });
    panel.readout('Without a parser the catch-all image parser tries to decode the PPM and fails.');
  }
  return () => {
    urls.dispose();
    scene.dispose();
  };
};

export default mount;
