// walkTokens checks every image for alt text and lists the bad ones
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { esc } from '../../shared/renderer-kit.ts';

const REPORT = `# Camping report

![Lake at dawn](img/lake.jpg)
Our tent by the shore.

![](img/tent.jpg)

![ ](img/fire.jpg "Campfire")

![Map of the route](img/map.png)`;

const CARD = `![Lake at dawn](a.jpg)

![](b.jpg)

![Route map](c.png)
![](d.png)`;

interface Check {
  href: string;
  alt: string;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Fill in or empty the [...] part of an image' });

  let checks: Check[] = [];
  const m = new Marked({
    walkTokens(token) {
      if (token.type !== 'image') return;
      const check = { href: token.href, alt: token.text.trim() };
      checks.push(check);
      if (check.alt) return;
      // Turn the image token into an inline HTML token: red outline plus a label.
      Object.assign(token, {
        type: 'html',
        block: false,
        text: `<span><img src="${esc(token.href)}" alt="" style="outline:3px solid #e5484d;outline-offset:2px;max-height:60px"> <small style="color:#e5484d">no alt text</small></span>`,
      });
    },
  });

  liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : REPORT }],
    output: 'Page + accessibility check',
    caption:
      'Pictures with an empty description are outlined in red, because a screen reader has nothing to say about them. The check list at the bottom was gathered by the same walkTokens pass.',
    render(md) {
      checks = [];
      const html = m.parse(md, { async: false });
      const bad = checks.filter((c) => !c.alt).length;
      const rows = checks
        .map((c) => `<li>${c.alt ? '✅' : '❌'} <code>${esc(c.href)}</code> ${c.alt ? esc(c.alt) : '<em>needs a description</em>'}</li>`)
        .join('');
      return `${html}<h4>Alt text check: ${bad ? `${bad} of ${checks.length} images need one` : 'all good'}</h4><ul style="list-style:none;padding-left:0">${rows}</ul>`;
    },
  });

  return () => stage.dispose();
};

export default mount;
