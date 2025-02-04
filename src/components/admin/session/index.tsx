"use client";

import { SessionProvider } from "next-auth/react";
type TProps = {
  children: React.ReactNode;
};
function SessionWrapper({ children }: TProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
export default SessionWrapper;
