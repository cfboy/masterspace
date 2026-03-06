import LogoSvg from '@/assets/logo.svg?react';

interface LogoProps {
  /** CSS color — applied via `currentColor` on all SVG fills */
  color?: string;
  /** Rendered width in px. Height scales automatically (original aspect ~1.556:1). */
  width?: number;
  className?: string;
}

/**
 * MasterSpace LLC logo rendered from the original SVG asset.
 * All fills use `currentColor` so the `color` prop controls everything.
 */
export function Logo({ color, width = 160, className }: LogoProps) {
  // Original viewBox is 4096 × 2632.848 — preserve aspect ratio
  const height = Math.round(width * (2632.848 / 4096));

  return (
    <span
      style={{ color: color, display: 'inline-flex', width, height, flexShrink: 0 }}
      className={className}
      aria-label="MasterSpace LLC"
    >
      <LogoSvg
        width={width}
        height={height}
        style={{ width: '100%', height: '100%' }}
        aria-hidden="true"
      />
    </span>
  );
}
