// Custom: a default value computed from the element itself
import { Leafer, Text, TextData } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';

class DynamicFillTextData extends TextData {}
class DynamicFillText extends Text {
  override get __tag(): string {
    return 'DynamicFillText';
  }
}
DynamicFillText.registerUI();
DynamicFillText.registerData(DynamicFillTextData as never);
DynamicFillText.changeAttr('fill', (text: Text) => (text.width === 50 ? 'blue' : 'red'));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Set the width to exactly 50: the default fill turns blue.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const text = new DynamicFillText({ x: 20, y: stage.height * 0.3, text: 'Welcome to LeaferJS', fontSize: stage.preview ? 18 : 28, textWrap: 'break', height: 90 });
  leafer.add(text);
  const say = label(stage, '', true);
  drive(stage, 'width', [30, 90, 10], 30, (v) => {
    text.width = v;
    say(`text.width = ${v}   text.fill = ${text.fill}`);
  }, 5);
  return stage.dispose;
};

export default mount;
