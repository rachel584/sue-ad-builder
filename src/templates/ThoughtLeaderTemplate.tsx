import React from 'react'
import { colors, fonts, formats, getSafePadding, logos, type FormatKey } from '../brand'

export interface ThoughtLeaderData {
  personName: string
  personTitle: string
  personPhoto: string
  insight: string
  hashtags?: string
}

interface Props {
  data: ThoughtLeaderData
  format: FormatKey
}

export const ThoughtLeaderTemplate: React.FC<Props> = ({ data, format }) => {
  const { width, height } = formats[format]
  const safe = getSafePadding(format)
  const isStory = format === '1080x1920'
  const isPortrait = format === '1080x1350'

  const nameSize = isStory ? 55 : isPortrait ? 50 : 45
  const titleSize = isStory ? 40 : isPortrait ? 35 : 33
  const insightSize = isStory ? 90 : isPortrait ? 83 : 75
  const hashtagSize = isStory ? 35 : isPortrait ? 33 : 30
  const avatarSize = isStory ? 168 : isPortrait ? 156 : 144
  const cardPadding = isStory ? 60 : isPortrait ? 50 : 44
  const cardMarginX = safe.sides + 16

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
      }}
    >
      {/* White card */}
      <div
        style={{
          backgroundColor: colors.white,
          borderRadius: 12,
          padding: cardPadding,
          marginLeft: cardMarginX,
          marginRight: cardMarginX,
          width: width - cardMarginX * 2,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}
      >
        {/* Person info row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 20,
          }}
        >
          {/* Circular headshot */}
          <div
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: '50%',
              overflow: 'hidden',
              flexShrink: 0,
              border: `3px solid ${colors.lightCoral1}`,
            }}
          >
            <img
              src={data.personPhoto}
              alt={data.personName}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          <div>
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: nameSize,
                fontWeight: 700,
                color: colors.black,
                lineHeight: 1.2,
              }}
            >
              {data.personName}
            </div>
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: titleSize,
                color: colors.darkGrey,
                lineHeight: 1.3,
                marginTop: 4,
              }}
            >
              {data.personTitle}
            </div>
          </div>
        </div>

        {/* Coral accent line */}
        <div
          style={{
            width: 60,
            height: 3,
            backgroundColor: colors.coral,
            marginBottom: 28,
          }}
        />

        {/* Insight text — Georgia italic */}
        <div
          style={{
            fontFamily: fonts.headline,
            fontSize: insightSize,
            fontStyle: 'italic',
            fontWeight: 400,
            color: colors.black,
            lineHeight: 1.45,
            marginBottom: data.hashtags ? 28 : 0,
          }}
        >
          {data.insight}
        </div>

        {/* Hashtags */}
        {data.hashtags && (
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: hashtagSize,
              color: colors.darkGrey,
              lineHeight: 1.4,
            }}
          >
            {data.hashtags}
          </div>
        )}
      </div>

      {/* Logo — small, bottom-right */}
      <img
        src={logos.academy}
        alt="SUE Behavioural Design Academy"
        style={{
          position: 'absolute',
          bottom: safe.bottom + 14,
          right: safe.sides + 20,
          height: 44,
          objectFit: 'contain',
        }}
      />
    </div>
  )
}
