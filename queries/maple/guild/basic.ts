import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

const useGetGuildBasic = (guildId: string) => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["guild", guildId],
    queryFn: async () => {
      const res = await axios.get("/api/maple/guild/basic", {
        params: { guildId },
      });
      return res.data;
    },
    enabled: !!guildId,
  });
  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  }, [data, isLoading, error]);
  return { data, isLoading, error, isSuccess };
};
export default useGetGuildBasic;
