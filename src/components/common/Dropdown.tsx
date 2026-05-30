import { useState, useRef, useEffect, useCallback } from 'react';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Dropdown({ options, value, onChange, placeholder = '请选择' }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  const handleSelect = useCallback(
    (v: string) => {
      onChange(v);
      setOpen(false);
    },
    [onChange],
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="dropdown" ref={containerRef}>
      <button className="dropdown-trigger" onClick={() => setOpen(!open)}>
        <span>{selected?.label ?? placeholder}</span>
        <i className={`bi bi-chevron-down ${open ? 'open' : ''}`}></i>
      </button>
      {open && (
        <div className="dropdown-menu">
          {options.map((opt) => (
            <button
              key={opt.value}
              className={`dropdown-item ${opt.value === value ? 'active' : ''}`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
