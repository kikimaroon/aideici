import type { Metadata } from "next";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Mentions légales | AideIci",
  description: "Mentions légales du site AideIci — radar local des besoins utiles.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-[6px]">
        <div className="mx-auto flex max-w-[720px] items-center justify-between px-5 py-3">
          <a href="/" className="inline-flex items-center"><Logo size="small" /></a>
          <a href="/" className="text-[13.5px] text-muted-foreground hover:text-foreground transition-colors">← Retour</a>
        </div>
      </header>
      <main className="mx-auto max-w-[720px] px-5 py-12 sm:py-16">
        <h1 className="text-[32px] font-extrabold tracking-[-0.03em] text-foreground mb-8">Mentions légales</h1>

        <section className="space-y-6 text-[14.5px] leading-relaxed text-muted-foreground">
          <div>
            <h2 className="text-[16px] font-bold text-foreground mb-2">Éditeur du site</h2>
            <p>AideIci</p>
            <p>Email : contact@aideici.fr</p>
            <p>Directeur de publication : Hans Ølo</p>
          </div>

          <div>
            <h2 className="text-[16px] font-bold text-foreground mb-2">Hébergement</h2>
            <p>Vercel Inc.</p>
            <p>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
          </div>

          <div>
            <h2 className="text-[16px] font-bold text-foreground mb-2">Propriété intellectuelle</h2>
            <p>L'ensemble des contenus (textes, code source, structure) est la propriété d'AideIci. Toute reproduction sans autorisation est interdite.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-bold text-foreground mb-2">Responsabilité</h2>
            <p>AideIci repère et résume des besoins publiés par des sources externes. Le site oriente, il n'organise pas directement les missions. AideIci ne peut être tenu responsable de l'exactitude, de l'actualité ou de la disponibilité des besoins affichés. Chaque besoin est vérifié avant publication, mais les situations évoluent rapidement.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
