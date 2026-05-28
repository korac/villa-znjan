"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { unlock, type UnlockState } from "@/app/actions/unlock";
import { buttonClasses } from "@/components/Button";

const initial: UnlockState = { status: "idle" };

export function UnlockForm() {
  const t = useTranslations("unlock");
  const params = useSearchParams();
  const from = params.get("from") || "/";
  const [state, action, pending] = useActionState(unlock, initial);

  return (
    <form action={action} className="mt-7 space-y-5">
      <input type="hidden" name="from" value={from} />
      <label className="block">
        <span className="text-xs uppercase tracking-[0.18em] text-muted">
          {t("passwordLabel")}
        </span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          autoComplete="current-password"
          className="mt-2 block w-full border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none"
        />
      </label>
      {state.status === "error" && (
        <p className="text-sm text-red-700">{t("error")}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className={buttonClasses("primary", "w-full")}
      >
        {pending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
