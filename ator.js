/** @param {NS} ns **/
export async function main(ns) {
  while(!ns.purchaseTor()) {
    await ns.asleep(1000)
  }
  ns.tprint('Aquired Tor!')
}
