// Model-view: models defined once in models.d2, each view spreads them in
import type { Mount } from '@/types.ts';
import { icons } from '../../shared/icons.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const files = {
  'models.d2': `postgres: {
  shape: cylinder
  icon: "${icons.database}"
  icon.near: bottom-center
}
it: IT Guy {
  shape: person
  style: {
    fill: maroon
  }
}
vpn: {
  style: {
    shadow: true
  }
  tooltip: IP is 192.2.2.1
}`,
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      { label: 'access-view.d2: the IT guy goes through the VPN', files, code: '...@models\nit -> vpn -> postgres' },
      { label: 'ssh-view.d2: the same models, another path', files, code: '...@models\nit -> postgres: ssh, bypassing VPN' },
    ],
  });
  return () => stage.dispose();
};

export default mount;
