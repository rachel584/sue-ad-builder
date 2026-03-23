import React from 'react'
import { colors, fonts, formats, getSafePadding, logos, type FormatKey } from '../brand'

export interface CarouselSlideData {
  slideNumber: number
  totalSlides: number
  title: string
  body: string
  icon?: string        // Large emoji/icon for visual punch (System 1)
  isFirst?: boolean
  isLast?: boolean
  cta?: string
}

interface Props {
  data: CarouselSlideData
  format: FormatKey
}

export const CarouselSlideTemplate: React.FC<Props> = ({ data, format }) => {
  const { width, height } = formats[format]
  const safe = getSafePadding(format)
  const isStory = format === '1080x1920'
  const isPortrait = format === '1080x1350'

  const titleSize = isStory ? 56 : isPortrait ? 50 : 46
  const bodySize = isStory ? 30 : isPortrait ? 26 : 24
  const numberSize = isStory ? 140 : isPortrait ? 120 : 100
  const ctaSize = isStory ? 24 : 22
  const dotSize = isStory ? 14 : 12
  const coverTitleSize = isStory ? 68 : isPortrait ? 60 : 56

  // Progress dots
  const renderProgressDots = () => (
    <div
      style={{
        display: 'flex',
        gap: 10,
        marginBottom: 30,
      }}
    >
      {Array.from({ length: data.totalSlides }, (_, i) => (
        <div
          key={i}
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: '50%',
            backgroundColor: i + 1 === data.slideNumber ? colors.coral : colors.lightCoral1,
            transition: 'all 0.2s',
          }}
        />
      ))}
    </div>
  )

  // Cover slide (first)
  if (data.isFirst) {
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
          paddingLeft: safe.sides + 30,
          paddingRight: safe.sides + 30,
        }}
      >
        {/* Coral accent at top */}
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

        {renderProgressDots()}

        <div
          style={{
            fontFamily: fonts.headline,
            fontSize: coverTitleSize,
            fontWeight: 700,
            color: colors.black,
            lineHeight: 1.2,
            maxWidth: '90%',
          }}
        >
          {data.title}
        </div>

        {/* Decorative coral line */}
        <div
          style={{
            width: 80,
            height: 4,
            backgroundColor: colors.coral,
            marginTop: 30,
            marginBottom: 20,
          }}
        />

        {data.body && (
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: bodySize,
              color: colors.darkGrey,
              lineHeight: 1.5,
              maxWidth: '80%',
            }}
          >
            {data.body}
          </div>
        )}

        {/* Logo */}
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

  // Last slide (CTA)
  if (data.isLast) {
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
          alignItems: 'center',
          paddingTop: safe.top,
          paddingBottom: safe.bottom,
          paddingLeft: safe.sides + 30,
          paddingRight: safe.sides + 30,
        }}
      >
        <div style={{ position: 'absolute', top: safe.top + 20, left: safe.sides + 30 }}>
          {renderProgressDots()}
        </div>

        <div
          style={{
            fontFamily: fonts.headline,
            fontSize: titleSize,
            fontWeight: 700,
            color: colors.black,
            lineHeight: 1.3,
            textAlign: 'center',
            maxWidth: '85%',
            marginBottom: 40,
          }}
        >
          {data.title}
        </div>

        {/* CTA button */}
        <div
          style={{
            backgroundColor: colors.coral,
            color: colors.white,
            fontFamily: fonts.body,
            fontSize: ctaSize,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 1,
            padding: '22px 56px',
            borderRadius: 4,
          }}
        >
          {data.cta || 'Learn More'}
        </div>

        {/* Logo */}
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

  // Normal content slide
  const watermarkSize = isStory ? 280 : isPortrait ? 240 : 200

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
        paddingTop: safe.top + 20,
        paddingBottom: safe.bottom + 20,
        paddingLeft: safe.sides + 30,
        paddingRight: safe.sides + 30,
      }}
    >
      {/* Large watermark emoji — System 1 visual anchor */}
      {data.icon && (
        <div style={{
          position: 'absolute',
          top: isStory ? '35%' : '25%',
          right: safe.sides - 20,
          fontSize: watermarkSize,
          lineHeight: 1,
          opacity: 0.12,
          color: colors.lightCoral1,
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}>
          {data.icon}
        </div>
      )}

      {renderProgressDots()}

      {/* Icon + slide number row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16, position: 'relative', zIndex: 1 }}>
        {data.icon && (
          <div style={{ fontSize: isStory ? 80 : isPortrait ? 70 : 60, lineHeight: 1 }}>
            {data.icon}
          </div>
        )}
        <div
          style={{
            fontFamily: fonts.headline,
            fontSize: numberSize,
            fontWeight: 700,
            color: colors.coral,
            lineHeight: 1,
            opacity: 0.9,
          }}
        >
          {String(data.slideNumber).padStart(2, '0')}
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily: fonts.headline,
          fontSize: titleSize,
          fontWeight: 700,
          color: colors.black,
          lineHeight: 1.25,
          maxWidth: '90%',
          marginBottom: 24,
        }}
      >
        {data.title}
      </div>

      {/* Body */}
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: bodySize,
          color: colors.darkGrey,
          lineHeight: 1.6,
          maxWidth: '85%',
        }}
      >
        {data.body}
      </div>

      {/* Slide counter at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: safe.bottom + 20,
          left: safe.sides + 30,
          fontFamily: fonts.body,
          fontSize: 18,
          fontWeight: 600,
          color: colors.darkGrey,
        }}
      >
        {data.slideNumber} / {data.totalSlides}
      </div>
    </div>
  )
}
