/**
 * Common TypeScript Utility Types
 */

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}
