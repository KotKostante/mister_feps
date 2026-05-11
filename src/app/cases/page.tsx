import type { Metadata } from "next";
import { CasesIndexClient } from "@/components/cases-index-client";
import { FinalCta } from "@/components/sections/common";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Кейсы клининга Mister FAPC",
  description: "Кейсы Mister FAPC: Zolla, Самокат, Яндекс.Маркет, SinSay, МТС. Площади, бригады, география и регулярность работ.",
  alternates: { canonical: absoluteUrl("/cases/") }
};

export default function CasesPage() {
  return (
    <>
      <CasesIndexClient />
      <FinalCta />
    </>
  );
}
