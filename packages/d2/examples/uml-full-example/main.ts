// A class diagram of a bank and its ATMs, laid out with ELK.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200, layout: 'elk' },
    variants: [
      {
        label: 'Banking',
        code: `DebitCard: Debit card {
  shape: class
  +cardno
  +ownedBy

  +access()
}

Bank: {
  shape: class
  +code
  +address

  +manages()
  +maintains()
}

Customer: {
  shape: class
  +name
  +address

  +owns()
}

Account: {
  shape: class
  +type
  +owner
}

Customer -> Account: owns
Bank -> Customer: has
DebitCard -> Account: debits
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
