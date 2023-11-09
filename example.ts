import { time, timeEnd, timeLog } from 'console'
import { BuildTraceroute } from './src/index'

const label = 'trace'

try {
  const tracer = BuildTraceroute()
  time(label)
  tracer
    .on('pid', (pid) => {
      timeLog(label, `pid: ${pid}`)
    })
    .on('destination', (destination) => {
      timeLog(label, `destination: ${destination}`)
    })
    .on('hop', (hop) => {
      timeLog(label, `hop:`, hop)
    })
    .on('close', (code) => {
      timeLog(label, `close: code ${code}`)
      timeEnd(label)
    })

  tracer.trace('github.com')
} catch (ex) {
  console.log(ex)
}
