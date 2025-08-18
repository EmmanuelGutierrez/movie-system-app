"use client";

import { User } from "lucide-react";
import { Button } from "../ui/button";
import { useAppStore } from "@/hooks/useAppStore";
export const UserAvatar = () => {
  const appStore = useAppStore((state) => state);


  return (
    <>
      {
        <Button
          disabled={!appStore}
          onClick={appStore ? appStore.toggleShowLoginForm : () => {}}
          className="bg-transparent cursor-pointer"
        >
          <User className="w-5 h-5 text-white" />
        </Button>
      }
    </>
  );
};
