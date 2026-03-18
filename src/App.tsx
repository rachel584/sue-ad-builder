import React, { useState, useRef, useCallback } from 'react'
import { toPng } from 'html-to-image'
import JSZip from 'jszip'
import { StatTemplate, type StatData } from './templates/StatTemplate'
import { StatementTemplate, type StatementData } from './templates/StatementTemplate'
import { QuoteTemplate, type QuoteData } from './templates/QuoteTemplate'
import { PatternInterruptTemplate, type PatternInterruptData } from './templates/PatternInterruptTemplate'
import { ProvocativeQuestionTemplate, type ProvocativeQuestionData } from './templates/ProvocativeQuestionTemplate'
import { MythBusterTemplate, type MythBusterData } from './templates/MythBusterTemplate'
import { BeforeAfterTemplate, type BeforeAfterData } from './templates/BeforeAfterTemplate'
import { LeadMagnetTemplate, type LeadMagnetData } from './templates/LeadMagnetTemplate'
import { DirectOfferTemplate, type DirectOfferData } from './templates/DirectOfferTemplate'
import { CountdownTemplate, type CountdownData } from './templates/CountdownTemplate'
import { formats, type FormatKey, type Language, colors, photos } from './brand'

// ── Template registry ──────────────────────────────────────────────
type TemplateType =
  | 'patternInterrupt' | 'stat' | 'provocativeQuestion' | 'mythBuster'
  | 'statement' | 'quote'
  | 'beforeAfter' | 'leadMagnet'
  | 'directOffer' | 'countdown'

type AnyData =
  | PatternInterruptData | StatData | ProvocativeQuestionData | MythBusterData
  | StatementData | QuoteData
  | BeforeAfterData | LeadMagnetData
  | DirectOfferData | CountdownData

interface TemplateInfo {
  label: string
  stage: 'TOFU' | 'MOFU' | 'BOFU'
  stageLabel: string
  description: string
}

const templateInfo: Record<TemplateType, TemplateInfo> = {
  patternInterrupt: { label: 'Pattern Interrupt', stage: 'TOFU', stageLabel: 'Awareness', description: 'Dark bg, contrarian statement' },
  stat:             { label: 'Big Number',        stage: 'TOFU', stageLabel: 'Awareness', description: 'Hero stat + phrase' },
  provocativeQuestion: { label: 'Question',       stage: 'TOFU', stageLabel: 'Awareness', description: 'Provocative question + giant ?' },
  mythBuster:       { label: 'Myth Buster',       stage: 'TOFU', stageLabel: 'Awareness', description: 'Split dark/light myth vs truth' },
  statement:        { label: 'Statement',          stage: 'MOFU', stageLabel: 'Consideration', description: 'Bold headline + highlight' },
  quote:            { label: 'Social Proof',       stage: 'MOFU', stageLabel: 'Consideration', description: 'Quote + attribution' },
  beforeAfter:      { label: 'Before / After',     stage: 'MOFU', stageLabel: 'Consideration', description: 'Top/bottom transformation' },
  leadMagnet:       { label: 'Lead Magnet',        stage: 'MOFU', stageLabel: 'Consideration', description: 'Free guide + PDF mockup' },
  directOffer:      { label: 'Direct Offer',       stage: 'BOFU', stageLabel: 'Conversion', description: 'Course + benefits + price' },
  countdown:        { label: 'Countdown',          stage: 'BOFU', stageLabel: 'Conversion', description: 'Urgency / last seats' },
}

// ── Sample data per template (ENGLISH) ─────────────────────────────
const sampleDataEN: Record<TemplateType, AnyData[]> = {
  patternInterrupt: [
    { headline: 'Your change project failed because people aren\u2019t rational.', accentWord: 'rational' },
    { headline: 'Your customers already decided. Before they saw your ad.', accentWord: 'already decided' },
    { headline: 'Scaling behaviour change is not a technology problem.', accentWord: 'not' },
    { headline: 'Stop training people. Start designing their environment.', accentWord: 'environment' },
    { headline: 'The biggest lie in marketing is that people weigh the pros and cons.', accentWord: 'biggest lie' },
    { headline: 'Nobody resists change. They resist bad design.', accentWord: 'bad design' },
  ],
  stat: [
    { stat: '70%', phrase: 'of change projects fail. Yours doesn\u2019t have to.', cta: 'Get the Influence Framework' },
    { stat: '12%', phrase: 'of transformations succeed. The other 88% ignored how people actually change.', cta: 'Explore Behavioural Design' },
    { stat: '95%', phrase: 'of decisions are made unconsciously. Yet most marketing still targets the rational mind.', cta: 'Learn Behavioural Design' },
    { stat: '80%', phrase: 'of training participants never change their behaviour. The problem isn\u2019t the people.', cta: 'See a Better Way' },
    { stat: '50%', phrase: 'of training is forgotten within 2 weeks. There\u2019s a science to making it stick.', cta: 'Learn the Sticky Method' },
    { stat: '75%', phrase: 'of employees don\u2019t feel confident using AI. That\u2019s not a tech problem. It\u2019s a behaviour problem.', cta: 'Solve Behaviour Problems' },
  ],
  provocativeQuestion: [
    { question: 'What if your audience already made their decision before they saw your campaign?' },
    { question: 'What if the problem with your change program is not resistance \u2014 but design?' },
    { question: 'Why do smart people make irrational choices?', subtext: 'Behavioural design has the answer.' },
    { question: 'What if giving people more information actually makes them decide worse?' },
    { question: 'What if your employees aren\u2019t resisting change \u2014 they\u2019re just being human?' },
  ],
  mythBuster: [
    { myth: 'People make rational decisions.', truth: '95% of decisions are made by the unconscious mind.', cta: 'Learn the Science' },
    { myth: 'More information leads to better choices.', truth: 'Choice overload causes decision paralysis.', cta: 'Discover Behavioural Design' },
    { myth: 'Change resistance is a people problem.', truth: 'It\u2019s a design problem.', cta: 'Get the Framework' },
    { myth: 'Good training changes behaviour.', truth: '80% of participants never apply what they learn.', cta: 'Try a Better Method' },
    { myth: 'AI adoption is a tech problem.', truth: 'It\u2019s a behaviour problem.', cta: 'Solve It with Design' },
  ],
  statement: [
    { headline: 'Stop designing for the rational mind. Your audience doesn\u2019t have one.', highlight: 'rational mind', cta: 'Upgrade Your Approach', photo: photos.classroomGroup },
    { headline: 'Stop managing change. Start designing for behaviour.', highlight: 'designing for behaviour', cta: 'Discover the Difference', photo: photos.trainerPresenting },
    { headline: 'Stop calling it training. If nobody changes, it was just an expensive meeting.', highlight: 'expensive meeting', cta: 'Explore the Academy' },
    { headline: 'You don\u2019t need another theory. You need a toolkit that works on Monday morning.', highlight: 'Monday morning', cta: 'Get the Toolkit', photo: photos.workshopMaterials },
    { headline: 'Post-it notes won\u2019t change behaviour. You need a science, not a brainstorm.', highlight: 'a science', cta: 'Learn the Science' },
    { headline: 'AI won\u2019t replace the human side of change. But it will replace leaders who ignore it.', highlight: 'replace leaders who ignore it', cta: 'Stay Ahead' },
    { headline: 'Pizza parties don\u2019t fix disengagement. Understanding human behaviour does.', highlight: 'human behaviour', cta: 'Get Trained in Behavioural Design' },
    { headline: 'Is nudging manipulation? Only if you do it wrong.', highlight: 'do it wrong', cta: 'Learn the Ethical Framework' },
  ],
  quote: [
    { quote: 'They agreed to the change. They believed in it. They still didn\u2019t do it.', attribution: '\u2014 Every change manager ever', cta: 'Learn Why', photo: photos.studentsEngaged },
    { quote: 'We spent six months on the perfect strategy. Then humans happened.', attribution: '\u2014 Strategy Director, Tech Company', cta: 'Design for Real Humans', photo: photos.studioBreak },
    { quote: 'We trained 500 managers. Nothing changed. Then we taught them behavioural design.', attribution: '\u2014 L&D Director, Global Consultancy', cta: 'Get the Full Story', photo: photos.conversation },
    { quote: 'If clicking through slides changed behaviour, we\u2019d all be perfect by now.', attribution: '\u2014 Frustrated HR Manager', cta: 'Try Something That Works' },
    { quote: 'We rolled out AI tools. Nobody used them. That\u2019s when I realized: this is a behaviour problem.', attribution: '\u2014 CTO, Mid-Size Enterprise', cta: 'Solve the Adoption Problem' },
    { quote: 'Design thinking gave us empathy. Behavioural design gave us results.', attribution: '\u2014 UX Director, SaaS Company', cta: 'Get Results' },
  ],
  beforeAfter: [
    { before: 'They resisted because they didn\u2019t care.', after: 'They resisted because the change was badly designed.', cta: 'Transform Your Approach' },
    { before: 'Optimized for clicks.', after: 'Optimized for decisions.', cta: 'Discover Behavioural Design' },
    { before: 'More options. More confusion.', after: 'Fewer options. Triple conversions.', cta: 'Learn the Framework' },
    { before: 'Mandated AI adoption.', after: 'Designed for natural adoption.', cta: 'Design for Behaviour' },
  ],
  leadMagnet: [
    {
      headline: 'The Change Leader\u2019s Guide to Behavioural Design',
      bullets: ['The 3 invisible forces that kill change programs', 'A framework you can apply Monday morning', 'Real case studies from organizational transformations'],
      resourceTitle: 'The Change Leader\u2019s Guide to Behavioural Design',
      cta: 'Download Free Guide',
    },
    {
      headline: '5 Cognitive Biases That Make or Break Your Campaigns',
      bullets: ['Why people ignore your best offers', 'The bias behind every viral campaign', 'Applied examples from real brands'],
      resourceTitle: '5 Cognitive Biases for Marketers',
      cta: 'Get Your Free Copy',
    },
    {
      headline: 'The SUE Influence Framework \u2014 A Step-by-Step Toolkit',
      bullets: ['Map the behavioural drivers behind any decision', 'Design nudges that ethically shift behaviour', 'Measure the impact of your interventions'],
      resourceTitle: 'The SUE Influence Framework',
      cta: 'Download the Toolkit',
    },
  ],
  directOffer: [
    {
      courseName: 'Behavioural Design Fundamentals x AI',
      valueProp: 'Master the science of human decision-making. With AI-powered tools.',
      benefits: ['Learn 25+ cognitive biases and how to apply them', 'Get the SUE Influence Framework toolkit', 'Certificate of completion + AI Guru access'],
      price: '\u20ac1,495',
      date: 'May 15\u201316, 2026',
      location: 'Amsterdam',
      cta: 'Enroll Now \u2014 Limited Seats',
      photo: photos.onlineLearning,
    },
    {
      courseName: 'Behavioural Design for AI Adoption',
      valueProp: 'Make AI work by making behaviour change work first.',
      benefits: ['The psychology behind technology resistance', 'Design interventions that drive real adoption', 'AI-specific case studies from enterprise rollouts'],
      price: '\u20ac590',
      date: 'On-demand',
      location: 'Online',
      cta: 'Start Today',
      photo: photos.tomTeaching,
    },
  ],
  countdown: [
    { seatsLeft: 6, courseName: 'Behavioural Design Fundamentals x AI', date: 'May 15\u201316, 2026', location: 'Amsterdam', cta: 'Secure Your Spot' },
    { seatsLeft: 4, courseName: 'Advanced Behavioural Design', date: 'June 5\u20136, 2026', location: 'Amsterdam', cta: 'Register Now' },
    { seatsLeft: 3, courseName: 'AI Deep Dive', date: 'April 24, 2026', location: 'Amsterdam', cta: 'Claim Your Seat' },
  ],
}

// ── Sample data per template (DUTCH) ───────────────────────────────
const sampleDataNL: Record<TemplateType, AnyData[]> = {
  patternInterrupt: [
    { headline: 'Je veranderproject faalde omdat mensen niet rationeel zijn.', accentWord: 'niet rationeel' },
    { headline: 'Je klanten hebben al besloten. Voordat ze je advertentie zagen.', accentWord: 'al besloten' },
    { headline: 'Gedragsverandering opschalen is geen technologieprobleem.', accentWord: 'geen' },
    { headline: 'Stop met mensen trainen. Begin met hun omgeving te ontwerpen.', accentWord: 'omgeving' },
    { headline: 'De grootste leugen in marketing is dat mensen voor- en nadelen afwegen.', accentWord: 'grootste leugen' },
    { headline: 'Niemand verzet zich tegen verandering. Ze verzetten zich tegen slecht ontwerp.', accentWord: 'slecht ontwerp' },
  ],
  stat: [
    { stat: '70%', phrase: 'van veranderprojecten faalt. Die van jou hoeft dat niet.', cta: 'Ontdek het Influence Framework' },
    { stat: '12%', phrase: 'van transformaties slaagt. De andere 88% negeerde hoe mensen echt veranderen.', cta: 'Ontdek Behavioural Design' },
    { stat: '95%', phrase: 'van beslissingen wordt onbewust genomen. Toch richt marketing zich op het rationele brein.', cta: 'Leer Behavioural Design' },
    { stat: '80%', phrase: 'van deelnemers verandert nooit hun gedrag na een training. Het probleem zijn niet de mensen.', cta: 'Bekijk een betere aanpak' },
    { stat: '50%', phrase: 'van training is binnen 2 weken vergeten. Er is een wetenschap om het te laten beklijven.', cta: 'Leer de methode' },
    { stat: '75%', phrase: 'van medewerkers voelt zich niet zeker bij het gebruik van AI. Dat is geen techprobleem. Het is een gedragsprobleem.', cta: 'Los gedragsproblemen op' },
  ],
  provocativeQuestion: [
    { question: 'Wat als je doelgroep al besloten had voordat ze je campagne zagen?' },
    { question: 'Wat als het probleem met je veranderprogramma geen weerstand is \u2014 maar ontwerp?' },
    { question: 'Waarom maken slimme mensen irrationele keuzes?', subtext: 'Behavioural Design heeft het antwoord.' },
    { question: 'Wat als meer informatie geven mensen juist slechter laat kiezen?' },
    { question: 'Wat als je medewerkers geen weerstand bieden \u2014 maar gewoon mens zijn?' },
  ],
  mythBuster: [
    { myth: 'Mensen nemen rationele beslissingen.', truth: '95% van beslissingen wordt door het onbewuste brein genomen.', cta: 'Leer de wetenschap' },
    { myth: 'Meer informatie leidt tot betere keuzes.', truth: 'Keuzestress veroorzaakt beslissingsverlamming.', cta: 'Ontdek Behavioural Design' },
    { myth: 'Weerstand tegen verandering is een mensenprobleem.', truth: 'Het is een ontwerpprobleem.', cta: 'Krijg het framework' },
    { myth: 'Goede training verandert gedrag.', truth: '80% van deelnemers past nooit toe wat ze leren.', cta: 'Probeer een betere methode' },
    { myth: 'AI-adoptie is een techprobleem.', truth: 'Het is een gedragsprobleem.', cta: 'Los het op met design' },
  ],
  statement: [
    { headline: 'Stop met ontwerpen voor het rationele brein. Je doelgroep heeft er geen.', highlight: 'rationele brein', cta: 'Verbeter je aanpak', photo: photos.classroomGroup },
    { headline: 'Stop met verandering managen. Begin met ontwerpen voor gedrag.', highlight: 'ontwerpen voor gedrag', cta: 'Ontdek het verschil', photo: photos.trainerPresenting },
    { headline: 'Stop het training noemen. Als niemand verandert, was het gewoon een dure vergadering.', highlight: 'dure vergadering', cta: 'Bekijk de Academy' },
    { headline: 'Je hebt geen nieuwe theorie nodig. Je hebt een toolkit nodig die maandagochtend werkt.', highlight: 'maandagochtend', cta: 'Krijg de toolkit', photo: photos.workshopMaterials },
    { headline: 'Post-its veranderen geen gedrag. Je hebt een wetenschap nodig, geen brainstorm.', highlight: 'wetenschap', cta: 'Leer de wetenschap' },
    { headline: 'AI vervangt de menselijke kant van verandering niet. Maar het vervangt wel leiders die het negeren.', highlight: 'leiders die het negeren', cta: 'Blijf voorop' },
    { headline: 'Pizzafeestjes lossen desinteresse niet op. Menselijk gedrag begrijpen wel.', highlight: 'menselijk gedrag', cta: 'Train jezelf in Behavioural Design' },
    { headline: 'Is nudging manipulatie? Alleen als je het verkeerd doet.', highlight: 'verkeerd doet', cta: 'Leer het ethische framework' },
  ],
  quote: [
    { quote: 'Ze waren het eens met de verandering. Ze geloofden erin. Ze deden het alsnog niet.', attribution: '\u2014 Elke change manager ooit', cta: 'Leer waarom', photo: photos.studentsEngaged },
    { quote: 'We werkten zes maanden aan de perfecte strategie. Toen kwamen de mensen.', attribution: '\u2014 Strategy Director, Tech Bedrijf', cta: 'Ontwerp voor echte mensen', photo: photos.studioBreak },
    { quote: 'We trainden 500 managers. Er veranderde niets. Toen leerden we ze behavioural design.', attribution: '\u2014 L&D Director, Internationaal Consultancy', cta: 'Lees het hele verhaal', photo: photos.conversation },
    { quote: 'Als doorklikken door slides gedrag veranderde, waren we allemaal perfect.', attribution: '\u2014 Gefrustreerde HR Manager', cta: 'Probeer iets dat werkt' },
    { quote: 'We rolden AI-tools uit. Niemand gebruikte ze. Toen besefte ik: dit is een gedragsprobleem.', attribution: '\u2014 CTO, Middelgroot Bedrijf', cta: 'Los het adoptieprobleem op' },
    { quote: 'Design thinking gaf ons empathie. Behavioural design gaf ons resultaten.', attribution: '\u2014 UX Director, SaaS Bedrijf', cta: 'Krijg resultaten' },
  ],
  beforeAfter: [
    { before: 'Ze hielden tegen omdat het ze niet boeide.', after: 'Ze hielden tegen door slecht ontwerp.', cta: 'Transformeer je aanpak' },
    { before: 'Geoptimaliseerd op clicks.', after: 'Geoptimaliseerd op beslissingen.', cta: 'Ontdek Behavioural Design' },
    { before: 'Meer opties. Meer verwarring.', after: 'Minder opties. Drie keer meer conversies.', cta: 'Leer het framework' },
    { before: 'AI-adoptie verplicht.', after: 'Adoptie vanzelf ontworpen.', cta: 'Ontwerp voor gedrag' },
  ],
  leadMagnet: [
    {
      headline: 'De Gids voor Veranderleiders over Behavioural Design',
      bullets: ['De 3 onzichtbare krachten die veranderprogramma\u2019s doden', 'Een framework dat je maandagochtend kunt toepassen', 'Echte cases van organisatietransformaties'],
      resourceTitle: 'De Gids voor Veranderleiders',
      cta: 'Download gratis gids',
    },
    {
      headline: '5 Cognitieve Biases die je Campagnes Maken of Breken',
      bullets: ['Waarom mensen je beste aanbiedingen negeren', 'De bias achter elke virale campagne', 'Toegepaste voorbeelden van echte merken'],
      resourceTitle: '5 Cognitieve Biases voor Marketeers',
      cta: 'Ontvang je gratis exemplaar',
    },
    {
      headline: 'Het SUE Influence Framework \u2014 Een Stap-voor-Stap Toolkit',
      bullets: ['Breng de gedragsdrijfveren achter elke beslissing in kaart', 'Ontwerp nudges die ethisch gedrag sturen', 'Meet de impact van je interventies'],
      resourceTitle: 'Het SUE Influence Framework',
      cta: 'Download de toolkit',
    },
  ],
  directOffer: [
    {
      courseName: 'Behavioural Design Fundamentals x AI',
      valueProp: 'Beheers de wetenschap van menselijke besluitvorming. Met AI-tools.',
      benefits: ['Leer 25+ cognitieve biases en hoe je ze toepast', 'Krijg de SUE Influence Framework toolkit', 'Certificaat + toegang tot de AI Guru'],
      price: '\u20ac1.495',
      date: '15\u201316 mei 2026',
      location: 'Amsterdam',
      cta: 'Schrijf je nu in',
      photo: photos.onlineLearning,
    },
    {
      courseName: 'Behavioural Design voor AI Adoptie',
      valueProp: 'Laat AI werken door gedragsverandering te laten werken.',
      benefits: ['De psychologie achter technologieweerstand', 'Ontwerp interventies die echte adoptie stimuleren', 'AI-specifieke cases van enterprise rollouts'],
      price: '\u20ac590',
      date: 'On-demand',
      location: 'Online',
      cta: 'Start vandaag',
      photo: photos.tomTeaching,
    },
  ],
  countdown: [
    { seatsLeft: 6, courseName: 'Behavioural Design Fundamentals x AI', date: '15\u201316 mei 2026', location: 'Amsterdam', cta: 'Reserveer je plek' },
    { seatsLeft: 4, courseName: 'Advanced Behavioural Design', date: '5\u20136 juni 2026', location: 'Amsterdam', cta: 'Schrijf je nu in' },
    { seatsLeft: 3, courseName: 'AI Deep Dive', date: '24 april 2026', location: 'Amsterdam', cta: 'Claim je plek' },
  ],
}

// ── Funnel stage colors ─────────────────────────────────────────────
const stageColors: Record<string, string> = {
  TOFU: '#3B82F6',
  MOFU: '#F59E0B',
  BOFU: '#10B981',
}

// ── App ────────────────────────────────────────────────────────────
function App() {
  const [template, setTemplate] = useState<TemplateType>('patternInterrupt')
  const [format, setFormat] = useState<FormatKey>('1080x1080')
  const [language, setLanguage] = useState<Language>('NL')
  const [activeVariation, setActiveVariation] = useState(0)
  const [exporting, setExporting] = useState(false)
  const [jsonInput, setJsonInput] = useState('')
  const [customData, setCustomData] = useState<AnyData[] | null>(null)
  const adRef = useRef<HTMLDivElement>(null)

  const sampleData = language === 'NL' ? sampleDataNL : sampleDataEN
  const data = customData || sampleData[template]
  const currentData = data[activeVariation] || data[0]
  const info = templateInfo[template]

  const handleLoadJson = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      const variations = parsed.variations || parsed
      setCustomData(Array.isArray(variations) ? variations : [variations])
      setActiveVariation(0)
    } catch {
      alert('Invalid JSON. Check the format and try again.')
    }
  }

  const exportSingle = useCallback(async () => {
    if (!adRef.current) return
    const dataUrl = await toPng(adRef.current, {
      width: formats[format].width,
      height: formats[format].height,
      pixelRatio: 2,
    })
    const link = document.createElement('a')
    link.download = `SUE_${template}_${activeVariation + 1}_${language}_${format}.png`
    link.href = dataUrl
    link.click()
  }, [template, format, activeVariation, language])

  const exportAll = useCallback(async () => {
    if (!adRef.current) return
    setExporting(true)

    const zip = new JSZip()
    const allFormats: FormatKey[] = ['1080x1080', '1080x1350', '1080x1920']
    const container = adRef.current

    for (let fi = 0; fi < allFormats.length; fi++) {
      const fmt = allFormats[fi]
      const { width: w, height: h } = formats[fmt]

      container.style.width = `${w}px`
      container.style.height = `${h}px`
      await new Promise(r => setTimeout(r, 100))

      for (let vi = 0; vi < data.length; vi++) {
        setActiveVariation(vi)
        await new Promise(r => setTimeout(r, 150))

        const dataUrl = await toPng(container, { width: w, height: h, pixelRatio: 2 })
        const imgData = dataUrl.split(',')[1]
        zip.file(`SUE_${template}_${vi + 1}_${language}_${fmt}.png`, imgData, { base64: true })
      }
    }

    const { width, height } = formats[format]
    container.style.width = `${width}px`
    container.style.height = `${height}px`

    const blob = await zip.generateAsync({ type: 'blob' })
    const link = document.createElement('a')
    link.download = `SUE_${template}_${language}_all_variations.zip`
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(link.href)
    setExporting(false)
  }, [template, format, data, language])

  const renderTemplate = () => {
    const props = { format, data: currentData as any }
    switch (template) {
      case 'patternInterrupt':    return <PatternInterruptTemplate {...props} />
      case 'stat':                return <StatTemplate {...props} />
      case 'provocativeQuestion': return <ProvocativeQuestionTemplate {...props} />
      case 'mythBuster':          return <MythBusterTemplate {...props} />
      case 'statement':           return <StatementTemplate {...props} />
      case 'quote':               return <QuoteTemplate {...props} />
      case 'beforeAfter':         return <BeforeAfterTemplate {...props} />
      case 'leadMagnet':          return <LeadMagnetTemplate {...props} />
      case 'directOffer':         return <DirectOfferTemplate {...props} />
      case 'countdown':           return <CountdownTemplate {...props} />
    }
  }

  // Scale for preview
  const { width, height } = formats[format]
  const maxPreviewWidth = 540
  const scale = Math.min(maxPreviewWidth / width, 1)

  // Group templates by funnel stage
  const stages = ['TOFU', 'MOFU', 'BOFU'] as const
  const templatesByStage = stages.map(stage => ({
    stage,
    label: stage === 'TOFU' ? 'Awareness' : stage === 'MOFU' ? 'Consideration' : 'Conversion',
    templates: (Object.entries(templateInfo) as [TemplateType, TemplateInfo][])
      .filter(([, info]) => info.stage === stage),
  }))

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* ── Sidebar ───────────────────────────────────────── */}
      <div style={{ width: 380, padding: 24, background: '#fff', borderRight: '1px solid #e0e0e0', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
          <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 22, margin: 0, color: colors.coral }}>
            SUE Ad Generator
          </h1>
          {/* ── NL / EN Toggle ── */}
          <div style={{
            display: 'flex',
            borderRadius: 6,
            overflow: 'hidden',
            border: `2px solid ${colors.coral}`,
          }}>
            <button
              onClick={() => { setLanguage('NL'); setCustomData(null); setActiveVariation(0) }}
              style={{
                padding: '6px 14px',
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 700,
                background: language === 'NL' ? colors.coral : '#fff',
                color: language === 'NL' ? '#fff' : colors.coral,
                transition: 'all 0.15s',
              }}
            >
              NL
            </button>
            <button
              onClick={() => { setLanguage('EN'); setCustomData(null); setActiveVariation(0) }}
              style={{
                padding: '6px 14px',
                border: 'none',
                borderLeft: `1px solid ${colors.coral}`,
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 700,
                background: language === 'EN' ? colors.coral : '#fff',
                color: language === 'EN' ? '#fff' : colors.coral,
                transition: 'all 0.15s',
              }}
            >
              EN
            </button>
          </div>
        </div>
        <p style={{ fontSize: 12, color: colors.darkGrey, marginBottom: 20 }}>
          Full-funnel ad creative system &middot; <strong>{language === 'NL' ? 'Nederlands' : 'English'}</strong>
        </p>

        {/* ── Template selector (grouped by funnel stage) ── */}
        <label style={labelStyle}>Template</label>
        {templatesByStage.map(({ stage, label, templates }) => (
          <div key={stage} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                backgroundColor: stageColors[stage],
              }} />
              <span style={{
                fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: 1.5, color: stageColors[stage],
              }}>
                {stage} — {label}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginLeft: 16 }}>
              {templates.map(([key, tInfo]) => (
                <button
                  key={key}
                  onClick={() => { setTemplate(key); setActiveVariation(0); setCustomData(null) }}
                  title={tInfo.description}
                  style={{
                    ...chipStyle,
                    fontSize: 12,
                    padding: '6px 12px',
                    background: template === key ? colors.coral : colors.neutralGrey,
                    color: template === key ? '#fff' : colors.black,
                    borderLeft: template === key ? `3px solid ${stageColors[stage]}` : '3px solid transparent',
                  }}
                >
                  {tInfo.label}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* ── Current template info ── */}
        <div style={{
          background: colors.neutralGrey, borderRadius: 6, padding: '10px 14px',
          marginBottom: 20, fontSize: 12, color: colors.darkGrey,
        }}>
          <strong style={{ color: colors.black }}>{info.label}</strong>
          <span style={{
            display: 'inline-block', marginLeft: 8,
            padding: '2px 8px', borderRadius: 10, fontSize: 10, fontWeight: 700,
            backgroundColor: stageColors[info.stage] + '20',
            color: stageColors[info.stage],
          }}>
            {info.stage}
          </span>
          <br />
          <span>{info.description}</span>
        </div>

        {/* ── Format selector ── */}
        <label style={labelStyle}>Format</label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {(Object.keys(formats) as FormatKey[]).map(f => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              style={{
                ...chipStyle,
                background: format === f ? colors.coral : colors.neutralGrey,
                color: format === f ? '#fff' : colors.black,
                fontSize: 12,
              }}
            >
              {formats[f].label}
            </button>
          ))}
        </div>

        {/* ── Variation selector ── */}
        <label style={labelStyle}>Variation ({activeVariation + 1} of {data.length})</label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {data.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveVariation(i)}
              style={{
                ...chipStyle,
                width: 38,
                background: activeVariation === i ? colors.coral : colors.neutralGrey,
                color: activeVariation === i ? '#fff' : colors.black,
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* ── JSON input ── */}
        <label style={labelStyle}>Load Custom Variations (JSON)</label>
        <textarea
          value={jsonInput}
          onChange={e => setJsonInput(e.target.value)}
          placeholder='{"variations": [...]}'
          style={{
            width: '100%',
            height: 80,
            padding: 10,
            border: '1px solid #ddd',
            borderRadius: 4,
            fontFamily: 'monospace',
            fontSize: 11,
            resize: 'vertical',
            marginBottom: 8,
          }}
        />
        <button onClick={handleLoadJson} style={{ ...btnStyle, background: colors.black, marginBottom: 24 }}>
          Load JSON
        </button>

        {/* ── Export buttons ── */}
        <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: 20 }}>
          <button onClick={exportSingle} style={{ ...btnStyle, background: colors.coral, marginBottom: 10 }}>
            Export This Ad (PNG)
          </button>
          <button
            onClick={exportAll}
            disabled={exporting}
            style={{ ...btnStyle, background: exporting ? colors.darkGrey : colors.black }}
          >
            {exporting ? 'Exporting...' : `Export All (${data.length} \u00d7 3 formats = ${data.length * 3} PNGs)`}
          </button>
        </div>
      </div>

      {/* ── Preview area ──────────────────────────────────── */}
      <div style={{ flex: 1, padding: 40, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '#f5f5f5' }}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
          <div ref={adRef} style={{ width, height }}>
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: 1,
  color: '#999',
  marginBottom: 8,
}

const chipStyle: React.CSSProperties = {
  padding: '7px 14px',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
  fontSize: 13,
  fontWeight: 600,
  transition: 'all 0.15s',
}

const btnStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 20px',
  border: 'none',
  borderRadius: 4,
  color: '#fff',
  fontSize: 14,
  fontWeight: 700,
  cursor: 'pointer',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
}

export default App
