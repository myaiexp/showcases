// A made-up "ShowcaseSlow" asset type that resolves after params.ms
import { AssetPromise, type LoadItem, Loader, resourceLoader } from '@galacean/engine';

export const SLOW_TYPE = 'ShowcaseSlow';

class SlowLoader extends Loader<string> {
  override load(item: LoadItem): AssetPromise<string> {
    const ms = Number(item.params?.ms ?? 300);
    return new AssetPromise<string>((resolve, _reject, _progress, _detail, onCancel) => {
      const id = setTimeout(() => resolve(item.url ?? ''), ms);
      onCancel?.(() => clearTimeout(id));
    });
  }
}

// What `@resourceLoader(SLOW_TYPE, ['slow'])` does when written above the class; this repo's TypeScript has no legacy decorators.
resourceLoader(SLOW_TYPE, ['slow'], false)(SlowLoader);
