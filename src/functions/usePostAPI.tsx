import { useState, useCallback } from "react";
import { decodeAndRetrieve } from "./functions";
import { ENDPOINT } from "./useGetAPI";
const token = decodeAndRetrieve('token');

export const usePostAPI = <BodyData, ResponseData>(
  url: string
): {
  post: (data: BodyData) => Promise<void>;
  loading: boolean;
  error: string | null;
  responseData: ResponseData | null;
} => {

  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const post = useCallback(
      async (data: BodyData) => {
        setLoading(true)

      try {
        setLoading(true);

        const response = await fetch(ENDPOINT + url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        const json = await response.json();

        setResponseData(json);
        setLoading(false);

      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    },
    [url]
  );

  return { responseData, loading, error, post };
};