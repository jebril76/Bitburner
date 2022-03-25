/** @param {NS} ns **/
export async function main(ns) {
  if(ns.connect('darkweb')){
    await ns.write('tor.txt', '', 'w')
    ns.connect('home')
  }
  else {
    ns.rm('tor.txt')
  }
}
