// createNNDescent progress callback: stage names and a 0..1 fraction
import { createNNDescent } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { eventLog } from '../../shared/controls.ts';
import { bar } from '../../shared/algo-umap.ts';
import { clusteredVectors } from '../../shared/vectors.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 120, maxWidth: 520 });
  const set = bar(stage.view);
  stage.view.style.padding = '12px';
  stage.view.style.boxSizing = 'border-box';
  const log = eventLog(stage.view, stage.preview ? 5 : 8);
  const v = clusteredVectors(stage.preview ? 3000 : 8000, 50, 10, 4);

  const build = async (): Promise<void> => {
    let last = '';
    const nn = await createNNDescent(v.count, v.dim, v.data, {
      seed: 1,
      progress(fraction, name) {
        set(fraction);
        if (name !== last) log(`${Math.round(fraction * 100)}%  ${name}`);
        last = name;
      },
    });
    set(1);
    log('index ready');
    nn.destroy();
  };
  await build();
  if (stage.preview) stage.every(5000, () => void build());
  return stage.dispose;
};

export default mount;
