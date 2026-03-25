import React from 'react'
import { colors, fonts, formats, getSafePadding, logos, illustrations, type FormatKey, type IllustrationKey } from '../brand'

export interface IllustrationStatData {
  stat: string                      // e.g. "70%"
  phrase: string                    // e.g. "of change projects fail"
  illustrationKey: IllustrationKey  // The hero illustration
  cta: string
  subtext?: string                  // Optional line below phrase
}

interface Props {
  data: IllustrationStatData
  format: FormatKey
}

export const IllustrationStatTemplate: React.FC<Props> = ({ data, format }) => {
  const { width, height } = formats[format]
  const safe = getSafePadding(format)
  const isStory = format === '1080x1920'
  const isPortrait = format === '1080x1350'

  const statSize = isStory ? 200 : isPortrait ? 180 : 160
  const phraseSize = isStory ? 48 : isPortrait ? 42 : 38
  const ctaSize = isStory ? 24 : 22
  const illustrationHeight = isStory ? 520 : isPortrait ? 420 : 360

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
        alignItems: 'center',
        paddingTop: safe.top,
        paddingBottom: safe.bottom,
        paddingLeft: safe.sides,
        paddingRight: safe.sides,
      }}
    >
      {/* Top section: Illustration (40-50% of height) */}
      <div
        style={{
          flex: isStory ? '0 0 45%' : '0 0 42%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          paddingTop: isStory ? 40 : 20,
        }}
      >
        <img
          src={illustrations[data.illustrationKey]}
          alt=""
          style={{
            height: illustrationHeight,
            maxWidth: '85%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Coral divider line */}
      <div
        style={{
          width: 80,
          height: 4,
          backgroundColor: colors.coral,
          marginTop: 16,
          marginBottom: 24,
        }}
      />

      {/* Bottom section: Stat + text */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '90%',
        }}
      >
        {/* Big stat number */}
        <div
          style={{
            fontFamily: fonts.headline,
            fontSize: statSize,
            fontWeight: 700,
            color: colors.coral,
            lineHeight: 1,
            marginBottom: 12,
          }}
        >
          {data.stat}
        </div>

        {/* Completing phrase */}
        <div
          style={{
            fontFamily: fonts.headline,
            fontSize: phraseSize,
            fontWeight: 400,
            color: colors.black,
            lineHeight: 1.3,
            maxWidth: '85%',
            marginBottom: data.subtext ? 12 : 0,
          }}
        >
          {data.phrase}
        </div>

        {/* Optional subtext */}
        {data.subtext && (
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: phraseSize * 0.65,
              color: colors.darkGrey,
              lineHeight: 1.4,
              maxWidth: '80%',
            }}
          >
            {data.subtext}
          </div>
        )}
      </div>

      {/* CTA button */}
      <div style={{ position: 'absolute', bottom: safe.bottom + 60, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
        <div
          style={{
            backgroundColor: colors.coral,
            color: colors.white,
            fontFamily: fonts.body,
            fontSize: ctaSize,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 1,
            padding: '18px 44px',
            borderRadius: 4,
            whiteSpace: 'nowrap',
          }}
        >
          {data.cta}
        </div>
      </div>

      {/* Logo */}
      <img
        src={logos.academy}
        alt="SUE Behavioural Design Academy"
        style={{ position: 'absolute', bottom: safe.bottom + 14, right: safe.sides, height: 56, objectFit: 'contain' }}
      />
    </div>
  )
}
