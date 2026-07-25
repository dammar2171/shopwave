import { Outlet, Link } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <div className="w-full max-w-md space-y-6">
        <Link
          to="/"
          className="block text-center font-bold text-2xl text-primary"
        >
          ShopWave
        </Link>

        <div className="bg-background border rounded-xl p-8 shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
