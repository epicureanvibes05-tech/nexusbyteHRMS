"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessage(data.message ?? "Unable to sign in.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setMessage("Unable to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl lg:grid-cols-2">
          <section className="hidden bg-slate-950 p-12 lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
                NexusByte Solutions
              </p>

              <h1 className="mt-6 text-4xl font-bold leading-tight">
                HR, Attendance & Payroll Management System
              </h1>

              <p className="mt-5 max-w-md text-slate-400">
                Centralized employee management, attendance, payroll, savings,
                documents and HR operations.
              </p>
            </div>

            <p className="text-sm text-slate-500">Authorized access only</p>
          </section>

          <section className="p-8 sm:p-12">
            <div className="mx-auto max-w-md">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-400 lg:hidden">
                NexusByte Solutions
              </p>

              <h2 className="mt-4 text-3xl font-bold">Sign in</h2>

              <p className="mt-2 text-sm text-slate-400">
                Enter your email or username and password.
              </p>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="identifier"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email or Username
                  </label>

                  <input
                    id="identifier"
                    type="text"
                    autoComplete="username"
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    placeholder="Enter email or username"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    placeholder="Enter password"
                    required
                  />
                </div>

                {message ? (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-900/50 bg-red-950/50 px-4 py-3 text-sm text-red-300"
                  >
                    {message}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-sky-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
