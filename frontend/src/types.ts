type SuccessResult<T> = {
  success: true;
  data: T;
};

type FailureResult<E> = {
  success: false;
  error: E;
};

export type Result<T, E> = SuccessResult<T> | FailureResult<E>;
export type AsyncResult<T, E> = Promise<Result<T, E>>;

export type Recipe = {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  music_genre?: string;
};