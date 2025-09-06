import { useQuery } from "@tanstack/react-query"
import { getCommunity } from "../lib/api";

const useCommunity = () => {
  const {
    data: community,
    ...rest
  } = useQuery({
    queryKey: ["community"],
    queryFn: getCommunity,
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false
  });
  return { community, ...rest };
};

export default useCommunity;