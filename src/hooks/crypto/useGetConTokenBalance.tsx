import { useQuery } from "react-query";

import useCurrentUser from "../useCurrentUser";

import instance from "../../axios/instance";

import { FcnTypes, ORG_NAME } from "../../const";

function useGetConTokenBalance() {
  const { currentUser, isLoading: isLoadingUser } = useCurrentUser();

  const { data, isLoading, refetch, isFetching } = useQuery(
    "balance",
    async () => {
      if (!!currentUser && !isLoadingUser) {
        const { data } = await instance.get(
          `/con-token/channels/mychannel/chaincodes/${process.env.REACT_APP_SMART_CONTRACT}?walletAddress=${currentUser?.walletAddress}&orgName=${ORG_NAME}&fcn=${FcnTypes.BalanceOf}`
        );
        return data;
      } else {
        return undefined;
      }
    },
    {
      enabled: !!currentUser && !!currentUser.walletAddress && !isLoadingUser,
      cacheTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
    }
  );

  return {
    balance: data,
    loading: isLoading,
    refetch,
    isFetching,
  };
}

export default useGetConTokenBalance;
