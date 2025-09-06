import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getPost } from "../lib/api";
import type { Order } from "../types/Order";

const usePost = (order: Order, search = "") => {
  const {
    data: post,
    ...rest
  } = useQuery({
    queryKey: ["posts", order, search?.trim()],
    queryFn: () => getPost({ order, search }),
    staleTime: Infinity,
    placeholderData: keepPreviousData,
    retry: false,
    refetchOnMount: false
  });
  return { post, ...rest }
};

export default usePost