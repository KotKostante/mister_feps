import type { Metadata } from "next";
import { CasesIndexClient } from "@/components/cases-index-client";
import { FinalCta } from "@/components/sections/common";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Кейсы клининга Mister FAPC",
  description: "Кейсы Mister FAPC: Яндекс Маркет, Zolla, БЦ «Первомайский» и ЖК «Сибирский сад». Площади, сотрудники, регламент и отчетность.",
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
