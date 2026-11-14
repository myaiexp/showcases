// Make a sound wider or fold it to mono: StereoWidener on riff
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.5, channels: 2 });
  let chorus: Tone.Chorus | undefined;

  return stage.run(
    fxSpec(stage, {
      source: 'riff',
      stages: ['Chorus', 'StereoWidener'],
      caption: 'StereoWidener: width 0.5, unchanged',
      create: (src: Source) => {
        // A mono source has no width to change, so a chorus makes a stereo signal first.
        const fx = new Tone.StereoWidener(0.5).toDestination();
        chorus = new Tone.Chorus(2, 3.5, 0.9).connect(fx).start();
        chorus.wet.value = 1;
        src.out.connect(chorus);
        return fx;
      },
      variants: [
        { label: 'width 0', detail: 'width 0: mono, both traces match', apply: (fx) => { fx.width.value = 0; } },
        { label: 'width 0.5', detail: 'width 0.5: unchanged', apply: () => undefined },
        { label: 'width 1', detail: 'width 1: side only, as wide as it gets', apply: (fx) => { fx.width.value = 1; } },
      ],
      controls: (fx, bar) => {
        slider(bar, 'width', 0, 1, 0.01, 0.5, (v) => { fx.width.value = v; });
      },
      cleanup: () => { chorus?.dispose(); },
    }),
  );
};

export default mount;
