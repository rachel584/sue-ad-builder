import { createServer } from 'vite'

const server = await createServer({
  root: '/Users/rachelguglietti/Claude/sue-gtm-agents/templates/ad-generator',
  server: { port: 5180, host: true },
})
await server.listen()
server.printUrls()
