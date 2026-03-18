import React from 'react'
import { colors, fonts, formats, getSafePadding, logos, type FormatKey } from '../brand'

export interface ProvocativeQuestionData {
  question: string      // The question text
  subtext?: string      // Optional supporting line below
  cta?: string          // Usually soft or none for TOFU
}

interface Props {
  data: ProvocativeQuestionData
  format: FormatKey
}

export const ProvocativeQuestionTemplate: React.FC<Props> = ({ data, format }) => {
  const { width, height } = formats[format]
  const safe = getSafePadding(format)
  const isStory = format === '1080x1920'
  const isPortrait = format === '1080x1350'

  const questionSize = isStory ? 80 : isPortrait ? 72 : 66
  const subtextSize = isStory ? 38 : isPortrait ? 32 : 30
  const decorSize = isStory ? 600 : isPortrait ? 520 : 480

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
        paddingLeft: safe.sides,
        paddingRight: safe.sides,
      }}
    >
      {/* Giant decorative question mark — right side, faded */}
      <div
        style={{
          position: 'absolute',
          right: -40,
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: fonts.headline,
          fontSize: decorSize,
          fontWeight: 700,
          color: colors.lightCoral2,
          lineHeight: 0.8,
          userSelect: 'none',
          opacity: 0.6,
        }}
      >
        ?
      </div>

      {/* Question text — left two-thirds */}
      <div
        style={{
          fontFamily: fonts.headline,
          fontSize: questionSize,
          fontWeight: 700,
          color: colors.black,
          lineHeight: 1.25,
          maxWidth: '70%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {data.question}
      </div>

      {/* Optional subtext */}
      {data.subtext && (
        <div
          style={{
            fontFamily: fonts.headline,
            fontSize: subtextSize,
            fontStyle: 'italic',
            color: colors.darkGrey,
            lineHeight: 1.4,
            maxWidth: '65%',
            marginTop: 24,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {data.subtext}
        </div>
      )}

      {/* Coral accent — vertical bar left edge */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '20%',
          width: 4,
          height: '60%',
          backgroundColor: colors.coral,
        }}
      />

      {/* Logo */}
      <img
        src={logos.academy}
        alt="SUE Behavioural Design Academy"
        style={{ position: 'absolute', bottom: safe.bottom + 20, left: safe.sides, height: 64, objectFit: 'contain', zIndex: 1 }}
      />
    </div>
  )
}
