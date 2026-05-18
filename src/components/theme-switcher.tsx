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
    <div className="inline-flex rounded-md border border-border bg-surface p-0.5" aria-label="Переключатель темы">
      {options.map((option) => {
        const Icon = option.icon;
        return (
          <button
            key={option.value}
            type="button"
            className={cn(
              "focus-ring flex h-6 w-6 items-center justify-center rounded text-muted transition hover:text-foreground",
              mounted && theme === option.value && "bg-accent text-white hover:text-white"
            )}
            onClick={() => setTheme(option.value)}
            title={option.label}
          >
            <Icon className="h-3 w-3" />
            <span className="sr-only">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
