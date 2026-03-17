import React from 'react'
import { colors, fonts, formats, getSafePadding, logos, type FormatKey } from '../brand'

export interface BeforeAfterData {
  before: string          // Pain state / old way
  after: string           // Transformed state / new way
  cta: string
}

interface Props {
  data: BeforeAfterData
  format: FormatKey
}

export const BeforeAfterTemplate: React.FC<Props> = ({ data, format }) => {
  const { width, height } = formats[format]
  const safe = getSafePadding(format)
  const isStory = format === '1080x1920'
  const isPortrait = format === '1080x1350'

  const labelSize = isStory ? 26 : 24
  const textSize = isStory ? 50 : isPortrait ? 42 : 40
  const ctaSize = isStory ? 24 : 22

  // Content area excludes safe zones; split into two halves
  const contentHeight = height - safe.top - safe.bottom
  const halfHeight = contentHeight / 2

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* TOP HALF — Before (muted) */}
      <div
        style={{
          width,
          height: safe.top + halfHeight,
          backgroundColor: colors.lightCoral2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: safe.top,
          paddingLeft: safe.sides,
          paddingRight: safe.sides,
          position: 'relative',
        }}
      >
        {/* "BEFORE" label */}
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: labelSize,
            fontWeight: 700,
            color: colors.coral,
            textTransform: 'uppercase',
            letterSpacing: 3,
            marginBottom: 16,
            opacity: 0.8,
          }}
        >
          Before
        </div>

        {/* Before text — regular weight, slightly muted */}
        <div
          style={{
            fontFamily: fonts.headline,
            fontSize: textSize,
            fontWeight: 400,
            color: colors.darkGrey,
            lineHeight: 1.35,
            maxWidth: '88%',
          }}
        >
          {data.before}
        </div>
      </div>

      {/* Coral divider with arrow */}
      <div
        style={{
          position: 'absolute',
          left: safe.sides,
          top: safe.top + halfHeight - 16,
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: colors.coral,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.white,
            fontSize: 18,
            fontFamily: fonts.body,
            fontWeight: 700,
          }}
        >
          ↓
        </div>
        <div
          style={{
            width: width - safe.sides * 2 - 44,
            height: 2,
            backgroundColor: colors.coral,
          }}
        />
      </div>

      {/* BOTTOM HALF — After (confident) */}
      <div
        style={{
          width,
          flex: 1,
          backgroundColor: colors.lightCoral2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingBottom: safe.bottom,
          paddingLeft: safe.sides,
          paddingRight: safe.sides,
          position: 'relative',
        }}
      >
        {/* "AFTER" label */}
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: labelSize,
            fontWeight: 700,
            color: colors.coral,
            textTransform: 'uppercase',
            letterSpacing: 3,
            marginBottom: 16,
          }}
        >
          After
        </div>

        {/* After text — bold, empowered */}
        <div
          style={{
            fontFamily: fonts.headline,
            fontSize: textSize * 1.05,
            fontWeight: 700,
            color: colors.black,
            lineHeight: 1.3,
            maxWidth: '88%',
          }}
        >
          {data.after}
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
            letterSpacing: 1.5,
            padding: '18px 40px',
          }}
        >
          {data.cta}
        </div>
      </div>

      {/* Logo on the After side */}
      <img
        src={logos.academy}
        alt="SUE Behavioural Design Academy"
        style={{ position: 'absolute', bottom: safe.bottom + 14, right: safe.sides, height: 56, objectFit: 'contain' }}
      />
    </div>
  )
}
