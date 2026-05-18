"use client";

import anime from "animejs";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setReady(targets: Element[]) {
  targets.forEach((target) => target.classList.add("motion-ready"));
}

function formatCounter(target: HTMLElement, value: number) {
  const prefix = target.dataset.countPrefix ?? "";
  const suffix = target.dataset.countSuffix ?? "";
  const separator = target.dataset.countSeparator ?? " ";
  const formatted = Math.round(value).toLocaleString("ru-RU").replace(/\u00a0/g, separator);
  target.textContent = `${prefix}${formatted}${suffix}`;
}

function completeCounters() {
  document.querySelectorAll<HTMLElement>("[data-count-to]").forEach((target) => {
    formatCounter(target, Number(target.dataset.countTo ?? "0"));
  });
}

export function AnimationLayer() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    if (reducedMotion()) {
      root.classList.add("motion-reduced");
      root.classList.remove("motion-enabled");
      completeCounters();
      return;
    }

    root.classList.add("motion-enabled");

    const heroItems = Array.from(document.querySelectorAll("[data-hero-animate]"));
    setReady(heroItems);

    anime
      .timeline({
        easing: "cubicBezier(.2,.9,.2,1)",
        duration: 560
      })
      .add({
        targets: "[data-hero-animate='eyebrow'], [data-hero-animate='title']",
        translateY: [28, 0],
        opacity: [0, 1],
        delay: anime.stagger(90)
      })
      .add(
        {
          targets: "[data-hero-animate='text']",
          translateY: [18, 0],
          opacity: [0, 1]
        },
        "-=260"
      )
      .add(
        {
          targets: "[data-hero-animate='cta'] > *",
          translateY: [16, 0],
          opacity: [0, 1],
          delay: anime.stagger(95)
        },
        "-=220"
      )
      .add(
        {
          targets: "[data-hero-animate='stat']",
          translateY: [18, 0],
          opacity: [0, 1],
          delay: anime.stagger(70)
        },
        "-=200"
      )
      .add(
        {
          targets: "[data-hero-animate='panel']",
          translateX: [28, 0],
          scale: [0.985, 1],
          opacity: [0, 1]
        },
        "-=520"
      );

    anime({
      targets: "[data-float]",
      translateY: [-8, 8],
      translateX: [4, -4],
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
      duration: 4200,
      delay: anime.stagger(260)
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const section = entry.target;
          const children = Array.from(
            section.querySelectorAll("[data-animate='card'], [data-animate='item'], [data-animate='heading']")
          );
          section.classList.add("motion-ready");
          setReady(children);

          anime({
            targets: children.length ? children : section,
            translateY: [18, 0],
            opacity: [0, 1],
            easing: "cubicBezier(.18,.84,.32,1)",
            duration: 500,
            delay: anime.stagger(72)
          });

          revealObserver.unobserve(section);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    document.querySelectorAll("[data-animate-section]").forEach((section) => {
      revealObserver.observe(section);
    });

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          const to = Number(target.dataset.countTo ?? "0");
          const duration = Number(target.dataset.countDuration ?? "1100");
          const state = { value: 0 };

          anime({
            targets: state,
            value: to,
            round: 1,
            easing: "cubicBezier(.16,.84,.28,1)",
            duration,
            update: () => {
              formatCounter(target, state.value);
            },
            complete: () => {
              formatCounter(target, to);
            }
          });

          counterObserver.unobserve(target);
        });
      },
      { threshold: 0.45 }
    );

    document.querySelectorAll("[data-count-to]").forEach((item) => counterObserver.observe(item));

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
      anime.remove("[data-float]");
      root.classList.remove("motion-enabled");
    };
    /* При клиентском переходе (Next.js Link) DOM страницы новый, а старый эффект уже отработал —
     * без повторного запуска блоки остаются с opacity:0 по globals.css. pathname сбрасывает анимации. */
  }, [pathname]);

  return null;
}
