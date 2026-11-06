const shapes = {
  compass: <><circle cx="12" cy="12" r="9" /><path d="m16 8-2 6-6 2 2-6 6-2Z" /></>,
  flame: <path d="M12 22c4 0 7-3 7-7 0-4-2.5-6.2-4-7.6-.3 2.3-1.6 3-2.2 3.2C13.3 6.5 11 3.6 9.7 2c.2 3.4-1.4 5-2.7 6.6-1.3 1.6-2 3.4-2 6.4 0 4 3 7 7 7Z" />,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  window: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18m-14-2.5h.01m3 0h.01M7 13h5m-5 3h8" /></>,
  panels: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16m4-11h4m-4 4h4m-4 4h4" /></>,
  user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" /></>,
  bag: <><path d="M5 8h14l1 12H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
  wave: <path d="M3 12h3l3-6 4 12 3-6h5" />,
  crown: <><path d="m3 7 5 4 4-6 4 6 5-4-2 11H5L3 7Zm3 14h12" /></>,
  card: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></>,
  receipt: <><path d="M5 3l3 2 4-2 4 2 3-2v18l-3-2-4 2-4-2-3 2V3Z" /><path d="M9 9h6m-6 4h6" /></>,
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  diagonal: <path d="M6 18 18 6M7 6h11v11" />,
  search: <><circle cx="10.5" cy="10.5" r="5.5" /><path d="m15 15 5 5" /></>,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  check: <path d="m5 12 4 4L19 6" />,
  sparkle: <><path d="M12 2c0 6-4 10-10 10 6 0 10 4 10 10 0-6 4-10 10-10-6 0-10-4-10-10Z" /></>,
} as const;

export type IconName = keyof typeof shapes;

export function Icon({ name, size = 19 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {shapes[name]}
    </svg>
  );
}
