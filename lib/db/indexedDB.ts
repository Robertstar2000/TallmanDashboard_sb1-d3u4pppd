'use client';

import { initialData } from './initial-data';

const DB_NAME = 'dashboardDB';
const DB_VERSION = 1;
const STORE_NAME = 'variables';

export interface DashboardVariable {
  id: number;
  name: string;
  value: string;
  calculation: string;
  sqlExpression: string;
  chartGroup: string;
}

let dbInstance: IDBDatabase | null = null;

async function getDB(): Promise<IDBDatabase> {
  if (dbInstance) return dbInstance;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

async function initializeDatabase(): Promise<void> {
  const db = await getDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    store.clear().onsuccess = () => {
      let completed = 0;
      initialData.forEach(variable => {
        const request = store.add(variable);
        request.onsuccess = () => {
          completed++;
          if (completed === initialData.length) {
            resolve();
          }
        };
        request.onerror = () => reject(request.error);
      });
    };
  });
}

export async function getAllVariables(): Promise<DashboardVariable[]> {
  const db = await getDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const variables = request.result;
      if (variables.length === 0) {
        initializeDatabase().then(() => {
          getAllVariables().then(resolve).catch(reject);
        }).catch(reject);
      } else {
        resolve(variables);
      }
    };
    
    request.onerror = () => reject(request.error);
  });
}

export async function updateVariable(id: number, field: string, value: string): Promise<boolean> {
  const db = await getDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const request = store.get(id);
    
    request.onsuccess = () => {
      const variable = request.result;
      if (variable) {
        variable[field] = value;
        store.put(variable).onsuccess = () => {
          resolve(true);
        };
      } else {
        resolve(false);
      }
    };
    
    request.onerror = () => reject(request.error);
  });
}

export async function getVariablesByGroup(group: string): Promise<DashboardVariable[]> {
  const allVariables = await getAllVariables();
  return allVariables.filter(v => v.chartGroup === group);
}

// Initialize the database when this module loads
if (typeof window !== 'undefined') {
  getDB().then(() => {
    getAllVariables().catch(console.error);
  });
}