import React from 'react'
import { colors, fonts, formats, getSafePadding, logos, type FormatKey } from '../brand'

export interface PatternInterruptData {
  headline: string       // Contrarian statement, 1-2 lines max
  accentWord?: string    // One word to render in coral (must appear in headline)
  cta?: string           // Optional — usually no CTA on image for TOFU
}

interface Props {
  data: PatternInterruptData
  format: FormatKey
}

export const PatternInterruptTemplate: React.FC<Props> = ({ data, format }) => {
  const { width, height } = formats[format]
  const safe = getSafePadding(format)
  const isStory = format === '1080x1920'

  const headlineSize = isStory ? 80 : format === '1080x1350' ? 72 : 66

  // Render headline with optional accent word in coral
  const renderHeadline = () => {
    if (!data.accentWord || !data.headline.includes(data.accentWord)) {
      return data.headline
    }
    const parts = data.headline.split(data.accentWord)
    return (
      <>
        {parts[0]}
        <span style={{ color: colors.coral }}>{data.accentWord}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: colors.offWhite,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: safe.top,
        paddingBottom: safe.bottom,
        paddingLeft: safe.sides,
        paddingRight: safe.sides,
      }}
    >
      {/* Large coral accent block — left edge, full height */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 16,
          height: '100%',
          backgroundColor: colors.coral,
        }}
      />

      {/* Small coral rule above headline */}
      <div
        style={{
          width: 60,
          height: 3,
          backgroundColor: colors.coral,
          marginBottom: 28,
          marginLeft: 20,
        }}
      />

      {/* Bold headline — fills the frame */}
      <div
        style={{
          fontFamily: fonts.headline,
          fontSize: headlineSize,
          fontWeight: 700,
          color: colors.black,
          lineHeight: 1.15,
          maxWidth: '88%',
          marginLeft: 20,
        }}
      >
        {renderHeadline()}
      </div>

      {/* Optional CTA (rare for pattern interrupt) */}
      {data.cta && (
        <div style={{ marginLeft: 20, marginTop: 32 }}>
          <div
            style={{
              display: 'inline-block',
              border: `2px solid ${colors.coral}`,
              color: colors.coral,
              fontFamily: fonts.body,
              fontSize: 19,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              padding: '16px 36px',
            }}
          >
            {data.cta}
          </div>
        </div>
      )}

      {/* Logo */}
      <img
        src="/sue-bol.png"
        alt="SUE"
        style={{ position: 'absolute', bottom: safe.bottom + 14, left: safe.sides, height: 48, objectFit: 'contain' }}
      />
    </div>
  )
}
