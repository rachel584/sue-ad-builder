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
  const subtitleSize = isStory ? 28 : isPortrait ? 24 : 22
  const ctaSize = isStory ? 24 : 22
  const imageMaxHeight = isStory ? '50%' : isPortrait ? '52%' : '55%'

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
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: colors.coral,
        }}
      />

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
          marginBottom: 24,
        }}
      >
        {data.title}
      </div>

      {/* Framework image — centered, takes ~55% of space */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxHeight: imageMaxHeight,
          marginBottom: 20,
        }}
      >
        <img
          src={data.frameworkImage}
          alt="SUE Influence Framework"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Subtitle */}
      {data.subtitle && (
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: subtitleSize,
            color: colors.darkGrey,
            lineHeight: 1.4,
            marginBottom: 20,
            maxWidth: '80%',
          }}
        >
          {data.subtitle}
        </div>
      )}

      {/* Spacer to push CTA and logo to bottom */}
      <div style={{ flex: 1 }} />

      {/* CTA button — bottom-left */}
      <div style={{ position: 'absolute', bottom: safe.bottom + 60, left: safe.sides + 20 }}>
        <div
          style={{
            backgroundColor: colors.coral,
            color: colors.white,
            fontFamily: fonts.body,
            fontSize: ctaSize,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 1,
            padding: '20px 48px',
            borderRadius: 4,
          }}
        >
          {data.cta}
        </div>
      </div>

      {/* Logo — bottom-right */}
      <img
        src={logos.academy}
        alt="SUE Behavioural Design Academy"
        style={{
          position: 'absolute',
          bottom: safe.bottom + 14,
          right: safe.sides + 20,
          height: 56,
          objectFit: 'contain',
        }}
      />
    </div>
  )
}
