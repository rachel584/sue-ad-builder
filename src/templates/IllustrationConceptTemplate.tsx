import React from 'react'
import { colors, fonts, formats, getSafePadding, logos, illustrations, type FormatKey, type IllustrationKey } from '../brand'

export interface IllustrationConceptData {
  headline: string                  // Course name or concept, e.g. "Behavioural Design Fundamentals"
  illustrationKey: IllustrationKey  // The hero illustration
  tagline?: string                  // Optional line below headline
  badge?: string                    // Optional top badge, e.g. "2-Day Training", "On-Demand"
  cta: string
}

interface Props {
  data: IllustrationConceptData
  format: FormatKey
}

export const IllustrationConceptTemplate: React.FC<Props> = ({ data, format }) => {
  const { width, height } = formats[format]
  const safe = getSafePadding(format)
  const isStory = format === '1080x1920'
  const isPortrait = format === '1080x1350'

  const headlineSize = isStory ? 68 : isPortrait ? 60 : 56
  const taglineSize = isStory ? 34 : isPortrait ? 30 : 28
  const badgeSize = isStory ? 20 : 18
  const ctaSize = isStory ? 24 : 22
  const illustrationSize = isStory ? 480 : isPortrait ? 380 : 320

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
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: safe.top,
        paddingBottom: safe.bottom,
        paddingLeft: safe.sides,
        paddingRight: safe.sides,
      }}
    >
      {/* Optional badge at top */}
      {data.badge && (
        <div
          style={{
            position: 'absolute',
            top: safe.top + 20,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div
            style={{
              backgroundColor: colors.coral,
              color: colors.white,
              fontFamily: fonts.body,
              fontSize: badgeSize,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 2,
              padding: '10px 28px',
              borderRadius: 3,
            }}
          >
            {data.badge}
          </div>
        </div>
      )}

      {/* Hero illustration — centered, large */}
      <img
        src={illustrations[data.illustrationKey]}
        alt=""
        style={{
          height: illustrationSize,
          maxWidth: '80%',
          objectFit: 'contain',
          marginBottom: 32,
        }}
      />

      {/* Headline — centered below illustration */}
      <div
        style={{
          fontFamily: fonts.headline,
          fontSize: headlineSize,
          fontWeight: 700,
          color: colors.black,
          lineHeight: 1.2,
          textAlign: 'center',
          maxWidth: '90%',
          marginBottom: data.tagline ? 16 : 0,
        }}
      >
        {data.headline}
      </div>

      {/* Optional tagline */}
      {data.tagline && (
        <div
          style={{
            fontFamily: fonts.headline,
            fontSize: taglineSize,
            fontStyle: 'italic',
            color: colors.darkGrey,
            lineHeight: 1.4,
            textAlign: 'center',
            maxWidth: '85%',
          }}
        >
          {data.tagline}
        </div>
      )}

      {/* CTA button */}
      <div style={{ position: 'absolute', bottom: safe.bottom + 60, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
        <div
          style={{
            backgroundColor: colors.coral,
            color: colors.white,
            fontFamily: fonts.body,
            fontSize: ctaSize,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 1,
            padding: '18px 44px',
            borderRadius: 4,
            whiteSpace: 'nowrap',
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
