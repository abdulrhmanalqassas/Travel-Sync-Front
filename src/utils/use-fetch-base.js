import { useCallback } from "react";
import { mockFetchResponse } from "../mocks/mockApi";

function useFetchBase() {
  return useCallback(async (input, init, tokens) => {
    return mockFetchResponse(input, init, tokens);
  }, []);
}

export default useFetchBase;
