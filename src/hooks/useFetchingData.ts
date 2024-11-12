import { useQuery } from "react-query";

export const useFetchingData = (queryKey: string, asyncFunc: any) => {
  const {
    isLoading,
    error,
    data,
  }: { isLoading: boolean; error: any; data: any } = useQuery(
    queryKey,
    asyncFunc
  );

  return { isLoading, error, data };
};
