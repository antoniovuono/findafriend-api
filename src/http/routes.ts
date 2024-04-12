import { app } from '@/app'

app.get('/', () => {
  return { hello: 'world' }
})
