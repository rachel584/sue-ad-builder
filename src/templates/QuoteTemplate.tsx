import React from 'react'
import { colors, fonts, formats, getSafePadding, logos, type FormatKey } from '../brand'

export interface QuoteData {
  quote: string
  attribution?: string
  cta: string
  photo?: string  // Optional photo path
}

interface Props {
  data: QuoteData
  format: FormatKey
}

export const QuoteTemplate: React.FC<Props> = ({ data, format }) => {
  const { width, height } = formats[format]
  const safe = getSafePadding(format)
  const isStory = format === '1080x1920'

  const quoteSize = isStory ? 70 : format === '1080x1350' ? 62 : 56
  const attrSize = isStory ? 34 : format === '1080x1350' ? 28 : 26
  const ctaSize = isStory ? 26 : 24
  const photoSize = isStory ? 280 : format === '1080x1350' ? 240 : 200

  return (
    <div
      style={{
        width, height, position: 'relative', overflow: 'hidden',
        backgroundColor: colors.lightCoral2, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'flex-start',
        paddingTop: safe.top, paddingBottom: safe.bottom + 160,
        paddingLeft: safe.sides, paddingRight: safe.sides,
      }}
    >
      {/* Photo — rounded accent in top-right corner */}
      {data.photo && (
        <div style={{
          position: 'absolute',
          top: safe.top + 20,
          right: safe.sides + 10,
          width: photoSize,
          height: photoSize,
          borderRadius: 16,
          overflow: 'hidden',
          zIndex: 0,
          opacity: 0.9,
        }}>
          <img
            src={data.photo}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 30%',
            }}
          />
        </div>
      )}

      {/* Large coral quotation mark */}
      <div style={{
        fontFamily: fonts.headline,
        fontSize: isStory ? 200 : 160,
        fontWeight: 700,
        color: colors.lightCoral1,
        lineHeight: 0.6,
        marginBottom: 20,
        userSelect: 'none',
        position: 'relative',
        zIndex: 1,
      }}>
        {'\u201C'}
      </div>

      {/* Quote text */}
      <div style={{
        fontFamily: fonts.headline,
        fontSize: quoteSize,
        fontStyle: 'italic',
        fontWeight: 400,
        color: colors.black,
        lineHeight: 1.35,
        maxWidth: data.photo ? '75%' : '90%',
        marginBottom: 24,
        position: 'relative',
        zIndex: 1,
      }}>
        {data.quote}
      </div>

      {/* Attribution */}
      {data.attribution && (
        <div style={{
          fontFamily: fonts.body,
          fontSize: attrSize,
          fontWeight: 600,
          color: colors.coral,
          letterSpacing: 0.5,
          position: 'relative',
          zIndex: 1,
        }}>
          {data.attribution}
        </div>
      )}

      {/* CTA button */}
      <div style={{ position: 'absolute', bottom: safe.bottom + 90, left: safe.sides, zIndex: 1 }}>
        <div style={{ backgroundColor: colors.coral, color: colors.white, fontFamily: fonts.body, fontSize: ctaSize, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, padding: '18px 40px' }}>
          {data.cta}
        </div>
      </div>

      {/* Logo */}
      <img
        src={logos.academy}
        alt="SUE Behavioural Design Academy"
        style={{ position: 'absolute', bottom: safe.bottom + 20, right: safe.sides, height: 56, objectFit: 'contain', zIndex: 1 }}
      />
    </div>
  )
}
