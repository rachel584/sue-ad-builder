import React from 'react'
import { colors, fonts, formats, getSafePadding, logos, type FormatKey } from '../brand'

export interface LeadMagnetData {
  headline: string         // What the resource is + benefit
  bullets: string[]        // 3-4 things they'll learn (max 4)
  resourceTitle: string    // Title shown on the PDF mockup
  cta: string              // e.g. "Download Free Guide"
}

interface Props {
  data: LeadMagnetData
  format: FormatKey
}

export const LeadMagnetTemplate: React.FC<Props> = ({ data, format }) => {
  const { width, height } = formats[format]
  const safe = getSafePadding(format)
  const isStory = format === '1080x1920'
  const isPortrait = format === '1080x1350'

  const headlineSize = isStory ? 62 : isPortrait ? 56 : 54
  const bulletSize = isStory ? 30 : isPortrait ? 26 : 24
  const ctaSize = isStory ? 24 : 22
  const mockupWidth = isStory ? 280 : isPortrait ? 240 : 220

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: colors.lightCoral2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: safe.top,
        paddingBottom: safe.bottom,
        paddingLeft: safe.sides,
        paddingRight: safe.sides,
      }}
    >
      {/* "FREE GUIDE" label */}
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 20,
          fontWeight: 700,
          color: colors.coral,
          textTransform: 'uppercase',
          letterSpacing: 3,
          marginBottom: 16,
        }}
      >
        Free Guide
      </div>

      {/* Headline */}
      <div
        style={{
          fontFamily: fonts.headline,
          fontSize: headlineSize,
          fontWeight: 700,
          color: colors.black,
          lineHeight: 1.25,
          maxWidth: '60%',
          marginBottom: 28,
        }}
      >
        {data.headline}
      </div>

      {/* Bullet points */}
      <div style={{ maxWidth: '55%', marginBottom: 0 }}>
        {data.bullets.slice(0, 4).map((bullet, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              marginBottom: 14,
            }}
          >
            {/* Coral check circle */}
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: colors.coral,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 2,
              }}
            >
              <span style={{ color: colors.white, fontSize: 14, fontWeight: 700, fontFamily: fonts.body }}>
                ✓
              </span>
            </div>
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: bulletSize,
                color: colors.black,
                lineHeight: 1.4,
              }}
            >
              {bullet}
            </span>
          </div>
        ))}
      </div>

      {/* PDF mockup — right side */}
      <div
        style={{
          position: 'absolute',
          right: safe.sides - 10,
          top: '50%',
          transform: 'translateY(-50%) rotate(3deg)',
        }}
      >
        {/* PDF card */}
        <div
          style={{
            width: mockupWidth,
            height: mockupWidth * 1.35,
            backgroundColor: colors.white,
            border: `3px solid ${colors.lightCoral1}`,
            borderRadius: 4,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          {/* Coral top bar on PDF */}
          <div
            style={{
              width: '100%',
              height: 4,
              backgroundColor: colors.coral,
              marginBottom: 20,
            }}
          />
          <div
            style={{
              fontFamily: fonts.headline,
              fontSize: mockupWidth * 0.075,
              fontWeight: 700,
              color: colors.black,
              lineHeight: 1.3,
            }}
          >
            {data.resourceTitle}
          </div>
          {/* Fake text lines */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
            {[0.9, 0.75, 0.85, 0.6, 0.8, 0.5].map((w, i) => (
              <div
                key={i}
                style={{
                  width: `${w * 100}%`,
                  height: 6,
                  backgroundColor: colors.neutralGrey,
                  borderRadius: 3,
                }}
              />
            ))}
          </div>
          {/* SUE logo on PDF */}
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 10,
              fontWeight: 700,
              color: colors.darkGrey,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            SUE | Behavioural Design
          </div>
        </div>
      </div>

      {/* CTA button */}
      <div style={{ position: 'absolute', bottom: safe.bottom + 50, left: safe.sides }}>
        <div
          style={{
            backgroundColor: colors.coral,
            color: colors.white,
            fontFamily: fonts.body,
            fontSize: ctaSize,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 2,
            padding: '20px 44px',
          }}
        >
          {data.cta}
        </div>
      </div>

      {/* Logo */}
      <img
        src={logos.academy}
        alt="SUE Behavioural Design Academy"
        style={{ position: 'absolute', bottom: safe.bottom + 14, right: safe.sides, height: 56, objectFit: 'contain' }}
      />
    </div>
  )
}
