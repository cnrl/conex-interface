import { UseQueryOptions as RQUseQueryOptions } from '@tanstack/react-query';

export type UseQueryOptions<F extends (...args: any) => Promise<unknown>, S = Awaited<ReturnType<F>>> = Omit<
  RQUseQueryOptions<Awaited<ReturnType<F>>, any, S, any[]>,
  'queryKey'
>;
