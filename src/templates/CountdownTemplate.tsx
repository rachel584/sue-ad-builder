import React from 'react'
import { colors, fonts, formats, getSafePadding, logos, type FormatKey } from '../brand'

export interface CountdownData {
  seatsLeft: number | string
  courseName: string
  date: string
  location?: string
  cta: string
}

interface Props {
  data: CountdownData
  format: FormatKey
}

export const CountdownTemplate: React.FC<Props> = ({ data, format }) => {
  const { width, height } = formats[format]
  const safe = getSafePadding(format)
  const isStory = format === '1080x1920'

  const lastSize = isStory ? 30 : 24
  const numberSize = isStory ? 200 : format === '1080x1350' ? 180 : 160
  const seatsSize = isStory ? 30 : 24
  const courseSize = isStory ? 44 : format === '1080x1350' ? 38 : 36
  const detailSize = isStory ? 22 : 20
  const ctaSize = isStory ? 22 : 19

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
        paddingLeft: safe.sides,
        paddingRight: safe.sides,
        textAlign: 'center',
      }}
    >
      {/* Coral accent bar at top */}
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

      {/* "LAST" text */}
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: lastSize,
          fontWeight: 700,
          color: colors.darkGrey,
          textTransform: 'uppercase',
          letterSpacing: 6,
          marginBottom: 4,
        }}
      >
        Last
      </div>

      {/* Big coral number with faded circle behind */}
      <div style={{ position: 'relative', marginBottom: 4 }}>
        {/* Light coral circle */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: numberSize * 1.1,
            height: numberSize * 1.1,
            borderRadius: '50%',
            backgroundColor: colors.lightCoral2,
          }}
        />
        {/* The number */}
        <div
          style={{
            fontFamily: fonts.headline,
            fontSize: numberSize,
            fontWeight: 700,
            color: colors.coral,
            lineHeight: 1,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {data.seatsLeft}
        </div>
      </div>

      {/* "SEATS" text */}
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: seatsSize,
          fontWeight: 700,
          color: colors.darkGrey,
          textTransform: 'uppercase',
          letterSpacing: 6,
          marginBottom: 32,
        }}
      >
        Seats
      </div>

      {/* Course name */}
      <div
        style={{
          fontFamily: fonts.headline,
          fontSize: courseSize,
          fontWeight: 700,
          color: colors.black,
          lineHeight: 1.25,
          marginBottom: 12,
          maxWidth: '80%',
        }}
      >
        {data.courseName}
      </div>

      {/* Date + location */}
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: detailSize,
          color: colors.darkGrey,
        }}
      >
        {data.date}{data.location ? ` \u00b7 ${data.location}` : ''}
      </div>

      {/* CTA button */}
      <div
        style={{
          position: 'absolute',
          bottom: safe.bottom + 40,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <div
          style={{
            backgroundColor: colors.coral,
            color: colors.white,
            fontFamily: fonts.body,
            fontSize: ctaSize,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 2,
            padding: '20px 48px',
          }}
        >
          {data.cta}
        </div>
      </div>

      {/* Logo */}
      <img
        src={logos.academy}
        alt="SUE Behavioural Design Academy"
        style={{ position: 'absolute', bottom: safe.bottom + 14, left: '50%', transform: 'translateX(-50%)', height: 48, objectFit: 'contain' }}
      />
    </div>
  )
}
