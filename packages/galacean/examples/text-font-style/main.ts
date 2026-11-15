// TextRenderer.fontStyle: None, Bold, Italic and Bold | Italic
import { FontStyle, TextRenderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { scene2d } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await scene2d(el, ctx, { size: 4 });
  const styles: [string, FontStyle][] = [['None', FontStyle.None], ['Bold', FontStyle.Bold], ['Italic', FontStyle.Italic], ['Bold | Italic', FontStyle.Bold | FontStyle.Italic]];
  styles.forEach(([name, style], i) => {
    const t = root.createChild(name).addComponent(TextRenderer);
    t.entity.transform.setPosition(0, 1.35 - i * 0.7, 0);
    t.text = `FontStyle.${name}`;
    t.fontSize = 38;
    t.fontStyle = style;
  });
  if (!stage.preview) {
    const live = root.createChild('live').addComponent(TextRenderer);
    live.entity.transform.setPosition(0, -1.55, 0);
    live.fontSize = 24;
    let flags = 0;
    const apply = (): void => {
      live.fontStyle = flags;
      live.text = `live: fontStyle = ${flags}`;
    };
    checkbox(stage.bar, 'Bold', false, (v) => ((flags = v ? flags | FontStyle.Bold : flags & ~FontStyle.Bold), apply()));
    checkbox(stage.bar, 'Italic', false, (v) => ((flags = v ? flags | FontStyle.Italic : flags & ~FontStyle.Italic), apply()));
    apply();
  }
  return stage.dispose;
};

export default mount;
