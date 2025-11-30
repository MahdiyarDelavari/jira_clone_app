"use client";
import { UserButton } from "@/features/auth/components/UserButton";

import { MobileSidebar } from "./MobileSidebar";


const defaultMap = {
  title: "Home",
  description: "Monitor all of your projects and tasks here",
};

export const Navbar = () => {


  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">
          {defaultMap.title}
        </h1>
        <p className="text-muted-foreground">
          {defaultMap.description}
        </p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};
