"use client";

import { Toaster } from "@/components/ui/sonner";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    return null;
  }

  return <>{children}</>;
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <section className="flex items-center justify-center min-h-screen">
        <Toaster />
        <AuthGuard>{children}</AuthGuard>
      </section>
    </SessionProvider>
  );
}
