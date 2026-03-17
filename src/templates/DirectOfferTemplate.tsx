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

  const courseSize = isStory ? 56 : isPortrait ? 50 : 48
  const valueSize = isStory ? 28 : isPortrait ? 24 : 22
  const benefitSize = isStory ? 24 : isPortrait ? 20 : 19
  const detailSize = isStory ? 22 : 20
  const ctaSize = isStory ? 22 : 20

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
        paddingTop: safe.top,
        paddingBottom: safe.bottom,
        paddingLeft: safe.sides,
        paddingRight: safe.sides,
      }}
    >
      {/* Photo panel (right side) */}
      {data.photo && (
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: isStory ? '100%' : '40%',
          height: isStory ? '40%' : '100%',
          overflow: 'hidden',
        }}>
          <img
            src={data.photo}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />
          {/* Gradient overlay for text readability */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isStory
              ? 'linear-gradient(to top, #FFE5E5 15%, transparent 60%)'
              : 'linear-gradient(to right, #FFE5E5 10%, transparent 50%)',
          }} />
        </div>
      )}

      {/* Coral accent — top bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: data.photo && !isStory ? '40%' : 0,
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
          maxWidth: data.photo && !isStory ? '55%' : '90%',
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
              fontSize: 20,
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
        style={{ position: 'absolute', bottom: safe.bottom + 14, right: safe.sides, height: 48, objectFit: 'contain' }}
      />
    </div>
  )
}
