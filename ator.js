/** @param {NS} ns **/
export async function main(ns) {
  if (ns.purchaseTor()) {
    ns.tprint('Aquired Tor!')
  }
}
