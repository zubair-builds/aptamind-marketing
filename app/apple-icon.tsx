import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 38,
        background: '#174A32',
      }}
    >
      <svg width="126" height="126" viewBox="0 0 64 64" aria-hidden="true">
        <path
          d="M18 43 28.5 20h7L46 43M22.5 34.5h19"
          fill="none"
          stroke="#F5F6F1"
          strokeWidth="4.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="18" cy="43" r="3" fill="#C9DF4E" />
        <circle cx="32" cy="20" r="3" fill="#C9DF4E" />
        <circle cx="46" cy="43" r="3" fill="#C9DF4E" />
      </svg>
    </div>,
    size,
  );
}
