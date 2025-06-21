import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Navbar({ email }: { email: string }) {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ callbackUrl: "/sign-in" });
  };

  return (
    <div className="flex gap-4 items-center text-center">
      <div className="text-sm font-medium text-gray-700">{email}</div>

      <Button
        variant="destructive"
        size="sm"
        onClick={handleSignOut}
        disabled={isSigningOut}
      >
        {isSigningOut ? "Signing out..." : "Sign Out"}
      </Button>
    </div>
  );
}
