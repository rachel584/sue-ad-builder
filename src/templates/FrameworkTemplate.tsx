import React from 'react'
import { colors, fonts, formats, getSafePadding, logos, type FormatKey } from '../brand'

export interface FrameworkData {
  title: string
  subtitle?: string
  frameworkImage: string
  cta: string
}

interface Props {
  data: FrameworkData
  format: FormatKey
}

export const FrameworkTemplate: React.FC<Props> = ({ data, format }) => {
  const { width, height } = formats[format]
  const safe = getSafePadding(format)
  const isStory = format === '1080x1920'
  const isPortrait = format === '1080x1350'

  const titleSize = isStory ? 42 : isPortrait ? 38 : 36
  const subtitleSize = isStory ? 36 : isPortrait ? 32 : 30
  const ctaSize = isStory ? 24 : 22

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
        paddingTop: safe.top,
        paddingBottom: safe.bottom,
        paddingLeft: safe.sides + 20,
        paddingRight: safe.sides + 20,
      }}
    >
      {/* Coral accent line at top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, backgroundColor: colors.coral }} />

      {/* Title */}
      <div
        style={{
          fontFamily: fonts.headline,
          fontSize: titleSize,
          fontWeight: 700,
          color: colors.coral,
          textTransform: 'uppercase',
          letterSpacing: 2,
          lineHeight: 1.2,
          marginTop: 20,
          marginBottom: 16,
        }}
      >
        {data.title}
      </div>

      {/* Framework image */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}
      >
        <img
          src={data.frameworkImage}
          alt="SUE Influence Framework"
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* Subtitle — bigger, italic, prominent */}
      {data.subtitle && (
        <div
          style={{
            fontFamily: fonts.headline,
            fontSize: subtitleSize,
            fontStyle: 'italic',
            color: colors.black,
            lineHeight: 1.35,
            marginBottom: 24,
            maxWidth: '90%',
          }}
        >
          {data.subtitle}
        </div>
      )}

      {/* CTA + Logo — inline at bottom */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div
          style={{
            backgroundColor: colors.coral,
            color: colors.white,
            fontFamily: fonts.body,
            fontSize: ctaSize,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 1,
            padding: '18px 40px',
          }}
        >
          {data.cta}
        </div>

        <img
          src={logos.academy}
          alt="SUE Behavioural Design Academy"
          style={{ height: 48, objectFit: 'contain' }}
        />
      </div>
    </div>
  )
}
