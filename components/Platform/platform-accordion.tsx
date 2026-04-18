"use client";

import { useState } from "react";
import { PlatformAccordionItem } from "./platform-accordion-item";

export type PlatformStep = {
  title: string;
  description: string;
};

type PlatformAccordionProps = {
  steps: PlatformStep[];
};

export function PlatformAccordion({ steps }: PlatformAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mt-5 border-b border-[#C7CDD2]">
      {steps.map((step, index) => (
        <PlatformAccordionItem
          key={step.title}
          index={index}
          title={step.title}
          description={step.description}
          isOpen={openIndex === index}
          onToggle={() => {
            setOpenIndex((current) => (current === index ? -1 : index));
          }}
        />
      ))}
    </div>
  );
}
