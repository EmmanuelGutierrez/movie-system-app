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
import { LoginForm } from "../loginForm/LoginForm";
import Link from "next/link";
import { useAuthStore } from "@/hooks/useAuthStore";
import { UserProfile } from "../detail/UserProfile";
import { Button } from "../ui/button";

export const DrawerUser = () => {
  const { width } = useWindowSize();
  const appStore = useAppStore((state) => state);
  const authStore = useAuthStore((state) => state);
  if (!appStore || !authStore) {
    return <></>;
  }

  const { user, logout } = authStore;

  const ContainerComponent = width < 770 ? Drawer : Dialog;
  const HeaderComponent = width < 770 ? DrawerHeader : DialogHeader;
  const DescriptionComponent = width < 770 ? DrawerDescription : DialogDescription;
  const FooterComponent = width < 770 ? DrawerFooter : DialogFooter;
  const ContentComponent = width < 770 ? DrawerContent : DialogContent;

  return (
    <ContainerComponent
      open={appStore ? appStore.showLoginForm : false}
      onOpenChange={appStore ? appStore.toggleShowLoginForm : () => {}}
    >
      <ContentComponent
        className={`bg-colors-primary-hard  border-colors-primary-clear/30`}
      >
        <HeaderComponent className=" border-b pb-4 border-colors-primary-light/30 border-dashed">
          <p className="text-center text-2xl">{user ? "Perfil" : "Login"}</p>
        </HeaderComponent>
        <DescriptionComponent></DescriptionComponent>
        {user ? <UserProfile /> : <LoginForm />}
        <FooterComponent>
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
              <Button className="bg-transparent" onClick={logout}>
                Cerrar sesion
              </Button>
            )}
          </div>
        </FooterComponent>
      </ContentComponent>
    </ContainerComponent>
  );
};
