import { useQuery } from "@tanstack/react-query"
import { getUser } from "../lib/api"
import { useAppSelector } from "../app/hooks";

const useUser = () => {
  const isGuest = useAppSelector(s => s.auth.isGuest);
  const {
    data: user,
    ...rest
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !isGuest,
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false
  })

  return { user, ...rest }
}

export default useUser