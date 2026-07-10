import { createClient } from "@/lib/supabase/server";
import { logout } from "@/lib/actions/auth";

export default async function ProfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone")
    .eq("id", user!.id)
    .single();

  return (
    <div className="form-card">
      <div className="form-field">
        <label>Navn</label>
        <p style={{ margin: 0 }}>{profile?.full_name || "—"}</p>
      </div>
      <div className="form-field">
        <label>Email</label>
        <p style={{ margin: 0 }}>{user?.email}</p>
      </div>
      <form action={logout}>
        <button className="btn btn-outline" type="submit">
          Log ud
        </button>
      </form>
    </div>
  );
}
