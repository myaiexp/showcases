// getItemProps(props, extKeys): the two halves, printed for each choice of extKeys
import { getItemProps } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const PROPS = {
  x: 40,
  y: 10,
  width: 200,
  fill: '#61DDAA',
  indexes: [0],
  data: { items: [] },
  datum: { label: 'Plan' },
  themeColors: { colorPrimary: '#1783FF' },
  positionH: 'normal',
  label: 'Plan',
  gap: 12,
};
const CHOICES: string[][] = [[], ['gap'], ['label', 'gap'], ['width', 'fill']];

const chips = (host: HTMLElement, keys: string[], tone: string) => {
  for (const key of keys) {
    const c = document.createElement('span');
    c.textContent = key;
    c.style.cssText = `display:inline-block;margin:2px;padding:1px 7px;border-radius:10px;font:11px monospace;color:#111;background:${tone}`;
    host.append(c);
  }
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 300 });
  stage.box.style.cssText += ';display:flex;flex-direction:column;gap:8px;padding:8px;background:#161618;overflow:auto';
  const sections = ['ext (first element)', 'rest (second element)'].map((title) => {
    const block = document.createElement('div');
    block.style.cssText = 'font:11px sans-serif;color:#aaa';
    block.textContent = title;
    const row = document.createElement('div');
    block.append(row);
    stage.box.append(block);
    return row;
  });
  const extRow = sections[0] as HTMLElement;
  const restRow = sections[1] as HTMLElement;
  const input = document.createElement('div');
  input.style.cssText = 'font:11px sans-serif;color:#aaa';
  stage.box.prepend(input);

  stage.cycle(
    CHOICES.map((extKeys) => ({
      say: `getItemProps(props, ${JSON.stringify(extKeys)})`,
      run: () => {
        const [ext, rest] = getItemProps(PROPS as never, extKeys);
        extRow.replaceChildren();
        restRow.replaceChildren();
        input.textContent = `props keys: ${Object.keys(PROPS).length}, extKeys: ${JSON.stringify(extKeys)}`;
        chips(extRow, Object.keys(ext), '#F6BD16');
        chips(restRow, Object.keys(rest), '#61DDAA');
      },
      hold: ctx.preview ? 1500 : 2400,
    })),
  );
  return () => stage.dispose();
};

export default mount;
