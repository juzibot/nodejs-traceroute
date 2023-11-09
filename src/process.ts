import events from 'events'
import readline from 'readline'
import validator from 'validator'

import { spawn } from 'child_process'

export interface Hop {
  hop: number
  ip: string
  rtt1: string
  rtt2?: string
  rtt3?: string
}

export abstract class Process extends events.EventEmitter {
  constructor(private command: string, private args: string[]) {
    super()
  }

  public trace(domainName: string): void {
    if (!this.isValidDomainName(domainName)) {
      throw 'Invalid domain name or IP address'
    }

    this.args.push(domainName)
    this.args = this.args.filter((s) => !!s)

    const process = spawn(this.command, this.args)
    process.on('close', (code) => {
      this.emit('close', code)
    })

    this.emit('pid', process.pid)

    let isDestinationCaptured = false
    if (process.pid) {
      readline
        .createInterface({
          input: process.stdout,
          terminal: false,
        })
        .on('line', (line) => {
          if (!isDestinationCaptured) {
            const destination = this.parseDestination(line)
            if (destination !== null) {
              this.emit('destination', destination)

              isDestinationCaptured = true
            }
          }

          const hop = this.parseHop(line)
          if (hop !== null) {
            this.emit('hop', hop)
          }
        })
    }
  }

  private isValidDomainName(domainName: string): boolean {
    return validator.isFQDN(domainName + '') || validator.isIP(domainName + '')
  }

  on(event: 'pid', listener: (pid: number) => void): this
  on(event: 'destination', listener: (destination: string) => void): this
  on(event: 'hop', listener: (hop: Hop) => void): this
  on(event: 'close', listener: (code: number) => void): this
  on(event: string, listener: (...args: any[]) => void): this {
    return super.on(event, listener)
  }

  once(event: 'pid', listener: (pid: number) => void): this
  once(event: 'destination', listener: (destination: string) => void): this
  once(event: 'hop', listener: (hop: Hop) => void): this
  once(event: 'close', listener: (code: number) => void): this
  once(event: string, listener: (...args: any[]) => void): this {
    return super.on(event, listener)
  }

  abstract parseDestination(data: string): string | null
  abstract parseHop(hopData: string): Hop | null
}
