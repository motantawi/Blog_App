import { QueryClient } from "react-query";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      suspense: true,
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

export default queryClient;
