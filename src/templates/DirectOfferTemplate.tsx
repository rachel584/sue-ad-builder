import React from 'react'
import { colors, fonts, formats, getSafePadding, logos, photos, type FormatKey } from '../brand'

export interface DirectOfferData {
  courseName: string       // e.g. "Behavioural Design Fundamentals"
  valueProp: string        // One-line value proposition
  benefits: string[]       // 3 benefit bullets
  price: string            // e.g. "EUR 1,495"
  date: string             // e.g. "May 15-16, 2026"
  location?: string        // e.g. "Amsterdam"
  cta: string              // e.g. "Enroll Now"
  photo?: string           // Optional photo path from photos config
}

interface Props {
  data: DirectOfferData
  format: FormatKey
}

export const DirectOfferTemplate: React.FC<Props> = ({ data, format }) => {
  const { width, height } = formats[format]
  const safe = getSafePadding(format)
  const isStory = format === '1080x1920'
  const isPortrait = format === '1080x1350'

  const courseSize = isStory ? 68 : isPortrait ? 62 : 58
  const valueSize = isStory ? 34 : isPortrait ? 30 : 28
  const benefitSize = isStory ? 30 : isPortrait ? 26 : 24
  const detailSize = isStory ? 26 : 24
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
        paddingTop: data.photo ? height * 0.32 : safe.top,
        paddingBottom: safe.bottom,
        paddingLeft: safe.sides,
        paddingRight: safe.sides,
      }}
    >
      {/* Photo strip — top of frame */}
      {data.photo && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '38%',
          overflow: 'hidden',
          zIndex: 0,
        }}>
          <img
            src={data.photo}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
            }}
          />
          {/* Gradient fade into background */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to top, #FFE5E5, transparent)',
          }} />
        </div>
      )}

      {/* Coral accent — top bar */}
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

      {/* Course name */}
      <div
        style={{
          fontFamily: fonts.headline,
          fontSize: courseSize,
          fontWeight: 700,
          color: colors.black,
          lineHeight: 1.2,
          marginBottom: 16,
          maxWidth: '90%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {data.courseName}
      </div>

      {/* Value proposition */}
      <div
        style={{
          fontFamily: fonts.headline,
          fontSize: valueSize,
          fontStyle: 'italic',
          color: colors.darkGrey,
          lineHeight: 1.4,
          marginBottom: 32,
          maxWidth: '85%',
        }}
      >
        {data.valueProp}
      </div>

      {/* Benefits with checkmarks */}
      <div style={{ marginBottom: 32 }}>
        {data.benefits.slice(0, 3).map((benefit, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: 16,
            }}
          >
            <span style={{
              color: colors.coral,
              fontSize: 24,
              fontWeight: 700,
              fontFamily: fonts.body,
              lineHeight: 1,
            }}>
              ✓
            </span>
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: benefitSize,
                color: colors.black,
                lineHeight: 1.3,
              }}
            >
              {benefit}
            </span>
          </div>
        ))}
      </div>

      {/* Price + Date + Location bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 24,
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: detailSize,
            fontWeight: 700,
            color: colors.black,
          }}
        >
          {data.price}
        </span>
        <span style={{ color: colors.lightCoral1, fontSize: detailSize }}>|</span>
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: detailSize,
            color: colors.darkGrey,
          }}
        >
          {data.date}
        </span>
        {data.location && (
          <>
            <span style={{ color: colors.lightCoral1, fontSize: detailSize }}>|</span>
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: detailSize,
                color: colors.darkGrey,
              }}
            >
              {data.location}
            </span>
          </>
        )}
      </div>

      {/* CTA button */}
      <div style={{ position: 'absolute', bottom: safe.bottom + 50, left: safe.sides }}>
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
        style={{ position: 'absolute', bottom: safe.bottom + 14, right: safe.sides, height: 56, objectFit: 'contain' }}
      />
    </div>
  )
}
