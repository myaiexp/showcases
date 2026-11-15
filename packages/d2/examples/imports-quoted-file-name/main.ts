// A file name with dots: quote it, since `.` targets an object in the file
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const files = {
  'schema-v0.1.2.d2': `users: {
  shape: sql_table
  id: int {constraint: primary_key}
  email: string
}`,
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      { label: 'schema: @"schema-v0.1.2" imports the file', files, code: 'schema: @"schema-v0.1.2"' },
      {
        label: 'Unquoted, the dots read as targets inside a file "schema-v0"',
        files,
        code: '# (deliberate error)\nschema: @schema-v0.1.2',
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
