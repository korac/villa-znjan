"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** Fires one analytics event when it mounts. For server-rendered pages. */
export function TrackOnMount({
  event,
  properties,
}: {
  event: AnalyticsEvent;
  properties?: Record<string, string | number>;
}) {
  const serialized = JSON.stringify(properties ?? {});

  useEffect(() => {
    track(event, JSON.parse(serialized));
  }, [event, serialized]);

  return null;
}
