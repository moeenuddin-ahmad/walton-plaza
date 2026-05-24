"use client";

import { ShieldCheck, Truck, RotateCcw, CheckCircle } from "lucide-react";

const BADGES = [
  { icon: ShieldCheck, label: "Secure Payment", sub: "100% Encryption" },
  { icon: Truck, label: "Fast Delivery", sub: "Nationwide Shipping" },
  { icon: RotateCcw, label: "Easy Returns", sub: "7 Days Guarantee" },
  { icon: CheckCircle, label: "100% Original", sub: "Authentic Product" },
];

export const TrustBadges = () => {
  return (
    <div className="grid grid-cols-2 gap-3 pt-6 border-t border-zinc-100">
      {BADGES.map((badge, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50/50 border border-zinc-100/50 group/badge"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-zinc-100 shadow-sm transition-all group-hover/badge:scale-110">
            <badge.icon className="w-5 h-5 text-[#233f6c]" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-[#233f6c] whitespace-nowrap">
              {badge.label}
            </p>
            <p className="text-[9px] font-medium text-zinc-400">{badge.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
