"use client";

import { useOpenPanel } from "@openpanel/nextjs";
import { useCallback } from "react";

export type AnalyticsEvents = Record<string, Record<string, unknown> | Record<string, never>>;

export function useTrackEvent<Events extends AnalyticsEvents = AnalyticsEvents>() {
  const op = useOpenPanel();
  return useCallback(
    <E extends keyof Events & string>(
      event: E,
      ...args: Events[E] extends Record<string, never>
        ? []
        : [Events[E]]
    ) => {
      op.track(event, args[0] as Record<string, unknown> | undefined);
    },
    [op],
  );
}
