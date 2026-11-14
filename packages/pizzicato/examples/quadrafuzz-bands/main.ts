// A drum loop through Quadrafuzz: each of the four bands gets its own distortion
import Pizzicato, { type Quadrafuzz } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { tweak } from '../../shared/fx.ts';
import { gauge } from '../../shared/fx-pictures.ts';
import { fileSound } from '../../shared/load.ts';
import { pzStage } from '../../shared/stage.ts';
import { smallText } from '../../shared/widgets.ts';

type Bands = Pick<Quadrafuzz, 'lowGain' | 'midLowGain' | 'midHighGain' | 'highGain'>;

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 2 });
  const rows = [
    gauge(stage.visual, 'low'),
    gauge(stage.visual, 'mid-low'),
    gauge(stage.visual, 'mid-high'),
    gauge(stage.visual, 'high', '#ffb86b'),
  ];
  smallText(stage.visual, 'kick is low, hats are high');
  const show = (q: Bands): void => {
    const gains = [q.lowGain, q.midLowGain, q.midHighGain, q.highGain];
    rows.forEach((g, i) => g.set(gains[i]!, gains[i]!.toFixed(1)));
  };

  return stage.run({
    build: async () => {
      const drums = await fileSound('drums');
      const quadrafuzz = new Pizzicato.Effects.Quadrafuzz({ lowGain: 0.6, midLowGain: 0.8, midHighGain: 0.5, highGain: 0.6 });
      drums.addEffect(quadrafuzz);
      return { drums, quadrafuzz };
    },
    play: ({ drums, quadrafuzz }, at) => {
      stage.show(() => show(quadrafuzz));
      drums.play();
      at(1.9, () => drums.stop());
    },
    variants: [
      {
        label: 'low band only',
        apply: ({ quadrafuzz: q }) => Object.assign(q, { lowGain: 1, midLowGain: 0, midHighGain: 0, highGain: 0 }),
      },
      {
        label: 'high band only',
        apply: ({ quadrafuzz: q }) => Object.assign(q, { lowGain: 0, midLowGain: 0, midHighGain: 0, highGain: 1 }),
      },
      { label: 'default mix', apply: () => undefined },
    ],
    controls: ({ quadrafuzz }, bar) => {
      show(quadrafuzz);
      tweak(
        bar,
        quadrafuzz,
        [['lowGain', 0, 1, 0.05], ['midLowGain', 0, 1, 0.05], ['midHighGain', 0, 1, 0.05], ['highGain', 0, 1, 0.05]],
        () => show(quadrafuzz),
      );
    },
  });
};

export default mount;
