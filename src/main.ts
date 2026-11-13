// App entry: routes the hash to the home, package or example view

import './styles/app.css';
import { findPackage } from './registry.ts';
import { onRouteChange } from './router.ts';
import { renderExample } from './views/example.ts';
import { renderHome } from './views/home.ts';
import { renderPackage } from './views/package.ts';

const root = document.getElementById('app');
if (!root) throw new Error('index.html has no #app element');

let teardown = (): void => {};

onRouteChange((route) => {
  teardown();
  window.scrollTo(0, 0);
  switch (route.view) {
    case 'home':
      document.title = 'Showcases';
      teardown = renderHome(root);
      break;
    case 'package': {
      const pkg = findPackage(route.pkg);
      document.title = `${pkg?.name ?? 'Not found'} · Showcases`;
      teardown = renderPackage(root, pkg);
      break;
    }
    case 'example': {
      const pkg = findPackage(route.pkg);
      document.title = `${pkg?.name ?? 'Not found'} · Showcases`;
      teardown = renderExample(root, pkg, route.example);
      break;
    }
  }
});
