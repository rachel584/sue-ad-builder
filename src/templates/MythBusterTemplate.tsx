import React from 'react'
import { colors, fonts, formats, getSafePadding, logos, type FormatKey } from '../brand'

export interface MythBusterData {
  myth: string           // The common belief
  truth: string          // The behavioural science reality
  cta?: string           // Usually soft CTA or none
}

interface Props {
  data: MythBusterData
  format: FormatKey
}

export const MythBusterTemplate: React.FC<Props> = ({ data, format }) => {
  const { width, height } = formats[format]
  const safe = getSafePadding(format)

  const labelSize = format === '1080x1920' ? 24 : 22
  const textSize = format === '1080x1920' ? 54 : format === '1080x1350' ? 46 : 44

  const halfWidth = width / 2

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {/* LEFT HALF — Warm Grey (Myth) */}
      <div
        style={{
          width: halfWidth,
          height,
          backgroundColor: colors.warmGrey,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: safe.top,
          paddingBottom: safe.bottom,
          paddingLeft: safe.sides + 10,
          paddingRight: 30,
          position: 'relative',
        }}
      >
        {/* "MYTH" label */}
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: labelSize,
            fontWeight: 700,
            color: colors.coral,
            textTransform: 'uppercase',
            letterSpacing: 3,
            marginBottom: 20,
          }}
        >
          Myth
        </div>

        {/* Myth text with coral strikethrough */}
        <div
          style={{
            fontFamily: fonts.headline,
            fontSize: textSize,
            fontStyle: 'italic',
            fontWeight: 400,
            color: colors.darkGrey,
            lineHeight: 1.3,
            textDecoration: 'line-through',
            textDecorationColor: colors.coral,
            textDecorationThickness: '3px',
          }}
        >
          {data.myth}
        </div>
      </div>

      {/* RIGHT HALF — Off-White (Truth) */}
      <div
        style={{
          width: halfWidth,
          height,
          backgroundColor: colors.offWhite,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: safe.top,
          paddingBottom: safe.bottom,
          paddingLeft: 30,
          paddingRight: safe.sides + 10,
          position: 'relative',
        }}
      >
        {/* "TRUTH" label */}
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: labelSize,
            fontWeight: 700,
            color: colors.coral,
            textTransform: 'uppercase',
            letterSpacing: 3,
            marginBottom: 20,
          }}
        >
          Truth
        </div>

        {/* Truth text — bold, confident */}
        <div
          style={{
            fontFamily: fonts.headline,
            fontSize: textSize * 1.05,
            fontWeight: 700,
            color: colors.black,
            lineHeight: 1.3,
          }}
        >
          {data.truth}
        </div>
      </div>

      {/* Coral vertical divider line between halves */}
      <div
        style={{
          position: 'absolute',
          left: halfWidth - 2,
          top: '18%',
          width: 4,
          height: '50%',
          backgroundColor: colors.coral,
        }}
      />

      {/* CTA bar at bottom (inside safe zone) */}
      {data.cta && (
        <div
          style={{
            position: 'absolute',
            bottom: safe.bottom,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div
            style={{
              backgroundColor: colors.coral,
              padding: '18px 40px',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: 22,
                fontWeight: 700,
                color: colors.white,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
              }}
            >
              {data.cta}
            </span>
          </div>
        </div>
      )}

      {/* Bol logo — bottom right, below CTA level */}
      <img
        src={logos.bol}
        alt="SUE"
        style={{ position: 'absolute', bottom: data.cta ? safe.bottom + 8 : safe.bottom + 14, right: safe.sides + 10, height: 36, objectFit: 'contain' }}
      />
    </div>
  )
}
