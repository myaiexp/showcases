// Version history: two versions of users.d2 imported side by side
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const files = {
  'users-v0.1.d2': `users: {
  shape: sql_table
  id: int {constraint: primary_key}
  email: string
  name: string
  verified_email: boolean
  password: string
  created_at: timestamp
}`,
  'users-current.d2': `users: {
  shape: sql_table
  id: int {constraint: primary_key}
  email: int {constraint: foreign_key}
  name: string
  password: text
  created_at: timestamp
  last_updated: timestamp
}

emails: {
  shape: sql_table
  id: int {constraint: [primary_key; unique]}
  local: string
  domain: string
  verified: boolean
}
users.email -> emails.id`,
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'history.d2: v0.1 next to the current schema',
        files,
        code: `direction: right
Users 1: Users Table (v0.1) {
  ...@"users-v0.1"
}

Users 2: Users Table (current) {
  ...@users-current
}

Users 1 -> Users 2`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
