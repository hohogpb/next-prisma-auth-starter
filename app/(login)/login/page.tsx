"use client";

import { login } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login(props: any) {
  const { searchParams } = props;
  const route = useRouter();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams?.callbackUrl;

  async function doLogin(params: FormData) {
    setMsg("loading");
    setLoading(true);

    login(params)
      .then((d) => {
        const redirectTo = callbackUrl || "/";
        route.push(redirectTo);
      })
      .catch((error) => {
        console.log(error.message);
        setMsg(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="underline mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <div className="mt-10 text-center text-red-500 font-bold">{msg}</div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                placeholder="please enter username"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  //href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  {
                    //Forgot password?
                  }
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="please enter password"
                required
                disabled={loading}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              formAction={doLogin}
              //onClick={doLogin}
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 
              text-sm font-semibold leading-6 text-white shadow-sm
              hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 
              focus-visible:outline-offset-2 focus-visible:outline-gray-600 "
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          test admin: admin/123456 <br />
          test normal: guapi/123456
        </p>
        {
          // <p className="mt-10 text-center text-sm text-gray-500">
          //   Not a member?{" "}
          //   <a
          //     href="#"
          //     className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          //   >
          //     Sign up
          //   </a>
          // </p>
        }
      </div>
    </div>
  );
}
