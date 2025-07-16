import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

function useGetGuildId(guildName: string, worldName: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["guild", guildName, worldName],
    queryFn: async () => {
      const res = await axios.get("/api/maple/guild/id", {
        params: { guildName, worldName },
      });
      return res.data;
    },
  });
  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  }, [data, isLoading, error]);
  return { data, isLoading, error };
}
export default useGetGuildId;
