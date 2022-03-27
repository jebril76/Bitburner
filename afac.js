/** @param {NS} ns **/
export async function main(ns) {
	let need=['CyberSec', 'NiteSec', 'The Black Hand', 'BitRunners']
	let have=ns.getPlayer().factions
	while (need.length>0){
		for (let f of need) {
			if (ns.joinFaction(f) || have.includes(f)) {
				need.splice(need.indexOf(f), 1)
			}
		}
		await ns.asleep(1000)
	}
}
