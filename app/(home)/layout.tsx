"use client";

import Image from "next/image";
import LayoutHeader from "./layout-header";
import { AuthProvider } from "hooks/auth-context";

export default function NormalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-full">
        <LayoutHeader />

        <main className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="py-6 ">{children}</div>

          <hr className="my-4" />

          <div className="flex flex-row items-center space-x-2 ">
            <a href="https://github.com/hohogpb/next-prisma-auth-starter">
              <Image src="github.svg" width="19" height="19" alt="github" />
            </a>
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}
