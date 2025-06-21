"use client";

import { Toaster } from "@/components/ui/sonner";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return null;
  }

  return <>{children}</>;
}

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <section>
        <Toaster />
        <AuthGuard>{children}</AuthGuard>
      </section>
    </SessionProvider>
  );
}
