import { useQuery, UseQueryResult } from "react-query";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { refreshApi } from "@/apis/refresh.api";

export function useRefresh<TData, TError>(
  queryResult: UseQueryResult<TData, TError>
) {
  const { pathname, replace } = useRouter();
  const {
    isError: unauthorized,
    refetch: refresh,
    isSuccess: refreshSuccessfully,
    isFetchedAfterMount: isRefreshed,
  } = useQuery("refresh", refreshApi, { enabled: false, retry: false });

  const { isError, refetch, isFetched } = queryResult;

  useEffect(() => {
    if (
      unauthorized &&
      pathname !== "/login" &&
      pathname !== "/confirm-email" &&
      pathname !== "/forgot-password" &&
      pathname !== "/reset-password" &&
      pathname !== "/register" &&
      pathname !== "/register-confirmation"
    ) {
      replace("/login");
    }
  }, [unauthorized]);

  useEffect(() => {
    if (refreshSuccessfully) {
      refetch();
    }
  }, [refreshSuccessfully, isRefreshed]);

  useEffect(() => {
    if (isError && isFetched) {
      refresh();
    }
  }, [isError, isFetched]);
}
