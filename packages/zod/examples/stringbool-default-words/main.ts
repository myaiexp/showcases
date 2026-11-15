// z.stringbool(): the built-in yes and no words, any capitalisation
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { schemaTour } from '../../shared/schema-tour.ts';
import { createStage } from '../../shared/stage.ts';

const Flag = z.stringbool();

const WORDS = ['yes', 'ON', 'enabled', '1', 'no', 'Off', 'disabled', '0', 'maybe', ''];
const WORDS_CARD = ['yes', 'ON', '1', 'Off', 'maybe', ''];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  schemaTour(stage, [{ label: 'z.stringbool()', code: 'z.stringbool()', schema: Flag, say: 'Known words become true or false whatever their case; anything else is rejected' }], {
    inputs: WORDS,
    cardInputs: WORDS_CARD,
    types: true,
    inTitle: 'Text',
    outTitle: 'Becomes',
  });
  return stage.dispose;
};

export default mount;
