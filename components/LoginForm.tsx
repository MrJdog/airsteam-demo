"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions/auth";

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <form action={formAction} className="form-card">
      <input type="hidden" name="redirect" value={redirectTo} />
      {state?.error && <div className="form-error">{state.error}</div>}
      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="form-field">
        <label htmlFor="password">Adgangskode</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" />
      </div>
      <button className="btn btn-primary btn-block" type="submit" disabled={pending}>
        {pending ? "Logger ind…" : "Log ind"}
      </button>
    </form>
  );
}
