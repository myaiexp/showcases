// Storing photos and watching the browser's storage estimate climb, then fall again
import Dexie, { type EntityTable } from 'dexie';
import type { Mount } from '@/types.ts';
import { fmtBytes } from '../../shared/format.ts';
import { caption, columns } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tableView } from '../../shared/table-view.ts';
import { tour } from '../../shared/tour.ts';
import './style.css';

interface Photo {
  id: number;
  name: string;
  image: Blob;
}

/** A stand-in "photo": random bytes, so the browser cannot shrink it by compressing. */
function fakePhoto(kb: number): Blob {
  const bytes = new Uint8Array(kb * 1024);
  for (let i = 0; i < bytes.length; i += 65536) crypto.getRandomValues(bytes.subarray(i, i + 65536));
  return new Blob([bytes], { type: 'image/jpeg' });
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The estimate covers this whole site, and browsers update it a little late.' });
  const db = stage.own(new Dexie(stage.dbName('photos'))) as Dexie & { photos: EntityTable<Photo, 'id'> };
  db.version(1).stores({ photos: '++id, name' });

  const say = caption(stage.root);
  const [left, right] = columns(stage.root, 3, 2);
  tableView(stage, left!, { table: db.photos, columns: [{ field: 'id', width: '2.4em' }, 'name', { field: 'image', width: '6.5em' }] });
  const meter = document.createElement('div');
  meter.className = 'meter';
  const usage = document.createElement('div');
  usage.className = 'usage';
  const fill = document.createElement('div');
  fill.className = 'fill';
  const quota = document.createElement('div');
  quota.className = 'quota';
  meter.append(usage, fill, quota);
  right!.append(meter);

  // The docs' sample, shown on screen instead of the console.
  let base: number | null = null;
  async function showEstimatedQuota() {
    if (navigator.storage && navigator.storage.estimate) {
      const estimation = await navigator.storage.estimate();
      base ??= estimation.usage ?? 0;
      usage.textContent = `used ${fmtBytes(estimation.usage ?? 0)}`;
      quota.textContent = `of ${fmtBytes(estimation.quota ?? 0)}`;
      // The bar shows what this example added on top of what the site used at the start.
      const added = Math.max(0, (estimation.usage ?? 0) - base);
      fill.style.width = `${Math.min(100, (added / (4 * 1024 * 1024)) * 100)}%`;
    } else {
      usage.textContent = 'StorageManager not found';
    }
  }
  void showEstimatedQuota();
  stage.every(1000, () => void showEstimatedQuota());

  let n = 0;
  const addPhoto = {
    label: 'Store a 1 MB photo',
    run: async () => {
      n++;
      say.set(`Store photo ${n}: 1 MB of data.`, `db.photos.add({ name, image: blob })`);
      await db.photos.add({ name: `beach-${n}.jpg`, image: fakePhoto(1024) } as Photo);
    },
    hold: 2000,
  };
  tour(stage, [addPhoto, addPhoto, addPhoto, {
    label: 'Delete all photos',
    run: async () => {
      say.set('Delete them: the space comes back.', 'db.photos.clear()');
      await db.photos.clear();
    },
    hold: 3500,
  }]);
  say.set('Blobs go straight into the database.', 'navigator.storage.estimate()');

  return stage.dispose;
};

export default mount;
