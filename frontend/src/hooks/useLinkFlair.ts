import { useQuery } from "@tanstack/react-query"
import { getLinkFlair } from "../lib/api";

const useLinkFlair = () => {
  const {
    data: linkFlair,
    ...rest
  } = useQuery({
    queryKey: ["linkFlair"],
    queryFn: getLinkFlair,
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false
  });
  return { linkFlair, ...rest };
};

export default useLinkFlair;