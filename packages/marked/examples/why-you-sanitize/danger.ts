// HTML source view that paints script tags, event handlers and javascript: URLs red
import type { Stage } from '../../shared/stage.ts';

const DANGER = /(<script[\s\S]*?<\/script>|\son\w+="[^"]*"|\son\w+='[^']*'|javascript:[^"'\s>]*)/gi;

export function dangerPane(stage: Stage, label: string): { el: HTMLElement; show(html: string): void } {
  const box = document.createElement('div');
  box.className = 'mk-pane';
  const l = document.createElement('div');
  l.className = 'mk-label';
  l.textContent = label;
  const pre = document.createElement('pre');
  pre.className = 'mk-html';
  box.append(l, pre);
  return {
    el: box,
    show(html) {
      pre.replaceChildren();
      for (const part of html.trim().split(DANGER)) {
        if (!part) continue;
        if (DANGER.test(part)) {
          const bad = document.createElement('mark');
          bad.className = 'danger';
          bad.textContent = part;
          pre.append(bad);
        } else pre.append(part);
        DANGER.lastIndex = 0;
      }
      if (stage.preview) pre.scrollTop = pre.scrollHeight;
    },
  };
}
