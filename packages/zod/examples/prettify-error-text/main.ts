// z.prettifyError writes every issue as a ready-to-print text block, with its path under it
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { drive } from '../../shared/drive.ts';
import { textBlock } from '../../shared/error-format-view.ts';
import { columns } from '../../shared/side-by-side.ts';
import { createStage } from '../../shared/stage.ts';
import { valueView } from '../../shared/value-view.ts';
import { codeLine, plural } from '../../shared/widgets.ts';

const Config = z.strictObject({
  port: z.number().int().min(1024),
  host: z.string().min(1),
  tls: z.object({ cert: z.string(), key: z.string() }).optional(),
});

const SAMPLES = [
  { label: 'Port as text', value: { port: '8080', host: 'localhost' } },
  { label: 'Several wrong', value: { port: 80, host: '', debug: true } },
  { label: 'tls half set', value: { port: 8443, host: 'example.org', tls: { cert: 'cert.pem' } } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a config file: the right side is exactly the string prettifyError returns.' });
  codeLine(stage.root, 'console.log(z.prettifyError(result.error))');
  const cols = columns(stage.root, stage.preview ? [''] : ['The config', 'Printed']);
  const text = cols[stage.preview ? 0 : 1]!;
  drive(stage, SAMPLES, (value) => {
    const result = Config.safeParse(value);
    if (result.success) return;
    if (!stage.preview) cols[0]!.body.replaceChildren(valueView(value, { issues: result.error.issues }));
    text.body.replaceChildren(textBlock(z.prettifyError(result.error)));
    stage.say(`✗ ${plural(result.error.issues.length, 'issue')} as one printable block: "→ at" names the path`, 'bad');
  });
  return stage.dispose;
};

export default mount;
