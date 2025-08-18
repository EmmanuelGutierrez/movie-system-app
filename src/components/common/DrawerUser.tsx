"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerDescription,
} from "../ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import { useWindowSize } from "@/hooks/userWindowSize";
import { useAppStore } from "@/hooks/useAppStore";
import { HTMLAttributes } from "react";
import { LoginForm } from "../loginForm/LoginForm";
import Link from "next/link";
import { useAuthStore } from "@/hooks/useAuthStore";
import { UserProfile } from "../detail/UserProfile";

export const DrawerUser = () => {
  const { width } = useWindowSize();
  const appStore = useAppStore((state) => state);
  const authStore = useAuthStore((state) => state);
  if(!appStore ||!authStore){
    return <></>
  }
  const {user}=authStore
  const contentClass: HTMLAttributes<HTMLElement>["className"] =
    " bg-colors-primary border-colors-primary-hard";
    console.log("USER",user)
  if (width < 770) {
    return (
      <Drawer
        open={appStore ? appStore.showLoginForm : false}
        onOpenChange={appStore ? appStore.toggleShowLoginForm : () => {}}
      >
        <DrawerContent className={`mx-auto h-full w-100 ${contentClass}`}>
          <DrawerHeader>
            <p className="text-center h-1 text-2xl">
              {user ? "Hola, Manu" : "Login"}
            </p>
          </DrawerHeader>
          <DrawerDescription></DrawerDescription>
          {user ? <UserProfile /> : <LoginForm />}
          <DrawerFooter>
            {user ? (
              <p className="text-sm font-light">
                ¿No tienes una cuenta?{" "}
                <Link
                  href="#"
                  className=" text-colors-primary-light font-bold no-underline"
                >
                  Regístrate
                </Link>
              </p>
            ) : (
              <p>Cerrar sesion</p>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog
      open={appStore ? appStore.showLoginForm : false}
      onOpenChange={appStore ? appStore.toggleShowLoginForm : () => {}}
    >
      <DialogContent className={`${contentClass}`}>
        <DialogHeader>
          <p className="text-center h-1 text-2xl">
            {user ? "Hola, Manu" : "Login"}
          </p>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        {user?<UserProfile/>:<LoginForm />}
        <DialogFooter>
          <div className="mx-auto ">
            {!user ? (
              <p className="text-sm font-light">
                ¿No tienes una cuenta?{" "}
                <Link
                  href="#"
                  className=" text-colors-primary-light font-bold no-underline"
                >
                  Regístrate
                </Link>
              </p>
            ) : (
              <p>Cerrar sesion</p>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
