"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cookies, headers } from "next/headers";
import { useAuth } from "hooks/auth-context";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function LayoutHeader(props: any) {
  const { user } = useAuth();
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/", current: true },
    { name: "Protected", href: "/protected", current: false },
    { name: "API", href: "/api", current: false },
    { name: "Admin", href: "/admin", current: false },
    { name: "Me", href: "/me", current: false },
  ];

  navigation.forEach((e) => {
    e.current = e.href === pathname;
  });

  return (
    <div className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              
            </div>
            <div>
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      "rounded-md px-3 py-2 text-sm ",
                      item.current
                        ? "bg-gray-900 text-white font-bold"
                        : "text-gray-300 font-medium hover:bg-gray-700 hover:text-white"
                    )}
                    aria-current={item.current ? "page" : undefined}
                    prefetch={false}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="ml-4 flex items-center md:ml-6">
            <div className="relative ml-3">
              <div className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>

                <span className="text-white rounded-md px-3 py-2 text-sm font-bold">
                  {user ? user.username : ""}
                </span>

                {user ? (
                  <Link
                    href="/logout"
                    className={classNames(
                      "bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    prefetch={false}
                  >
                    logout
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className={classNames(
                      "bg-gray-700 text-white text-gray-300  hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    prefetch={false}
                  >
                    sign in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
