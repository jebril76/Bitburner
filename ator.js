/** @param {NS} ns **/
export async function main(ns) {
  while(!ns.purchaseTor()) {
  }
  ns.tprint('Aquired Tor!')
  await ns.write('tor.txt', '', 'w')
  await ns.asleep(1000)
}
