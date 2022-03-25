/** @param {NS} ns **/
export async function main(ns) {
	let exes = ['brutessh', 'ftpcrack', 'relaysmtp', 'httpworm', 'sqlinject', 'DeepscanV1', 'DeepscanV2', 'Autolink', 'ServerProfiler']
	ns.tprint('AutoBuy started.')
	while(true) {
		if (ns.purchaseTor()) {
			ns.tprint('Aquired Tor!')
		}
		if (!ns.fileExists(exes[0] + '.exe')){
			if (ns.purchaseProgram(exes[0] + '.exe')) {
				ns.tprint('Aquired ' + exes[0] + '!')
			}
		}
		for (let i = 0; i < exes.length-2; i++) {
			if (ns.fileExists(exes[i] + '.exe') && !ns.fileExists(exes[i+1] + '.exe')) {
				if (ns.purchaseProgram(exes[i+1] + '.exe')) {
					ns.tprint('Aquired ' + exes[i+1] + '!')
				}
			}
		}
		if (ns.fileExists(exes[exes.length-1] + '.exe')) {
			ns.tprint('Autobuy stopped!')
			break;
		}
		await ns.asleep(1000)
	}
}
