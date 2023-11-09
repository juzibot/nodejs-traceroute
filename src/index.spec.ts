import os from 'os'
import validator from 'validator'

import { BuildTraceroute } from './index'
import { Traceroute } from './traceroute'
import { Tracert } from './tracert'

describe('BuildTraceroute', () => {
  test('Should create Tracert object when os.platform() is win32', () => {
    jest.spyOn(os, 'platform').mockReturnValue('win32')

    const traceroute = BuildTraceroute()

    expect(traceroute).toBeInstanceOf(Tracert)
  })

  test('Should create Traceroute object when os.platform() is not win32', () => {
    jest.spyOn(os, 'platform').mockReturnValue('linux')

    const traceroute = BuildTraceroute()

    expect(traceroute).toBeInstanceOf(Traceroute)
  })

  it('should verify pid, destination, hops and close code', (wait) => {
    const tracer = BuildTraceroute()

    tracer
      .on('pid', (pid) => {
        expect(Number.isInteger(pid)).toBeTruthy()
      })
      .on('destination', (destination) => {
        expect(validator.isIP(destination)).toBeTruthy()
      })
      .on('hop', (hopObj) => {
        const { hop, ip, rtt1 } = hopObj

        expect(Number.isInteger(hop)).toBeTruthy()
        expect(validator.isIP(ip) || ip === '*').toBeTruthy()
        expect(/^\d+\.\d+\sms$/.test(rtt1) || rtt1 === '*').toBeTruthy()
      })
      .on('close', (code) => {
        expect(Number.isInteger(code)).toBeTruthy()

        wait()
      })

    tracer.trace('127.0.0.1')
  }, 60000)

  it('should trigger hop event 10 times and complete within 10 seconds', (done) => {
    const tracer = BuildTraceroute({
      queries: 1,
      maxHopNumber: 10,
      waitSecond: 1,
      pauseMs: 0,
    })

    let hopCount = 0
    let startTime: number | undefined

    tracer
      .on('pid', () => {
        startTime = Date.now()
      })
      .on('hop', () => {
        hopCount++
      })
      .on('close', () => {
        const endTime = Date.now()
        const elapsedTime = endTime - (startTime || 0)
        expect(hopCount).toBe(10)
        expect(elapsedTime).toBeLessThanOrEqual(10000)
        done()
      })

    tracer.trace('github.com')
  })
})


