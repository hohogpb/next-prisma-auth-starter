"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Api() {
  const [profileRet, setProfileRet] = useState();
  const [helloRet, setHelloRet] = useState();

  async function callApiProfile() {
    try {
      const resp = await axios.get("/api/profile");
      setProfileRet(resp.data);
    } catch (error) {
      setProfileRet(undefined);
      console.log(error);
    }
  }

  async function callApiHello() {
    try {
      const resp = await axios.get("/api/hello");
      setHelloRet(resp.data);
    } catch (error) {
      setHelloRet(undefined);
      console.log(error);
    }
  }

  useEffect(() => {
    callApiProfile();
    callApiHello();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold my-4">API Example</h1>
      <p className="my-4">
        The examples below show responses from the example API endpoints.
      </p>

      <h1 className="text-2xl font-bold my-4 mt-8 inline">Profile</h1>
      <p className="my-3 inline ml-3 font-seimi">
        (You must be signed in to see responses.)
      </p>
      <p className="my-3">/api/profile</p>
      <pre
        className="bg-black rounded-md p-4 text-white text-sm 
        font-thin font-mono min-h-[10rem]"
      >
        {JSON.stringify(profileRet, null, 2)}
      </pre>

      <h1 className="text-2xl font-bold my-4 mt-8">Hello</h1>
      <p className="my-3">/api/hello</p>
      <pre
        className="bg-black rounded-md p-4 text-white text-sm 
        font-thin font-mono min-h-[10rem]"
      >
        {JSON.stringify(helloRet, null, 2)}
      </pre>
    </div>
  );
}
