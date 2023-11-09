# nodejs-traceroute [![Build Status](https://travis-ci.org/zulhilmizainuddin/nodejs-traceroute.svg?branch=master)](https://travis-ci.org/zulhilmizainuddin/nodejs-traceroute) [![Code Climate](https://codeclimate.com/github/zulhilmizainuddin/nodejs-traceroute/badges/gpa.svg)](https://codeclimate.com/github/zulhilmizainuddin/nodejs-traceroute)

[![NPM](https://nodei.co/npm/nodejs-traceroute.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nodejs-traceroute/)

Node.js wrapper around tracert and traceroute process

## Install

    npm install --save nodejs-traceroute

## Force IPv4 or IPv6
By default, the domain name given will be automatically resolved. Explicitly force IPv4 or IPv6 tracerouting by passing either `ipv4` or `ipv6` to the constructor.


## Usage Example

```javascript
import { BuildTraceroute } from 'nodejs-traceroute'

try {
    const tracer = BuildTraceroute()
    tracer
        .on('pid', (pid) => {
            console.log(`pid: ${pid}`);
        })
        .on('destination', (destination) => {
            console.log(`destination: ${destination}`);
        })
        .on('hop', (hop) => {
            console.log(`hop: ${JSON.stringify(hop)}`);
        })
        .on('close', (code) => {
            console.log(`close: code ${code}`);
        });

    tracer.trace('github.com');
} catch (ex) {
    console.log(ex);
}
```

## Result Example

```sh
    pid: 4414
    destination: 192.30.253.112
    hop: {"hop":1,"ip":"192.168.0.1","rtt1":"1.817 ms"}
    hop: {"hop":2,"ip":"10.233.33.58","rtt1":"3.149 ms"}
    hop: {"hop":3,"ip":"10.55.96.182","rtt1":"7.820 ms"}
    hop: {"hop":4,"ip":"128.241.1.205","rtt1":"178.187 ms"}
    hop: {"hop":5,"ip":"129.250.2.9","rtt1":"211.609 ms"}
    hop: {"hop":6,"ip":"129.250.3.43","rtt1":"229.458 ms"}
    hop: {"hop":7,"ip":"129.250.2.163","rtt1":"237.948 ms"}
    hop: {"hop":8,"ip":"129.250.2.138","rtt1":"237.913 ms"}
    hop: {"hop":9,"ip":"129.250.2.133","rtt1":"241.748 ms"}
    hop: {"hop":10,"ip":"*","rtt1":"*"}
    hop: {"hop":11,"ip":"*","rtt1":"*"}
    hop: {"hop":12,"ip":"*","rtt1":"*"}
    hop: {"hop":13,"ip":"*","rtt1":"*"}
    hop: {"hop":14,"ip":"*","rtt1":"*"}
    hop: {"hop":15,"ip":"*","rtt1":"*"}
    hop: {"hop":16,"ip":"*","rtt1":"*"}
    hop: {"hop":17,"ip":"*","rtt1":"*"}
    hop: {"hop":18,"ip":"*","rtt1":"*"}
    hop: {"hop":19,"ip":"*","rtt1":"*"}
    hop: {"hop":20,"ip":"*","rtt1":"*"}
    hop: {"hop":21,"ip":"*","rtt1":"*"}
    hop: {"hop":22,"ip":"*","rtt1":"*"}
    hop: {"hop":23,"ip":"*","rtt1":"*"}
    hop: {"hop":24,"ip":"*","rtt1":"*"}
    hop: {"hop":25,"ip":"*","rtt1":"*"}
    hop: {"hop":26,"ip":"*","rtt1":"*"}
    hop: {"hop":27,"ip":"*","rtt1":"*"}
    hop: {"hop":28,"ip":"*","rtt1":"*"}
    hop: {"hop":29,"ip":"*","rtt1":"*"}
    hop: {"hop":30,"ip":"*","rtt1":"*"}
    close: code 0
```

## Parameters

The `BuildTraceroute` function is used to create a traceroute object based on the provided options.

- `opts` (optional): An object that contains the following properties:
  - `ipVersion` (optional): The IP version to use for the traceroute.
  - `queries` (optional): The number of queries to send per hop. Default is `1`.
  - `maxHopNumber` (optional): The maximum number of hops to trace. Default is `10`.
  - `waitSecond` (optional): The number of seconds to wait between each hop. Default is `1`.
  - `pauseMs` (optional): The number of milliseconds to pause between each hop. Default is `0`.

### Example

```ts
import { BuildTraceroute } from 'traceroute-lib'

const tracer = BuildTraceroute({
  ipVersion: IpVersion.IPV4,
  queries: 1,
  maxHopNumber: 10,
  waitSecond: 1,
  pauseMs: 0,
})

tracer.on('hop', () => {
    // Will only trigger up to 10 times
})

tracer.trace('github.com')
```

## parseRttStr

The `parseRttStr` function is a utility function that parses a string representation of round-trip time (RTT) and returns the numeric value of the RTT in milliseconds. It can help convert rtt data in hop events. It takes a single parameter `rttStr`, which is a string representation of the RTT.

### Example Usage

```typescript
import { parseRttStr } from './utils'

const rtt = parseRttStr('6.35 ms')
console.log(rtt) // Output: 6.35
```