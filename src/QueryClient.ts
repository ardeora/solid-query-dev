import {
  QueryClient as QueryCoreClient,
  QueryClientConfig as QueryCoreClientConfig,
  DefaultOptions as CoreDefaultOptions,
  QueryObserverOptions as QueryCoreObserverOptions,
  QueryOptions as QueryCoreOptions,
  DefaultError,
  QueryKey,
} from '@tanstack/query-core'

export interface QueryObserverOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = never,
> extends QueryCoreObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey, TPageParam> {
  /**
   * Set this to a reconciliation key to enable reconciliation between query results.
   * Set this to `false` to disable reconciliation between query results.
   * Set this to a function which accepts the old and new data and returns resolved data of the same type to implement custom reconciliation logic.
   * Defaults reconciliation key to `id`.
   */
  reconcile?: string | false | ((oldData: TData | undefined, newData: TData) => TData)
}

export interface DefaultOptions<TError = DefaultError> extends CoreDefaultOptions<TError> {
  queries?: QueryObserverOptions<unknown, TError>
}

export interface QueryClientConfig extends QueryCoreClientConfig {
  defaultOptions?: DefaultOptions
}

export class QueryClient extends QueryCoreClient {
  constructor(config: QueryClientConfig = {}) {
    super(config)
  }
}
