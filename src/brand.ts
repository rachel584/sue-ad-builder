// SUE Behavioural Design — Brand Constants
// Source: designer-brief-quality-gate.md
// RULE: Never use dark/black backgrounds. Light palette only.

export const colors = {
  coral: '#FF5A5F',
  lightCoral1: '#FFB7B9',
  lightCoral2: '#FFE5E5',
  darkGrey: '#797979',
  neutralGrey: '#F2F2F2',
  white: '#FFFFFF',
  black: '#333333', // Text only — never use as background
  // Extended palette — LIGHT ONLY
  offWhite: '#FAF9F6',       // Editorial bg (cleaner than pure white)
  warmGrey: '#E8E6E1',       // Subtle contrast (before/after splits)
  creamLight: '#F5F0EB',     // Warm cream for variety
} as const

export const fonts = {
  headline: "'Georgia', 'Times New Roman', serif",
  body: "'Open Sans', -apple-system, Helvetica, Arial, sans-serif",
} as const

// Ad format dimensions
export const formats = {
  '1080x1080': { width: 1080, height: 1080, label: 'Square (1:1)' },
  '1080x1350': { width: 1080, height: 1350, label: 'Portrait (4:5)' },
  '1080x1920': { width: 1080, height: 1920, label: 'Story (9:16)' },
} as const

export type FormatKey = keyof typeof formats

// ── Safe zones for Meta / TikTok / Reels ────────────────────────────
// Platform UI overlays cover parts of the ad image.
// All critical content (text, CTA, logo) must stay INSIDE these areas.
export const safeZones = {
  '1080x1920': { top: 250, bottom: 400, sides: 60 },  // Story/Reels: heavy UI
  '1080x1350': { top: 40, bottom: 100, sides: 50 },    // Portrait feed
  '1080x1080': { top: 40, bottom: 80, sides: 50 },     // Square feed
} as const

// Helper: get content-safe padding for any format
export const getSafePadding = (format: FormatKey) => {
  return safeZones[format]
}

// Base URL — adapts to GitHub Pages (/sue-ad-builder/) vs local dev (/)
const BASE = import.meta.env.BASE_URL

// Logo paths (served from /public)
export const logos = {
  bol: `${BASE}sue-bol.png`,
  academy: `${BASE}sue-logo-academy.png`,
}

// Photography from May 2025 SUE Academy photoshoot (served from /public)
export const photos = {
  tomTeaching: `${BASE}sue-tom-teaching.jpg`,
  studioSpace: `${BASE}sue-studio-space.jpg`,
  trainerPresenting: `${BASE}sue-trainer-presenting.jpg`,
  onlineLearning: `${BASE}sue-online-learning.jpg`,
  workshopMaterials: `${BASE}sue-workshop-materials.jpg`,
  classroomGroup: `${BASE}sue-classroom-group.jpg`,
  classroomWide: `${BASE}sue-classroom-wide.jpg`,
  studioBreak: `${BASE}sue-studio-break.jpg`,
  studentsEngaged: `${BASE}sue-students-engaged.jpg`,
  conversation: `${BASE}sue-conversation.jpg`,
}

export type PhotoKey = keyof typeof photos

// Language type
export type Language = 'NL' | 'EN'

// Shared styles used across all templates
export const baseStyles = {
  container: (width: number, height: number): React.CSSProperties => ({
    width,
    height,
    position: 'relative',
    overflow: 'hidden',
    fontFamily: fonts.body,
  }),
  logo: {
    position: 'absolute' as const,
    bottom: 40,
    left: 40,
    fontFamily: fonts.body,
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },
  cta: {
    fontFamily: fonts.body,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
  },
}
