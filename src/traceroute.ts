import { Flag } from './flag'
import { TracerouteOptions, pushOptionToArray } from './options'
import { Hop, Process } from './process'

export class Traceroute extends Process {
  constructor(opts: TracerouteOptions) {
    const args = ['-n']
    pushOptionToArray(args, opts.queries, '-q')
    pushOptionToArray(args, opts.maxHopNumber, '-m')
    pushOptionToArray(args, opts.waitSecond, '-w')
    pushOptionToArray(args, opts.pauseMs, '-z')
    pushOptionToArray(args, Flag.getIpFlag(opts.ipVersion))
    super('traceroute', args)
  }

  public parseDestination(data: string): string | null {
    const regex = /^traceroute\sto\s(?:[a-zA-Z0-9:.]+)\s\(([a-zA-Z0-9:.]+)\)/
    const parsedData = new RegExp(regex, '').exec(data)

    let result: string | null = null
    if (parsedData !== null) {
      result = parsedData[1]
    }

    return result
  }

  public parseHop(hopData: string): Hop | null {
    const regex = /^\s*(\d+)\s+(?:([a-zA-Z0-9:.]+)\s+([0-9.]+\s+ms)|(\*))/
    const parsedData = new RegExp(regex, '').exec(hopData)

    let result: Hop | null = null
    if (parsedData !== null) {
      if (parsedData[4] === undefined) {
        result = {
          hop: parseInt(parsedData[1], 10),
          ip: parsedData[2],
          rtt1: parsedData[3],
        }
      } else {
        result = {
          hop: parseInt(parsedData[1], 10),
          ip: parsedData[4],
          rtt1: parsedData[4],
        }
      }
    }

    return result
  }
}
