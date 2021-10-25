import { useQuery } from "react-query";
import { METACON_LOGIN } from "src/const";
import { getChromeStorage } from "src/helpers/chromeStorage";
import useStore from "src/store/store";
import { LoginPackage } from "src/types";

function useExtensionLogin(){

  const setStoreAuthToken = useStore((state) => state.setAuthToken);
  const setEtherKey = useStore((state) => state.setEtherKey);

   const {data, isLoading, isError} = useQuery("EXT_LOGIN", async ()=> {

      const res = await getChromeStorage(METACON_LOGIN);
      return res as LoginPackage
    },{
      onSuccess: (loginPackage:LoginPackage)=> {
        setStoreAuthToken(loginPackage.webAppAuthToken);
        setEtherKey(loginPackage.webAppSuperKey);
      }
    })

    return {
      loginPackage: data,
      isLoading,
      isError
    }



}

export default useExtensionLogin
