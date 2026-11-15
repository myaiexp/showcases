// Declaring a shape again merges into the old one; the latest label wins.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Last label wins',
        code: `visual studio code text editor
visual studio code text editor: visual_studio_code_text_editor
# Remember that shape keys are case insensitive
visual studio CODE text editor: VisualStudioCodeTextEditor
visual studio code TEXT editor: Visual Studio Code Text Editor
visual STUDIO code text editor
`,
      },
      {
        label: 'Containers merge children',
        code: `aws_s3: AWS S3 California {
  Monitoring -> California
}
aws_s3: "AWS S3 San Francisco, California" {
  California.San Francisco
}

# Equal to:
# aws_s3: "AWS S3 San Francisco, California" {
#   Monitoring -> California
#   California.San Francisco
# }
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
