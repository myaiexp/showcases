// z.stringbool({ case: 'sensitive' }) against the default case-insensitive form
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { schemaTour } from '../../shared/schema-tour.ts';
import { createStage } from '../../shared/stage.ts';

const Loose = z.stringbool();
const Exact = z.stringbool({ case: 'sensitive' });

const INPUTS = ['true', 'True', 'TRUE', 'yes', 'YES', 'false', 'False', 'OFF'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  schemaTour(
    stage,
    [
      { label: 'case-insensitive', code: 'z.stringbool()', schema: Loose, say: 'Default: capitals are ignored, all eight spellings are understood' },
      { label: "case: 'sensitive'", code: "z.stringbool({ case: 'sensitive' })", schema: Exact, say: "With case: 'sensitive' only the lower-case words in the lists match" },
    ],
    { inputs: INPUTS, cardInputs: ['true', 'True', 'TRUE', 'yes', 'YES', 'False'], types: true, inTitle: 'Text', outTitle: 'Becomes' },
  );
  return stage.dispose;
};

export default mount;
