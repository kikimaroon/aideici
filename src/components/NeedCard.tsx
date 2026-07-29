import { Need } from "@/types";

export function NeedCard({ need }: { need: Need }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <h3 className="text-lg font-semibold">{need.title}</h3>

      {need.summary && (
        <p className="mt-1 text-sm text-muted-foreground">{need.summary}</p>
      )}

      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
        {need.category && <span>{need.category}</span>}
        {need.location && <span>· {need.location}</span>}
        {need.verified_at && (
          <span>
            · Vérifié le{" "}
            {new Date(need.verified_at).toLocaleDateString("fr-FR")}
          </span>
        )}
        {need.expires_at && (
          <span>
            · Expire le{" "}
            {new Date(need.expires_at).toLocaleDateString("fr-FR")}
          </span>
        )}
      </div>

      {need.source_url && (
        <a
          href={need.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block rounded-md bg-foreground px-4 py-1.5 text-sm font-medium text-background hover:opacity-85 transition-opacity"
        >
          Voir la source →
        </a>
      )}
    </div>
  );
}
