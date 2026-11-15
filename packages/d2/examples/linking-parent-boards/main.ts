// Linking back up: `_` in a link value means the parent board, `_._` its parent
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const source = `The shire

journey: {
  link: layers.rivendell
}

layers: {
  rivendell: {
    elves: {
      elrond -> frodo: gives advice
    }

    take me home sam.link: _
    go deeper: {
      link: layers.moria
    }

    layers: {
      moria: {
        dwarves

        take me home sam.link: _._
      }
    }
  }
}`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click journey, go deeper, then take me home sam.' });
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      { label: 'The shire (root)', code: source },
      { label: 'Rivendell: "take me home sam" links to _ (the root)', code: source, options: { target: 'layers.rivendell' } },
      {
        label: 'Moria: "take me home sam" links to _._ (two boards up)',
        code: source,
        options: { target: 'layers.rivendell.layers.moria' },
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
