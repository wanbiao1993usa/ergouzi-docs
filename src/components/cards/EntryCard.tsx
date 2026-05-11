import { Link } from "react-router-dom";

type EntryCardProps = {
  title: string;
  description: string;
  to: string;
  tone?: "default" | "accent" | "warm" | "buy" | "tools" | "api" | "sdk" | "examples" | "faq";
};

const toneLabels: Record<NonNullable<EntryCardProps["tone"]>, string> = {
  default: "Route",
  accent: "Platform",
  warm: "Start",
  buy: "Buy",
  tools: "Tools",
  api: "API",
  sdk: "SDK",
  examples: "Try",
  faq: "Help",
};

export function EntryCard({ title, description, to, tone = "default" }: EntryCardProps) {
  return (
    <Link className={`entry-card entry-card-${tone}`} to={to}>
      <span className="eyebrow">{toneLabels[tone]}</span>
      <strong>{title}</strong>
      <p>{description}</p>
    </Link>
  );
}
