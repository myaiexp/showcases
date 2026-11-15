// Layers: each layer starts blank, and links on shapes go one layer deeper
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const source = `explain: |md
  This is the top layer, highest level of abstraction.
| {
  near: top-center
}

Tik Tok's User Data: {
  link: layers.tiktok
}

layers: {
  tiktok: {
    explain: |md
      One layer deeper:

      Tik Tok's CEO explained that user data is stored in two places currently.
    | {
      near: top-center
    }
    Virginia data center <-> Hong Kong data center
    Virginia data center.link: layers.virginia
    Hong Kong data center.link: layers.hongkong

    layers: {
      virginia: {
        direction: right
        explain: |md
          Getting deeper into details:

          TikTok's CEO explains that Virginia data center has strict security measures.
        | {
          near: top-center
        }
        Oracle Databases: {
          shape: cylinder
          style.multiple: true
        }
        US residents -> Oracle Databases: access
        US residents: {
          shape: person
        }
        Third party auditors -> Oracle Databases: verify
      }
      hongkong: {
        direction: right
        explain: |md
          TikTok's CEO says data is actively being deleted and should be done by the end of the year.
        | {
          near: top-center
        }
        Legacy Databases: {
          shape: cylinder
          style.multiple: true
        }
      }
    }
  }
}`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a shape with a link icon to open its layer.' });
  playground(stage, {
    options: { themeID: 200 },
    interval: 3500,
    variants: [
      { label: 'Top layer', code: source },
      { label: 'layers.tiktok', code: source, options: { target: 'layers.tiktok' } },
      { label: 'layers.tiktok.layers.virginia', code: source, options: { target: 'layers.tiktok.layers.virginia' } },
      { label: 'layers.tiktok.layers.hongkong', code: source, options: { target: 'layers.tiktok.layers.hongkong' } },
    ],
  });
  return () => stage.dispose();
};

export default mount;
