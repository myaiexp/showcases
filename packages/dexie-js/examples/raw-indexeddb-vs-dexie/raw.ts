// The task done with the browser's own IndexedDB API: events, callbacks, two error paths
export interface Friend {
  name: string;
  age: number;
}

export function rawFindAdults(dbName: string, friends: Friend[]): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const open = indexedDB.open(dbName, 1);
    open.onupgradeneeded = () => {
      const store = open.result.createObjectStore('friends', { keyPath: 'id', autoIncrement: true });
      store.createIndex('age', 'age');
    };
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      const db = open.result;
      const tx = db.transaction('friends', 'readwrite');
      const store = tx.objectStore('friends');
      for (const friend of friends) {
        const req = store.add(friend);
        req.onerror = () => reject(req.error);
      }
      const names: string[] = [];
      const cursorReq = store.index('age').openCursor(IDBKeyRange.bound(20, 60));
      cursorReq.onsuccess = () => {
        const cursor = cursorReq.result;
        if (cursor) {
          names.push((cursor.value as Friend).name);
          cursor.continue();
        }
      };
      cursorReq.onerror = () => reject(cursorReq.error);
      tx.oncomplete = () => {
        db.close();
        resolve(names);
      };
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    };
  });
}
