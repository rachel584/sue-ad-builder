import React from 'react'
import { colors, fonts, formats, getSafePadding, logos, type FormatKey } from '../brand'

export interface QuoteData {
  quote: string
  attribution?: string
  cta: string
}

interface Props {
  data: QuoteData
  format: FormatKey
}

export const QuoteTemplate: React.FC<Props> = ({ data, format }) => {
  const { width, height } = formats[format]
  const safe = getSafePadding(format)
  const isStory = format === '1080x1920'

  const quoteSize = isStory ? 56 : format === '1080x1350' ? 50 : 46
  const attrSize = isStory ? 28 : format === '1080x1350' ? 24 : 22
  const ctaSize = isStory ? 22 : 20

  return (
    <div
      style={{
        width, height, position: 'relative', overflow: 'hidden',
        backgroundColor: colors.lightCoral2, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'flex-start',
        paddingTop: safe.top, paddingBottom: safe.bottom,
        paddingLeft: safe.sides, paddingRight: safe.sides,
      }}
    >
      {/* Large coral quotation mark */}
      <div style={{ fontFamily: fonts.headline, fontSize: isStory ? 200 : 160, fontWeight: 700, color: colors.lightCoral1, lineHeight: 0.6, marginBottom: 20, userSelect: 'none' }}>
        {'\u201C'}
      </div>

      {/* Quote text */}
      <div style={{ fontFamily: fonts.headline, fontSize: quoteSize, fontStyle: 'italic', fontWeight: 400, color: colors.black, lineHeight: 1.35, maxWidth: '90%', marginBottom: 24 }}>
        {data.quote}
      </div>

      {/* Attribution */}
      {data.attribution && (
        <div style={{ fontFamily: fonts.body, fontSize: attrSize, fontWeight: 600, color: colors.coral, letterSpacing: 0.5 }}>
          {data.attribution}
        </div>
      )}

      {/* CTA button */}
      <div style={{ position: 'absolute', bottom: safe.bottom + 50, left: safe.sides }}>
        <div style={{ backgroundColor: colors.coral, color: colors.white, fontFamily: fonts.body, fontSize: ctaSize, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, padding: '18px 40px' }}>
          {data.cta}
        </div>
      </div>

      {/* Logo */}
      <img
        src={logos.academy}
        alt="SUE Behavioural Design Academy"
        style={{ position: 'absolute', bottom: safe.bottom + 14, left: safe.sides, height: 48, objectFit: 'contain' }}
      />
    </div>
  )
}
