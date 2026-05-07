"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon }
] as const;

export function ThemeSwitcher() {
  const { theme, mounted, setTheme } = useTheme();

  return (
    <div className="inline-flex rounded-lg border border-border bg-surface p-1" aria-label="Переключатель темы">
      {options.map((option) => {
        const Icon = option.icon;
        return (
          <button
            key={option.value}
            type="button"
            className={cn(
              "focus-ring flex h-9 w-9 items-center justify-center rounded-md text-muted transition hover:text-foreground",
              mounted && theme === option.value && "bg-primary text-primary-foreground hover:text-primary-foreground"
            )}
            onClick={() => setTheme(option.value)}
            title={option.label}
          >
            <Icon className="h-4 w-4" />
            <span className="sr-only">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
