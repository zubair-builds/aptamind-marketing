import { ImageResponse } from 'next/og';

export const alt = 'Aptamind: connected intelligence with evidence attached.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        background: '#F5F6F1',
        color: '#25282A',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 540,
          height: 540,
          borderRadius: 999,
          background: 'radial-gradient(circle, rgba(201,223,78,.34), rgba(201,223,78,0) 68%)',
          right: -80,
          top: -160,
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 17, fontSize: 30, fontWeight: 700 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: '#174A32',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 25,
          }}
        >
          A
        </div>
        aptamind
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 980 }}>
        <div
          style={{
            textTransform: 'uppercase',
            color: '#174A32',
            fontSize: 19,
            letterSpacing: 4,
            marginBottom: 28,
          }}
        >
          Connected intelligence
        </div>
        <div style={{ fontSize: 79, lineHeight: 0.98, letterSpacing: -4, fontWeight: 650 }}>
          A clearer operating picture, assembled from every source.
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid #D9DAD9',
          paddingTop: 24,
          fontSize: 20,
          color: '#626772',
        }}
      >
        <span>Evidence-backed understanding</span>
        <span>Early access</span>
      </div>
    </div>,
    size,
  );
}
