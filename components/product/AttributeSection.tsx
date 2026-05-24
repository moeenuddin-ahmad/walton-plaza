import { AttributeEntry } from "@/types/product";

interface AttributeSectionProps {
  data?: AttributeEntry[] | null;
  emptyMessage?: string;
  variant?: "default" | "minimal";
}

// Helper to clean up basic HTML if present
const cleanHtml = (html: string) => {
  if (!html) return "—";
  return html;
};

export const AttributeSection = ({
  data,
  emptyMessage = "No specialized information available for this category.",
  variant = "default",
}: AttributeSectionProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-zinc-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <p className="text-zinc-400 text-xs font-black uppercase tracking-widest">
          {emptyMessage}
        </p>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className="space-y-8">
        {data.map((attr, i) => (
          <div key={i} className="space-y-3">
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-[#233f6c]">
              {attr.enLabel}
            </h4>
            <div className="text-[15px] text-zinc-700 leading-[1.8] text-justify prose prose-zinc prose-sm max-w-none">
              {attr.values?.map((v, vIdx) => (
                <div
                  key={vIdx}
                  dangerouslySetInnerHTML={{ __html: cleanHtml(v.enName) }}
                  className="[&>p]:mb-4 [&>p:last-child]:mb-0"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {data.map((attr, i) => (
        <div
          key={i}
          className="group/attr relative rounded-lg border border-zinc-100 bg-white hover:border-[#233f6c]/20 hover:shadow-sm transition-all duration-300 overflow-hidden"
        >
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#233f6c] opacity-0 group-hover/attr:opacity-100 transition-opacity" />

          <div className="flex flex-col md:flex-row min-h-[64px]">
            {/* Label Side */}
            <div className="md:w-1/3 p-5 md:pr-8 bg-zinc-50/80 group-hover/attr:bg-white transition-colors shrink-0 flex items-center">
              <span className="text-[11px] font-black uppercase tracking-[0.15em] text-zinc-500 group-hover/attr:text-[#233f6c] transition-colors">
                {attr.enLabel}
              </span>
            </div>

            {/* Value Side */}
            <div className="flex-1 p-5 md:pl-10 flex items-center">
              <div className="text-base text-zinc-900 leading-relaxed font-semibold attribute-content prose prose-sm max-w-none">
                {attr.values?.map((v, vIdx) => (
                  <div
                    key={vIdx}
                    dangerouslySetInnerHTML={{ __html: cleanHtml(v.enName) }}
                    className="[&>p]:mb-1 [&>p:last-child]:mb-0"
                  />
                )) || <span className="text-zinc-300">—</span>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
