export default function Admin() {
  return (
    <div>
      <h1 className="text-3xl font-bold my-4">
        This page is protected by Middleware
      </h1>
      <p className="my-4">Only admin users can see this page.</p>
    </div>
  );
}
