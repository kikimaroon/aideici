import type { Metadata } from "next";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Politique de confidentialité | AideIci",
  description: "Comment AideIci collecte, utilise et protège vos données personnelles.",
};

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-[6px]">
        <div className="mx-auto flex max-w-[720px] items-center justify-between px-5 py-3">
          <a href="/" className="inline-flex items-center"><Logo size="small" /></a>
          <a href="/" className="text-[13.5px] text-muted-foreground hover:text-foreground transition-colors">← Retour</a>
        </div>
      </header>
      <main className="mx-auto max-w-[720px] px-5 py-12 sm:py-16">
        <h1 className="text-[32px] font-extrabold tracking-[-0.03em] text-foreground mb-8">Politique de confidentialité</h1>

        <section className="space-y-6 text-[14.5px] leading-relaxed text-muted-foreground">
          <div>
            <h2 className="text-[16px] font-bold text-foreground mb-2">1. Données collectées</h2>
            <p>Lorsque vous vous inscrivez aux alertes, nous collectons votre adresse email, votre zone géographique et vos catégories d'intérêt. Ces données sont exclusivement utilisées pour l'envoi des alertes.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-bold text-foreground mb-2">2. Base légale</h2>
            <p>Le traitement est fondé sur votre consentement explicite (article 6.1.a du RGPD). Vous pouvez retirer ce consentement à tout moment via le lien de désinscription présent dans chaque email.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-bold text-foreground mb-2">3. Finalité</h2>
            <p>Vos données servent uniquement à vous envoyer des alertes sur les besoins utiles dans votre zone géographique. Aucun profilage, aucune revente, aucun partage à des tiers.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-bold text-foreground mb-2">4. Durée de conservation</h2>
            <p>Vos données sont conservées jusqu'à votre désinscription. Vous pouvez demander leur suppression à tout moment en écrivant à contact@aideici.fr.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-bold text-foreground mb-2">5. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et de portabilité de vos données. Pour les exercer : contact@aideici.fr.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-bold text-foreground mb-2">6. Cookies</h2>
            <p>Ce site n'utilise aucun cookie de tracking ou de publicité. Seuls des cookies techniques essentiels au fonctionnement du site peuvent être déposés.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-bold text-foreground mb-2">7. Hébergement et sous-traitants</h2>
            <p>Les données sont hébergées chez Supabase (Europe, région eu-west-1). Les emails sont envoyés via Resend. Ces sous-traitants sont conformes au RGPD.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
