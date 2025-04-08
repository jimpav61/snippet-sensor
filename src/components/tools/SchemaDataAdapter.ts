
// This file is kept as a placeholder but no longer used in the application.
// The functionality has been replaced with react-schemaorg, which doesn't require
// these adapter patterns.

// Empty placeholder for backward compatibility
export function adaptSchemaData<T extends Record<string, any>>(data: T): T {
  return data;
}

export function adaptSchemaArray<T extends Record<string, any>>(dataArray: T[]): T[] {
  return dataArray;
}

export function deepAdaptSchema(obj: any): any {
  return obj;
}

export function initializeSchemaAdapter() {
  console.log('Schema adapter no longer used - using react-schemaorg instead');
}
