// Custom: a new attribute whose default depends on the element's width
import { Leafer, Rect, Text, TextData, dataType } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';

class FloatText extends Text {
  override get __tag(): string {
    return 'FloatText';
  }
  declare float: string;
}
class FloatTextData extends TextData {}
FloatText.registerUI();
FloatText.registerData(FloatTextData as never);
FloatText.addAttr('float', (text: Text) => (text.width === 200 ? 'center' : 'left'), dataType);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the width onto 200 and the computed float default flips. The second text sets its own value.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const fs = stage.preview ? 16 : 22;
  const dynamic = new FloatText({ x: 16, y: 24, text: 'dynamic', fontSize: fs, fill: '#333' });
  const fixed = new FloatText({ x: 16, y: stage.height * 0.5, text: 'float set: right', fontSize: fs, fill: '#333', float: 'right' } as never);
  const marker = new Rect({ y: 16, height: 4, fill: '#32cd79' });
  leafer.add([dynamic, fixed, marker]);
  const say = label(stage, '', true);

  drive(stage, 'width', [140, 260, 10], 140, (v) => {
    dynamic.width = v;
    marker.set({ x: 16, width: v });
    say(`dynamic.float = ${dynamic.float}   fixed.float = ${fixed.float}`);
  }, 6);
  return stage.dispose;
};

export default mount;
