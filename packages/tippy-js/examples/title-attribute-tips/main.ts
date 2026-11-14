// Existing title attributes become Tippy tips: a content() function and a plugin version
import tippy, { type Plugin, type Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

// The docs' plugin: read the title once, hand it to Tippy and remove the attribute.
const titleAttribute: Plugin = {
  name: 'titleAttribute',
  defaultValue: true,
  fn() {
    return {
      onCreate(instance) {
        if (!(instance.props as Props & { titleAttribute?: boolean }).titleAttribute) return;
        const title = instance.reference.getAttribute('title');
        if (title) {
          instance.setContent(title);
          instance.reference.removeAttribute('title');
        }
      },
    };
  },
};

const BUTTONS = [
  { label: 'B', title: 'Bold (Ctrl+B)' },
  { label: 'I', title: 'Italic (Ctrl+I)' },
  { label: 'U', title: 'Underline' },
  { label: '↶', title: 'Undo the last change' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    height: 260,
    hint: 'Hover the buttons: the same title text, shown by Tippy in both rows.',
  });

  const group = (caption: string): HTMLButtonElement[] => {
    const wrap = document.createElement('div');
    wrap.className = 'group';
    const cap = document.createElement('div');
    cap.className = 'cap';
    cap.textContent = caption;
    const row = document.createElement('div');
    row.className = 'tools';
    const buttons = BUTTONS.map((b) => {
      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.textContent = b.label;
      btn.setAttribute('title', b.title);
      row.append(btn);
      return btn;
    });
    wrap.append(cap, row);
    stage.root.append(wrap);
    return buttons;
  };

  const first = group(stage.preview ? 'title="..." becomes a tip' : 'A content() function reads the title');
  stage.own(
    tippy(first, {
      content(reference) {
        const title = reference.getAttribute('title') ?? '';
        // Without this the browser's own tooltip would appear as well.
        reference.removeAttribute('title');
        return title;
      },
      placement: 'bottom',
      maxWidth: 170,
      appendTo: stage.root,
    }),
  );

  if (!stage.preview) {
    const second = group('The same, as a reusable plugin');
    stage.own(tippy(second, { plugins: [titleAttribute], placement: 'bottom', appendTo: stage.root }));
  }

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const i of [0, 3, 1]) {
        await stage.ghost.hover(first[i]!, 650);
        await wait(1000);
      }
      stage.ghost.leave();
      await stage.ghost.moveTo({ x: 220, y: 170 }, 500);
      await wait(300);
    });
  }

  return stage.dispose;
};

export default mount;
