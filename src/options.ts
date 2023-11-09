import { IpVersion } from './flag'

export interface TracerouteOptions {
  ipVersion?: IpVersion
  /**
   * The number of queries to send for each hop.
   * Only valid for traceroute
   */
  queries?: number
  /**
   * The maximum number of hops to trace.
   */
  maxHopNumber?: number
  /**
   * The number of seconds to wait for a response.
   */
  waitSecond?: number
  /**
   * The number of milliseconds to pause between hops.
   * Only valid for traceroute
   */
  pauseMs?: number
}

export const DEFAULT_TRACE_OPTIONS: TracerouteOptions = {
  queries: 1,
  maxHopNumber: 30,
  waitSecond: 5,
  pauseMs: 0,
}

export function pushOptionToArray(array: Array<string>, val: string | number | undefined, perfix?: string) {
  if (val == null || val === '') {
    return
  }
  if (perfix) {
    array.push(perfix)
  }
  array.push(String(val))
}
