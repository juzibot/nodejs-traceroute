export enum ipVersion {
  ipv4 = 'ipv4',
  ipv6 = 'ipv6',
}

const IpFlagMap: { [key in ipVersion]: string } = {
  [ipVersion.ipv4]: '-4',
  [ipVersion.ipv6]: '-6',
}

export class Flag {
  static getIpFlag(ipVersion: ipVersion | undefined): string {
    if (!ipVersion) {
      return ''
    }
    const ipFlag = IpFlagMap[ipVersion] || ''
    return ipFlag
  }
}
