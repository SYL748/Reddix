import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPostByCommunityId } from "../lib/api";
import type { Order } from "../types/Order";

const usePostByCommunity = (id: string, order: Order) => {
    const {
        data: postBycommunity,
        isLoading: isPostByCommunityLoading,
        ...rest
    } = useQuery({
        queryKey: ["postByCommunity", id, order],
        queryFn: () => getPostByCommunityId(id, order),
        placeholderData: keepPreviousData,
        staleTime: Infinity,
        retry: false,
        refetchOnMount: false
    });
    return { postBycommunity, isPostByCommunityLoading, ...rest };
}

export default usePostByCommunity;