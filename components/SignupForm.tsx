"use client";

import { useActionState } from "react";
import { signup } from "@/lib/actions/auth";
import GoogleLoginButton from "@/components/GoogleLoginButton";

export default function SignupForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState(signup, null);

  return (
    <div className="form-card">
      <GoogleLoginButton redirectTo={redirectTo} />
      <div className="auth-divider">
        <span>eller</span>
      </div>
      <form action={formAction}>
        <input type="hidden" name="redirect" value={redirectTo} />
        {state?.error && <div className="form-error">{state.error}</div>}
        {state?.success && <div className="form-success">{state.success}</div>}
        <div className="form-field">
          <label htmlFor="full_name">Navn</label>
          <input id="full_name" name="full_name" type="text" required autoComplete="name" />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="form-field">
          <label htmlFor="password">Adgangskode</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
          />
        </div>
        <button className="btn btn-primary btn-block" type="submit" disabled={pending}>
          {pending ? "Opretter konto…" : "Opret konto"}
        </button>
      </form>
    </div>
  );
}
