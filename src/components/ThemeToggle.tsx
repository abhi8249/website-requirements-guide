import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const THEME_KEY = "umang-theme";

/** Runs before paint (inlined in the document head) so the saved or device theme applies without a flash. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(THEME_KEY)) return;
      document.documentElement.classList.toggle("dark", e.matches);
      setDark(e.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    setDark(next);
  };

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark ?? false}
    >
      {dark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}
