// z.stringbool({ truthy, falsy }): custom words replace the defaults
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { schemaTour } from '../../shared/schema-tour.ts';
import { createStage } from '../../shared/stage.ts';

const Default = z.stringbool();
const Spanish = z.stringbool({ truthy: ['si', 'verdadero'], falsy: ['no', 'falso'] });

const INPUTS = ['si', 'SI', 'verdadero', 'no', 'falso', 'yes', 'true', 'off'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  schemaTour(
    stage,
    [
      { label: 'default words', code: 'z.stringbool()', schema: Default, say: 'Default words: yes, true and off work, si and verdadero do not' },
      { label: 'custom words', code: "z.stringbool({ truthy: ['si', …], falsy: ['no', …] })", schema: Spanish, say: 'Custom lists replace the defaults: yes, true and off no longer work' },
    ],
    { inputs: INPUTS, cardInputs: ['si', 'SI', 'no', 'yes', 'true', 'off'], types: true, inTitle: 'Text', outTitle: 'Becomes' },
  );
  return stage.dispose;
};

export default mount;
