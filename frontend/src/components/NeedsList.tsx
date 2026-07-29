import { NeedCard } from "@/components/NeedCard";
import { Need } from "@/types";

export function NeedsList({ needs }: { needs: Need[] }) {
  if (needs.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-12">
        Aucun besoin vérifié pour le moment. Revenez plus tard dans la journée.
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {needs.map((need) => (
        <NeedCard key={need.id} need={need} />
      ))}
    </div>
  );
}
