import React from 'react'
import { colors, fonts, formats, getSafePadding, logos, type FormatKey } from '../brand'

export interface StatData {
  stat: string
  phrase: string
  cta: string
  subtext?: string
}

interface Props {
  data: StatData
  format: FormatKey
}

export const StatTemplate: React.FC<Props> = ({ data, format }) => {
  const { width, height } = formats[format]
  const safe = getSafePadding(format)
  const isStory = format === '1080x1920'

  const statSize = isStory ? 280 : format === '1080x1350' ? 240 : 220
  const phraseSize = isStory ? 56 : format === '1080x1350' ? 48 : 44
  const ctaSize = isStory ? 26 : 24

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
        alignItems: 'flex-start',
        paddingTop: safe.top,
        paddingBottom: safe.bottom,
        paddingLeft: safe.sides + 20,
        paddingRight: safe.sides + 20,
      }}
    >
      {/* The stat */}
      <div style={{ fontFamily: fonts.headline, fontSize: statSize, fontWeight: 700, color: colors.coral, lineHeight: 1, marginBottom: 24 }}>
        {data.stat}
      </div>

      {/* Completing phrase */}
      <div style={{ fontFamily: fonts.headline, fontSize: phraseSize, fontWeight: 400, color: colors.black, lineHeight: 1.3, maxWidth: '85%', marginBottom: data.subtext ? 16 : 0 }}>
        {data.phrase}
      </div>

      {/* Optional subtext */}
      {data.subtext && (
        <div style={{ fontFamily: fonts.body, fontSize: phraseSize * 0.6, color: colors.darkGrey, lineHeight: 1.4, maxWidth: '80%' }}>
          {data.subtext}
        </div>
      )}

      {/* CTA button */}
      <div style={{ position: 'absolute', bottom: safe.bottom + 60, left: safe.sides + 20 }}>
        <div style={{ backgroundColor: colors.coral, color: colors.white, fontFamily: fonts.body, fontSize: ctaSize, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, padding: '20px 48px', borderRadius: 4 }}>
          {data.cta}
        </div>
      </div>

      {/* Logo */}
      <img
        src={logos.academy}
        alt="SUE Behavioural Design Academy"
        style={{ position: 'absolute', bottom: safe.bottom + 14, right: safe.sides + 20, height: 56, objectFit: 'contain' }}
      />
    </div>
  )
}
