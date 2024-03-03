import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private dbName: string = 'question_db';
  private dbVersion: number = 1;
  private db: IDBDatabase;

  constructor() {
    this.openDatabase();
  }

  openDatabase() {
    const request = indexedDB.open(this.dbName, this.dbVersion);
    request.onerror = (event) => {
      console.error("Error opening database");
    };
    request.onsuccess = (event) => {
      this.db = request.result;
      // Burada this.db değeri tanımlı olduğundan emin olun
    };
    request.onupgradeneeded = (event) => {
      this.db = request.result;
      const store = this.db.createObjectStore('data', { keyPath: 'id', autoIncrement: true });
    };
  }

  addData(data: any) {
    const transaction = this.db.transaction(['data'], 'readwrite');
    const store = transaction.objectStore('data');
    store.add(data);
  }

  getAllData() {
    const transaction = this.db.transaction(['data'], 'readonly');
    const store = transaction.objectStore('data');
    return store.getAll();
  }

  removeData(id: number) {
    const transaction = this.db.transaction(['data'], 'readwrite');
    const store = transaction.objectStore('data');
    store.delete(id);
  }

  clearAllData() {
    const transaction = this.db.transaction(['data'], 'readwrite');
    const store = transaction.objectStore('data');
    store.clear();
  }
}
