"use client";

import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** An i18n Link that sends an analytics event when clicked. */
export function TrackedLink({
  event,
  properties,
  onClick,
  ...props
}: ComponentProps<typeof Link> & {
  event: AnalyticsEvent;
  properties?: Record<string, string | number>;
}) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track(event, properties);
        onClick?.(e);
      }}
    />
  );
}
