import { useQuery } from "@tanstack/react-query"
import { getCommunityById } from "../lib/api";

const useCommunityById = (id:string) => {
  const {
    data: communityById,
    isLoading: isCommunityByIdLoading,
    ...rest
  } = useQuery({
    queryKey: ["community", id],
    queryFn: ()=>getCommunityById(id),
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false
  });
  return { communityById, isCommunityByIdLoading, ...rest };
};

export default useCommunityById;