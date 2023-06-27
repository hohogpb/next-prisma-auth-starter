"use client";

import { useAuth } from "hooks/auth-context";

export default function Me() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold my-4">Me</h1>
      <p className="my-4">Username: {user?.username}</p>
      <p className="my-4">Role: {user?.role}</p>
    </div>
  );
}
