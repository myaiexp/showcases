// forceLoseDevice, forceRestoreDevice and a custom ContentRestorer
import { AssetPromise, AssetType, ContentRestorer, type Entity, type Engine, Texture2D } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { pictureFrame, pngBlobUrl, releaseUrls, tile } from '../../shared/assets-kit.ts';
import { button } from '../../shared/controls.ts';
import { lit, tick } from '../../shared/core-kit.ts';
import { eventLog } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';
import { paint } from '../../shared/textures.ts';

/** The docs' CustomTextureContentRestorer, redrawing from a canvas instead of requesting an image. */
class RedrawRestorer extends ContentRestorer<Texture2D> {
  readonly draw: () => HTMLCanvasElement;
  constructor(resource: Texture2D, draw: () => HTMLCanvasElement) {
    super(resource);
    this.draw = draw;
  }
  override restoreContent(): AssetPromise<Texture2D> | void {
    const resource = this.resource;
    resource.setImageSource(this.draw());
    resource.generateMipmaps();
    return AssetPromise.resolve(resource);
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Left: loaded by the engine, restored by itself. Middle: hand-made with a ContentRestorer. Right: hand-made without one.' });
  const { engine, root } = stage;
  stage.own(releaseUrls);
  lit(stage, [0, 0, 7.5]);
  const log = eventLog(stage, 6, 'bl');
  const loaded = await engine.resourceManager.load<Texture2D>({ type: AssetType.Texture2D, url: await pngBlobUrl(128, tile('L', 150)) });
  const make = (hue: number, label: string): Texture2D => {
    const t = new Texture2D(engine as Engine, 128, 128);
    t.setImageSource(paint(128, tile(label, hue)));
    t.generateMipmaps();
    return t;
  };
  const withRestorer = make(30, 'R');
  engine.resourceManager.addContentRestorer(new RedrawRestorer(withRestorer, () => paint(128, tile('R', 30))));
  const without = make(280, 'X');
  if (ctx.signal.aborted) return stage.dispose;
  const frames: Entity[] = [loaded, withRestorer, without].map((t, i) => pictureFrame(root, engine, t, 2.2, [(i - 1) * 2.6, 0, 0]));
  const onLost = (): void => log.log('devicelost event');
  const onRestored = (): void => log.log('devicerestored event');
  engine.on('devicelost', onLost);
  engine.on('devicerestored', onRestored);
  stage.own(() => {
    engine.off('devicelost', onLost);
    engine.off('devicerestored', onRestored);
  });
  const lose = (): void => {
    log.log('forceLoseDevice()');
    engine.forceLoseDevice();
  };
  const restore = (): void => {
    log.log('forceRestoreDevice()');
    engine.forceRestoreDevice();
  };
  if (!stage.preview) {
    button(stage.bar, 'forceLoseDevice()', lose);
    button(stage.bar, 'forceRestoreDevice()', restore);
  }
  // Cards lose the device for a short moment, then keep it long enough to see it came back.
  let timer: ReturnType<typeof setTimeout> | undefined;
  const cycle = (): void => {
    lose();
    timer = setTimeout(() => {
      restore();
      timer = setTimeout(cycle, 2600);
    }, 700);
  };
  if (stage.preview) timer = setTimeout(cycle, 1500);
  stage.own(() => clearTimeout(timer));
  tick(root, (_dt, t) => frames.forEach((f, i) => f.transform.setRotation(90 - Math.sin(t + i) * 15, 0, 0)));
  return stage.dispose;
};

export default mount;
