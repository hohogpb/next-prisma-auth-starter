export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold my-4">
        <a
          className="hover:text-blue-500 "
          href="https://github.com/hohogpb/next-prisma-auth-starter"
        >
          next-prisma-auth-starter
        </a>
      </h1>

      <p className="my-4">
        This is an example site of how to do auth in
        <a
          className="underline hover:text-blue-500 mx-1"
          href="https://nextjs.org/"
        >
          next.js
        </a>
        with
        <a
          className="underline hover:text-blue-500 mx-1"
          href="https://www.prisma.io/docs/getting-started/quickstart"
        >
          prisma
        </a>
        .
      </p>

      <p className="my-4">
        inspired by
        <a
          className="underline hover:text-blue-500 mx-1"
          href="https://github.com/nextauthjs/next-auth-example"
        >
          next-auth-example
        </a>
        ,
        <a
          className="underline hover:text-blue-500 mx-1"
          href="https://github.com/manumura/nextjs-auth-rbac-starter"
        >
          nextjs-auth-rbac-starter
        </a>
      </p>
    </div>
  );
}
