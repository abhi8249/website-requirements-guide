import { Plus } from "lucide-react";
import { useId, useState } from "react";

type Item = { q: string; a: string };

export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-b${i}`;
        const panelId = `${base}-p${i}`;
        return (
          <div className="acc-item" data-open={isOpen} key={item.q}>
            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "1rem" }}>
              <button
                id={btnId}
                type="button"
                className="acc-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {item.q}
                <span className="acc-icon" aria-hidden="true">
                  <Plus size={16} />
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className="acc-panel" aria-hidden={!isOpen}>
              <div>
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
