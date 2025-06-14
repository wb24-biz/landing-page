"use client";

import { Button } from "@/shared/ui/kit/button";
import { useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";
type FeatureType = {
  id: string;
  icon: string;
};
import { FunctionalFeatureItem } from "./functional-feature-item";

const features: FeatureType[] = [
  { id: "payment", icon: "/icons/14.svg" },
  { id: "fiscal", icon: "/icons/15.svg" },
  { id: "emergency-alerts", icon: "/icons/16.svg" },
  { id: "service-alerts", icon: "/icons/17.svg" },
  { id: "analytics", icon: "/icons/18.svg" },
  { id: "access-control", icon: "/icons/19.svg" },
  { id: "remote-release", icon: "/icons/20.svg" },
  { id: "remote-restart", icon: "/icons/21.svg" },
  { id: "remote-update", icon: "/icons/22.svg" },
  { id: "real-time", icon: "/icons/9.svg" },
  { id: "inventory", icon: "/icons/10.svg" },
  { id: "alerts", icon: "/icons/11.svg" },
  { id: "security", icon: "/icons/12.svg" },
  { id: "remote", icon: "/icons/13.svg" },
];

const DEFAULT_VISIBLE = 6;

export const FunctionalFeaturesList: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations('FunctionalFeatures');

  const visibleFeatures = useMemo(
    () => (expanded ? features : features.slice(0, DEFAULT_VISIBLE)),
    [expanded]
  );

  const handleToggle = () => setExpanded((prev) => !prev);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleFeatures.map((feature) => (
          <FunctionalFeatureItem key={feature.id} feature={feature} />
        ))}
      </div>
      {features.length > DEFAULT_VISIBLE && (
        <div className="text-center mt-10">
          <Button
            size="xl"
            variant="outlineBlue"
            onClick={handleToggle}
            aria-label={expanded ? t('hide') : t('showMore')}
          >
            {expanded ? t('hide') : t('showMore')}
          </Button>
        </div>
      )}
    </>
  );
};
