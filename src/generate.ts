#!/usr/bin/env tsx
/**
 * Batch ad generation script
 *
 * Usage:
 *   npm run generate -- --input ../../data/variations.json
 *   npm run generate -- --input ../../data/variations.json --output ../../output/campaign-q1
 *   npm run generate -- --input ../../data/variations.json --formats 1080x1080,1080x1350
 */

import puppeteer from 'puppeteer'
import { readFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, join } from 'path'

interface GenerateConfig {
  template: 'stat' | 'statement' | 'quote'
  variations: Record<string, string>[]
  formats?: string[]
}

const FORMATS: Record<string, { width: number; height: number }> = {
  '1080x1080': { width: 1080, height: 1080 },
  '1080x1350': { width: 1080, height: 1350 },
  '1080x1920': { width: 1080, height: 1920 },
}

async function main() {
  const args = process.argv.slice(2)
  const inputIdx = args.indexOf('--input')
  const outputIdx = args.indexOf('--output')
  const formatsIdx = args.indexOf('--formats')

  if (inputIdx === -1) {
    console.error('Usage: npm run generate -- --input <path-to-json>')
    console.error('')
    console.error('JSON format:')
    console.error(JSON.stringify({
      template: 'stat',
      variations: [
        { stat: '94%', phrase: 'of decisions are made unconsciously', cta: 'Learn the science' },
      ],
      formats: ['1080x1080', '1080x1350', '1080x1920'],
    }, null, 2))
    process.exit(1)
  }

  const inputPath = resolve(args[inputIdx + 1])
  const config: GenerateConfig = JSON.parse(readFileSync(inputPath, 'utf-8'))

  const outputDir = outputIdx !== -1
    ? resolve(args[outputIdx + 1])
    : resolve('../../output', `${config.template}-${new Date().toISOString().slice(0, 10)}`)

  const selectedFormats = formatsIdx !== -1
    ? args[formatsIdx + 1].split(',')
    : config.formats || Object.keys(FORMATS)

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }

  console.log(`Template: ${config.template}`)
  console.log(`Variations: ${config.variations.length}`)
  console.log(`Formats: ${selectedFormats.join(', ')}`)
  console.log(`Output: ${outputDir}`)
  console.log(`Total files: ${config.variations.length * selectedFormats.length}`)
  console.log('')

  // Start the dev server temporarily
  const { createServer } = await import('vite')
  const server = await createServer({ server: { port: 5199 } })
  await server.listen()
  console.log('Dev server started on port 5199')

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  let count = 0
  const total = config.variations.length * selectedFormats.length

  for (const fmt of selectedFormats) {
    const { width, height } = FORMATS[fmt]
    await page.setViewport({ width: width * 2, height: height * 2, deviceScaleFactor: 2 })

    for (let i = 0; i < config.variations.length; i++) {
      const variation = config.variations[i]

      // Build a standalone HTML page for this specific ad
      const html = buildAdHtml(config.template, variation, width, height)
      await page.setContent(html, { waitUntil: 'networkidle0' })

      const filename = `SUE_${config.template}_${String(i + 1).padStart(3, '0')}_${fmt}.png`
      const filepath = join(outputDir, filename)

      const element = await page.$('#ad-root')
      if (element) {
        await element.screenshot({ path: filepath, type: 'png' })
      }

      count++
      process.stdout.write(`\r  [${count}/${total}] ${filename}`)
    }
  }

  console.log('\n\nDone!')
  await browser.close()
  await server.close()
}

function buildAdHtml(
  template: string,
  data: Record<string, string>,
  width: number,
  height: number,
): string {
  const coral = '#FF5A5F'
  const lightCoral1 = '#FFB7B9'
  const lightCoral2 = '#FFE5E5'
  const darkGrey = '#797979'
  const neutralGrey = '#F2F2F2'
  const black = '#333333'
  const white = '#FFFFFF'
  const georgia = "'Georgia', 'Times New Roman', serif"
  const openSans = "'Open Sans', -apple-system, Helvetica, Arial, sans-serif"
  const isStory = height > 1500
  const isPortrait = height > 1200 && !isStory
  const padding = isStory ? 80 : 60

  let content = ''

  if (template === 'stat') {
    const statSize = isStory ? 180 : isPortrait ? 160 : 140
    const phraseSize = isStory ? 36 : isPortrait ? 32 : 28
    content = `
      <div style="position:absolute;top:0;left:0;right:0;height:6px;background:${coral}"></div>
      <div style="font-family:${georgia};font-size:${statSize}px;font-weight:700;color:${coral};line-height:1;margin-bottom:24px">${data.stat}</div>
      <div style="font-family:${georgia};font-size:${phraseSize}px;font-weight:400;color:${black};line-height:1.3;max-width:85%">${data.phrase}</div>
      ${data.subtext ? `<div style="font-family:${openSans};font-size:${phraseSize * 0.6}px;color:${darkGrey};line-height:1.4;max-width:80%;margin-top:16px">${data.subtext}</div>` : ''}
    `
  } else if (template === 'statement') {
    const headlineSize = isStory ? 52 : isPortrait ? 46 : 42
    let headlineHtml = data.headline
    if (data.highlight && data.headline.includes(data.highlight)) {
      headlineHtml = data.headline.replace(
        data.highlight,
        `<span style="background:${lightCoral2};padding:2px 6px;color:${coral}">${data.highlight}</span>`
      )
    }
    content = `
      <div style="position:absolute;top:0;left:0;width:120px;height:6px;background:${coral}"></div>
      <div style="font-family:${georgia};font-size:${headlineSize}px;font-weight:700;color:${black};line-height:1.25;max-width:90%">${headlineHtml}</div>
      ${data.supporting ? `<div style="font-family:${georgia};font-size:${(isStory ? 26 : isPortrait ? 24 : 22)}px;font-style:italic;color:${darkGrey};line-height:1.4;max-width:85%;margin-top:28px">${data.supporting}</div>` : ''}
    `
  } else if (template === 'quote') {
    const quoteSize = isStory ? 44 : isPortrait ? 40 : 36
    content = `
      <div style="font-family:${georgia};font-size:${isStory ? 200 : 160}px;font-weight:700;color:${lightCoral1};line-height:0.6;margin-bottom:20px">\u201C</div>
      <div style="font-family:${georgia};font-size:${quoteSize}px;font-style:italic;font-weight:400;color:${black};line-height:1.35;max-width:90%;margin-bottom:24px">${data.quote}</div>
      ${data.attribution ? `<div style="font-family:${openSans};font-size:${isStory ? 22 : isPortrait ? 20 : 18}px;font-weight:600;color:${coral}">${data.attribution}</div>` : ''}
    `
  }

  const bg = template === 'quote' ? neutralGrey : white
  const ctaSize = isStory ? 18 : 16

  return `<!DOCTYPE html>
<html>
<head>
<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
* { margin: 0; padding: 0; box-sizing: border-box; }
</style>
</head>
<body>
<div id="ad-root" style="width:${width}px;height:${height}px;position:relative;overflow:hidden;background:${bg};display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:${padding}px">
  ${content}
  <div style="position:absolute;bottom:${isStory ? 160 : 100}px;left:${padding}px">
    <div style="background:${coral};color:${white};font-family:${openSans};font-size:${ctaSize}px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding:14px 32px">${data.cta}</div>
  </div>
  <div style="position:absolute;bottom:${isStory ? 100 : 40}px;left:${padding}px;font-family:${openSans};font-size:14px;font-weight:700;color:${darkGrey};letter-spacing:2px;text-transform:uppercase">
    SUE <span style="font-weight:400">| Behavioural Design</span>
  </div>
</div>
</body>
</html>`
}

main().catch(console.error)
