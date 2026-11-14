// A roles enum, then exclude() and extract() derive narrower ones
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { schemaTour } from '../../shared/schema-tour.ts';
import { createStage } from '../../shared/stage.ts';

const Role = z.enum(['owner', 'admin', 'editor', 'viewer']);
const SignUp = Role.exclude(['owner', 'admin']);
const Staff = Role.extract(['owner', 'admin']);

const list = (e: { enum: Record<string, string> }): string => Object.values(e.enum).join(', ');
const INPUTS = ['owner', 'admin', 'editor', 'viewer', 'guest'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same five role names go through each schema.' });
  schemaTour(
    stage,
    [
      { label: 'Role', code: "Role = z.enum(['owner', 'admin', 'editor', 'viewer'])", schema: Role, say: `Role accepts ${list(Role)}` },
      { label: 'exclude(): sign-up roles', code: "Role.exclude(['owner', 'admin'])", schema: SignUp, say: `exclude() leaves ${list(SignUp)}: what a visitor may pick` },
      { label: 'extract(): staff roles', code: "Role.extract(['owner', 'admin'])", schema: Staff, say: `extract() keeps only ${list(Staff)}` },
    ],
    { inputs: INPUTS, inTitle: 'Role', outTitle: 'Zod says', ms: 3200 },
  );
  return stage.dispose;
};

export default mount;
