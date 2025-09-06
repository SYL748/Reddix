import { QueryClient, type DefaultOptions } from "@tanstack/react-query"

const defaultQueryOptions: DefaultOptions = {
  queries: {
    retry: false
  }
}

const queryClient = new QueryClient({
    defaultOptions: defaultQueryOptions
})

export default queryClient