import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setCredentials, setAccessToken, logout } from "./authSlice";
import { useRefreshMutation, useLazyGetMeQuery } from "./authApi";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [refresh] = useRefreshMutation();
  const [getMe] = useLazyGetMeQuery();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function tryRestoreSession() {
      try {
        const refreshResult = await refresh().unwrap();

        // Put the new token into Redux BEFORE calling getMe,
        // so prepareHeaders can actually attach it
        dispatch(setAccessToken(refreshResult.data.accessToken));

        const userResult = await getMe().unwrap();

        dispatch(
          setCredentials({
            user: userResult.data,
            accessToken: refreshResult.data.accessToken,
          }),
        );
      } catch {
        dispatch(logout());
      } finally {
        setIsChecking(false);
      }
    }

    tryRestoreSession();
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
