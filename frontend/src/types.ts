export type Result<T, E> = [T, null] | [null, E];
export type AsyncResult<T, E> = Promise<Result<T, E>>;

export type Recipe = {
  name: string;
  description: string;
  ingredients: string[];
  music_genre?: string;
};