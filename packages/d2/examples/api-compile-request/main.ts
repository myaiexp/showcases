// compile({ fs, inputPath }): several files in, inputPath picks the entry
import type { CompileRequest } from '@terrastruct/d2';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// A small project of D2 files, passed to compile as a path → content map.
const fs: CompileRequest['fs'] = {
  'shared.d2': `classes: {
  svc: {
    shape: hexagon
    style.fill: "#3b2f5c"
  }
}`,
  'frontend.d2': `...@shared
web.class: svc
web -> api: fetch`,
  'backend.d2': `...@shared
api.class: svc
db.shape: cylinder
api -> db: query`,
  'project.d2': `direction: right
frontend: @frontend
backend: @backend
frontend.api -> backend.api`,
};

const ENTRIES = ['project.d2', 'frontend.d2', 'backend.d2'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const d2 = await stage.d2();
  const panel = stage.side('fs');
  const pre = document.createElement('pre');
  pre.className = 'dd-pre';
  pre.textContent = Object.entries(fs)
    .map(([path, text]) => `# ${path}\n${text}`)
    .join('\n\n');
  panel?.append(pre);

  const draw = async (inputPath: string): Promise<void> => {
    try {
      const result = await d2.compile({ fs, inputPath, options: { themeID: 200, pad: 24 } });
      stage.show(await d2.render(result.diagram, result.renderOptions));
      stage.say(`compile({ fs, inputPath: '${result.inputPath}' }): ${Object.keys(result.fs).length} files in result.fs`);
    } catch (err) {
      stage.fail(err);
    }
  };

  if (stage.preview) {
    let i = 0;
    await draw(ENTRIES[0]!);
    stage.every(3000, () => void draw(ENTRIES[(i = (i + 1) % ENTRIES.length)]!));
  } else {
    stage.select('inputPath', ENTRIES, ENTRIES[0]!, (v) => void draw(v));
    await draw(ENTRIES[0]!);
  }
  return () => stage.dispose();
};

export default mount;
