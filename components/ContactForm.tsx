"use client";

import { useState } from "react";

export default function ContactForm() {
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setPending(true);
    setFeedback(null);

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      const data = await res.json();

      if (data.success) {
        setFeedback({ type: "success", text: "Tak! Din besked er sendt — vi vender tilbage hurtigst muligt." });
        form.reset();
      } else {
        setFeedback({ type: "error", text: "Der gik noget galt. Prøv igen, eller ring til os på 28 73 29 28." });
      }
    } catch {
      setFeedback({ type: "error", text: "Der gik noget galt. Prøv igen, eller ring til os på 28 73 29 28." });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="info-card" action="https://api.web3forms.com/submit" method="POST" onSubmit={handleSubmit}>
      <h2>Send os en besked</h2>
      <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY" />
      <input type="hidden" name="subject" value="Ny besked fra airsteam.dk" />
      <input type="checkbox" name="botcheck" className="skip-link" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      {feedback && (
        <div className={feedback.type === "success" ? "form-success" : "form-error"}>{feedback.text}</div>
      )}

      <div className="form-field">
        <label htmlFor="name">Navn</label>
        <input id="name" name="name" type="text" required autoComplete="name" />
      </div>
      <div className="form-field">
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="form-field">
        <label htmlFor="subject-field">Emne</label>
        <input id="subject-field" name="emne" type="text" />
      </div>
      <div className="form-field">
        <label htmlFor="message">Besked</label>
        <textarea id="message" name="message" rows={5} required />
      </div>
      <button className="btn btn-primary" type="submit" disabled={pending}>
        {pending ? "Sender…" : "Send besked"}
      </button>
    </form>
  );
}
