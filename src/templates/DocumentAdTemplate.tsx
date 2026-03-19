import React from 'react'
import { colors, fonts, formats, getSafePadding, logos, type FormatKey } from '../brand'

export interface DocumentAdData {
  documentTitle: string
  steps: { number: string; title: string; description: string }[]
  cta: string
}

interface Props {
  data: DocumentAdData
  format: FormatKey
}

export const DocumentAdTemplate: React.FC<Props> = ({ data, format }) => {
  const { width, height } = formats[format]
  const safe = getSafePadding(format)
  const isStory = format === '1080x1920'
  const isPortrait = format === '1080x1350'

  const docTitleSize = isStory ? 48 : isPortrait ? 42 : 40
  const stepNumberSize = isStory ? 48 : isPortrait ? 42 : 38
  const stepTitleSize = isStory ? 28 : isPortrait ? 24 : 22
  const stepDescSize = isStory ? 22 : isPortrait ? 20 : 18
  const ctaSize = isStory ? 24 : 22
  const docPadding = isStory ? 60 : isPortrait ? 50 : 44
  const docMarginX = safe.sides + 40

  const visibleSteps = data.steps.slice(0, 4)

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: colors.neutralGrey,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: safe.top,
        paddingBottom: safe.bottom,
      }}
    >
      {/* Document card */}
      <div
        style={{
          backgroundColor: colors.white,
          borderRadius: 8,
          marginLeft: docMarginX,
          marginRight: docMarginX,
          width: width - docMarginX * 2,
          padding: docPadding,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 6px 32px rgba(0,0,0,0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Coral top bar accent */}
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

        {/* Document title */}
        <div
          style={{
            fontFamily: fonts.headline,
            fontSize: docTitleSize,
            fontWeight: 700,
            color: colors.black,
            lineHeight: 1.25,
            marginTop: 10,
            marginBottom: 36,
          }}
        >
          {data.documentTitle}
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: isStory ? 32 : 26 }}>
          {visibleSteps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              {/* Coral number */}
              <div
                style={{
                  fontFamily: fonts.headline,
                  fontSize: stepNumberSize,
                  fontWeight: 700,
                  color: colors.coral,
                  lineHeight: 1,
                  flexShrink: 0,
                  minWidth: isStory ? 56 : 48,
                }}
              >
                {step.number}
              </div>

              <div style={{ flex: 1 }}>
                {/* Step title */}
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: stepTitleSize,
                    fontWeight: 700,
                    color: colors.black,
                    lineHeight: 1.3,
                    marginBottom: 6,
                  }}
                >
                  {step.title}
                </div>
                {/* Step description */}
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: stepDescSize,
                    color: colors.darkGrey,
                    lineHeight: 1.5,
                  }}
                >
                  {step.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Separator */}
        <div
          style={{
            width: '100%',
            height: 1,
            backgroundColor: colors.neutralGrey,
            marginTop: 30,
            marginBottom: 24,
          }}
        />

        {/* CTA within the document */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            }}
          >
            {data.cta}
          </div>

          {/* Logo inside the document card */}
          <img
            src={logos.academy}
            alt="SUE Behavioural Design Academy"
            style={{
              height: 44,
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
    </div>
  )
}
