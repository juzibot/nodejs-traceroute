import os from 'os'

import { DEFAULT_TRACE_OPTIONS, TracerouteOptions } from './options'
import { Traceroute } from './traceroute'
import { Tracert } from './tracert'

export type { Hop } from './process'
export { parseRttStr } from './utils'

export function BuildTraceroute(opts: TracerouteOptions = DEFAULT_TRACE_OPTIONS): Traceroute {
  if (os.platform() === 'win32') {
    return new Tracert(opts)
  } else {
    return new Traceroute(opts)
  }
}

export { DEFAULT_TRACE_OPTIONS }
export type { TracerouteOptions }

