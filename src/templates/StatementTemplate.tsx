import React from 'react'
import { colors, fonts, formats, getSafePadding, logos, type FormatKey } from '../brand'

export interface StatementData {
  headline: string
  highlight?: string
  supporting?: string
  cta: string
}

interface Props {
  data: StatementData
  format: FormatKey
}

export const StatementTemplate: React.FC<Props> = ({ data, format }) => {
  const { width, height } = formats[format]
  const safe = getSafePadding(format)
  const isStory = format === '1080x1920'

  const headlineSize = isStory ? 66 : format === '1080x1350' ? 58 : 54
  const supportSize = isStory ? 32 : format === '1080x1350' ? 30 : 28
  const ctaSize = isStory ? 22 : 20

  const renderHeadline = () => {
    if (!data.highlight || !data.headline.includes(data.highlight)) return data.headline
    const parts = data.headline.split(data.highlight)
    return (
      <>
        {parts[0]}
        <span style={{ backgroundColor: colors.lightCoral2, padding: '2px 6px', color: colors.coral }}>{data.highlight}</span>
        {parts[1]}
      </>
    )
  }

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
      {/* Coral accent bar at top */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 120, height: 6, backgroundColor: colors.coral }} />

      {/* Headline */}
      <div style={{ fontFamily: fonts.headline, fontSize: headlineSize, fontWeight: 700, color: colors.black, lineHeight: 1.25, maxWidth: '90%', marginBottom: data.supporting ? 28 : 0 }}>
        {renderHeadline()}
      </div>

      {/* Supporting line */}
      {data.supporting && (
        <div style={{ fontFamily: fonts.headline, fontSize: supportSize, fontStyle: 'italic', color: colors.darkGrey, lineHeight: 1.4, maxWidth: '85%' }}>
          {data.supporting}
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
        src="/sue-logo-academy.png"
        alt="SUE Behavioural Design Academy"
        style={{ position: 'absolute', bottom: safe.bottom + 14, left: safe.sides, height: 48, objectFit: 'contain' }}
      />
    </div>
  )
}
