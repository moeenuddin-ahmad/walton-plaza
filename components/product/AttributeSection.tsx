import { AttributeEntry } from "@/types/product";

interface AttributeSectionProps {
  data?: AttributeEntry[] | null;
  emptyMessage?: string;
}

export const AttributeSection = ({
  data,
  emptyMessage = "No information available.",
}: AttributeSectionProps) => {
  if (!data || data.length === 0) {
    return <p className="text-zinc-400 text-sm py-4">{emptyMessage}</p>;
  }

  return (
    <div className="divide-y divide-zinc-50">
      {data.map((attr, i) => (
        <div
          key={i}
          className="flex items-start gap-4 py-3.5 group/row hover:bg-zinc-50/50 px-2 rounded-xl transition-colors duration-200"
        >
          <span className="text-xs font-black uppercase tracking-[0.12em] text-zinc-400 w-44 shrink-0 pt-0.5 group-hover/row:text-[#004a99] transition-colors duration-200">
            {attr.enLabel}
          </span>
          <span className="text-sm text-zinc-700 font-medium">
            {attr.values?.map((v) => v.enName).join(", ") || "—"}
          </span>
        </div>
      ))}
    </div>
  );
};
