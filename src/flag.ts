export enum IpVersion {
  IPV4 = 'ipv4',
  IPV6 = 'ipv6',
}

const IpFlagMap: { [key in IpVersion]: string } = {
  [IpVersion.IPV4]: '-4',
  [IpVersion.IPV6]: '-6',
}

export class Flag {
  static getIpFlag(ipVersion: IpVersion | undefined): string {
    if (!ipVersion) {
      return ''
    }
    const ipFlag = IpFlagMap[ipVersion] || ''
    return ipFlag
  }
}
