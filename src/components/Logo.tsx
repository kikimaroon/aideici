export function Logo({ size = "default" }: { size?: "default" | "small" }) {
  const cls = size === "small" ? "text-[15px]" : "text-[17px]";

  return (
    <span className={`inline-flex items-center font-bold tracking-[-0.02em] text-foreground ${cls}`}>
      Aide<span className="text-primary">Ici</span>
      <span className="ml-[5px] mt-[-8px] h-[5px] w-[5px] rounded-[1px] bg-primary" />
    </span>
  );
}
