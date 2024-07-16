"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/Constants";
import { cn } from "@/lib/utils";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-teal-600 w-24">
          <Link
            href="/"
            className="flex cursor-pointer items-center gap-1 pb-10 pl-4"
          >
            <Image src="/icons/logo.svg" alt="logo" width={23} height={27} />
            {/* <h1 className="text-24 font-extrabold  text-white-1 ml-2">Podcastr</h1> */}
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto w-36">
            <SheetClose asChild className="w-16">
              <nav className="flex h-full flex-col gap-6 text-white-1">
                {sidebarLinks.map(({ route, label, imgURL }) => {
                  const isActive =
                    pathname === route || pathname.startsWith(`${route}/`);

                  return (
                    <SheetClose asChild key={route}>
                      <Link
                        href={route}
                        className={cn(
                          "flex gap-3 items-center py-4 max-lg:px-4 justify-start",
                          {
                            "bg-nav-focus border-r-4 border-teal-700": isActive,
                          }
                        )}
                      >
                        <Image
                          src={imgURL}
                          alt={label}
                          width={24}
                          height={24}
                        />
                        {/* <p>{label}</p> */}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
            <SignedIn>
              <Link href={`/profile/${user?.id}`} className="flex gap-3 pb-12">
                {/* <UserButton /> */}
                  <div className="mb-20 ml-3">
                    {/* <Image src={"https://cdn-icons-png.flaticon.com/128/10461/10461983.png"} alt="" height={30} width={30} className="text-white-1"/> */}
                    <User/>
                  </div>
                {/* <div className="flex w-full items-center justify-between">
                  <h1 className="text-16 truncate font-semibold text-white-1"> */}
                    
                  {/* </h1> */}
                  {/* <Image
                    src="/icons/angle-right.png"
                    alt="arrow"
                    width={24}
                    height={24}
                  /> */}
                {/* </div> */}
              </Link>
            </SignedIn>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
