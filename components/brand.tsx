type BrandProps = { compact?: boolean; inverse?: boolean };

export function Brand({ compact = false, inverse = false }: BrandProps) {
  return (
    <span className="brand" aria-label="Aptamind">
      <svg className="brand-mark" viewBox="0 0 32 32" role="img" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill={inverse ? '#F5F6F1' : '#174A32'} />
        <path
          d="M9 21.5 14.2 10h3.6L23 21.5M11.3 17.2h9.4"
          fill="none"
          stroke={inverse ? '#174A32' : '#F5F6F1'}
          strokeWidth="2.15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="21.5" r="1.55" fill="#C9DF4E" />
        <circle cx="16" cy="10" r="1.55" fill="#C9DF4E" />
        <circle cx="23" cy="21.5" r="1.55" fill="#C9DF4E" />
      </svg>
      {!compact && <span className="brand-name">aptamind</span>}
    </span>
  );
}

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="arrow-icon">
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
