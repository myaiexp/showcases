// Nested composition: each layer imported from its own file, with links
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const files = {
  'serviceB.d2': `aws vault: {
  key
  token
}
stripe: {
  customer id
}
aws vault.key -> data
aws vault.token -> data
stripe.customer id -> data
data.link: layers.data

layers: {
  data: @data
}`,
  'data.d2': `users: {
  shape: sql_table
  id: int
  token: string
  customer_id: string
}

# Continue nesting as needed!
# layers: {
#   ...
# }`,
};

const overview = `serviceA -> serviceB
serviceB.link: layers.serviceB

layers: {
  serviceB: @serviceB
}`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click serviceB, then data, to go down a layer.' });
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      { label: 'overview.d2 (click serviceB)', files, code: overview },
      { label: 'Layer serviceB, from serviceB.d2', files, code: overview, options: { target: 'layers.serviceB' } },
      {
        label: 'Layer data, from data.d2',
        files,
        code: overview,
        options: { target: 'layers.serviceB.layers.data' },
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
