/** @param {NS} ns **/
export async function main(ns) {
	let exes = ['brutessh', 'ftpcrack', 'relaysmtp', 'httpworm', 'sqlinject', 'DeepscanV1', 'DeepscanV2', 'Autolink', 'ServerProfiler']
	let i = 0
	ns.tprint('AutoBuy started.')
	while(true) {
		if (!ns.fileExists(exes[0] + '.exe')){
			if (ns.purchaseProgram(exes[0] + '.exe')) {
				ns.tprint('Aquired ' + exes[0] + '!')
			}
		}
		else {
			if (!ns.fileExists(exes[exes.length-1] + '.exe')) {
				i = 0
				while (ns.fileExists(exes[i] + '.exe')){
					i++
				}
				if (ns.purchaseProgram(exes[i] + '.exe')) {
					ns.tprint('Aquired ' + exes[i] + '!')
				}
			}
			else {
				ns.tprint('Autobuy done!')
				break;
			}
		}
		await ns.asleep(1000)
	}
}
