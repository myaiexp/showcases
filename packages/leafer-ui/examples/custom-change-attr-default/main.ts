// Custom: changing the default fill of one Text class
import { Leafer, Text, TextData } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';

// A subclass with its own data class, so the change does not reach every Text on the page.
class RedDefaultTextData extends TextData {}
class RedDefaultText extends Text {
  override get __tag(): string {
    return 'RedDefaultText';
  }
}
RedDefaultText.registerUI();
RedDefaultText.registerData(RedDefaultTextData as never);
RedDefaultText.changeAttr('fill', 'red'); // the docs call Text.changeAttr('fill', 'red')

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Neither text sets a fill. The subclass reads its new default, plain Text keeps the old one.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const size = stage.preview ? 20 : 30;
  const plain = new Text({ x: 20, y: stage.height * 0.22, text: 'Text: default fill', fontSize: size });
  const red = new RedDefaultText({ x: 20, y: stage.height * 0.5, text: 'Subclass: changeAttr', fontSize: size });
  leafer.add([plain, red]);
  const say = label(stage, '', true);
  say(`plain.fill = ${JSON.stringify(plain.fill)}\nred.fill = ${JSON.stringify(red.fill)}`);
  return stage.dispose;
};

export default mount;
