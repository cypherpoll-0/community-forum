"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/redux/hooks";
import { setUser, clearUser } from "@/redux/slices/userSlice";
import { UserState } from "@/types/userState.types";

export function AuthSync({ children }: { children: React.ReactNode }) {
  const { data: sessionData, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "authenticated" && sessionData?.user) {
      const { name, email, image } = sessionData.user;
      const id = (sessionData.user as UserState).id ?? "";
      dispatch(setUser({ id, name: name ?? "", email: email ?? "", image: image ?? "" }));
    } else if (status === "unauthenticated") {
      dispatch(clearUser());
    }
  }, [sessionData, status, dispatch]);

  return <>{children}</>;
}
