// The resource cache: getFromCache before and after a load, same object twice
import { AssetType, type Texture2D } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { pictureFrame, pngBlobUrl, releaseUrls, tile } from '../../shared/assets-kit.ts';
import { button } from '../../shared/controls.ts';
import { lit, tick } from '../../shared/core-kit.ts';
import { eventLog } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'getFromCache is the synchronous read; load is the asynchronous one that also fills the cache.' });
  const { engine, root } = stage;
  stage.own(releaseUrls);
  lit(stage, [0, 0, 5]);
  const log = eventLog(stage, 9, 'bl');
  let lap = 0;
  let url = '';
  const rm = engine.resourceManager;
  let first: Texture2D | undefined;
  const steps: { text: string; run(): Promise<void> | void }[] = [
    {
      text: 'getFromCache(url)',
      run: async () => {
        url = await pngBlobUrl(256, tile('C', (lap++ * 70) % 360)); // a new image and URL each lap
        log.log(`getFromCache(url) -> ${rm.getFromCache<Texture2D>(url) ?? 'nothing yet'}`);
      },
    },
    {
      text: 'await load(url)',
      run: async () => {
        first = await rm.load<Texture2D>({ type: AssetType.Texture2D, url });
        log.log(`await load(url) -> Texture2D ${first.width}px`);
        pictureFrame(root, engine, first, 2.6).name = 'shown';
      },
    },
    { text: 'getFromCache(url)', run: () => log.log(`getFromCache(url) -> ${rm.getFromCache<Texture2D>(url) === first ? 'the same Texture2D' : 'something else'}`) },
    {
      text: 'await load(url) again',
      run: async () => {
        const second = await rm.load<Texture2D>({ type: AssetType.Texture2D, url });
        log.log(`second load === first load: ${second === first}`);
      },
    },
  ];
  let index = 0;
  let busy = false;
  const next = async (): Promise<void> => {
    if (busy || ctx.signal.aborted) return;
    busy = true;
    await steps[index]!.run();
    index = (index + 1) % steps.length;
    busy = false;
  };
  if (!stage.preview) button(stage.bar, 'Next call', () => void next());
  let last = -10;
  tick(root, (_dt, t) => {
    if (stage.preview && t - last > 1.3) {
      last = t;
      if (index === 0) {
        log.clear();
        root.findByName('shown')?.destroy();
        first = undefined;
      }
      void next();
    }
    root.findByName('shown')?.transform.setRotation(90 - Math.sin(t) * 22, Math.cos(t * 0.6) * 25, 0);
  });
  return stage.dispose;
};

export default mount;
