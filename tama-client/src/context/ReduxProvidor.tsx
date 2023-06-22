"use client";

import store from "@/redux/store";
import { Provider } from "react-redux";

interface ReduxProvidorProps {
  children: React.ReactNode;
}

export default function ReduxProvidor({ children }: ReduxProvidorProps) {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
}
