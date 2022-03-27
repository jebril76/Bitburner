/** @param {NS} ns**/
export async function main(ns) {
	ns.disableLog('ALL')
	var targets
	var namelength = 18
	const arraySort = (arr) => arr.sort((a, b) => b[0] - a[0])
	function str(s) { 
		if (s.length > namelength) { 
			return s.substring(0, namelength) + '...' 
		} else { 
			return s 
		} 
	}
	function info(t, s) {
		if (t == 'MM') { 
			return ns.getServerMaxMoney(s) 
		}
		if (t == 'MA') { 
			return ns.getServerMoneyAvailable(s) 
		}
		if (t == 'MR') { 
			return ns.getServerMaxRam(s) 
		}
		if (t == 'RHL') { 
			return ns.getServerRequiredHackingLevel(s) 
		}
		if (t == 'SL') { 
			return ns.getServerSecurityLevel(s) 
		}
		if (t == 'MSL') { 
			return ns.getServerMinSecurityLevel(s) 
		}
	}
	function log() {
		ns.clearLog()
		for (let t of targets) {
			ns.print(`${str(t[1])}` + `${ns.nFormat(info('MA', t[1])/info('MM', t[1]), '0%')} / ${ns.nFormat(info('SL', t[1]) / info('MSL', t[1]), '0%')} `.padStart(31 - str(t[1]).length))
		}
	}
	async function scanServers(host, current) {
		for (let server of ns.scan(current)) {
			if (host != server) {
				if (info('MM', server) != 0 && info('RHL', server) <= ns.getHackingLevel() && info('MSL', server) < 100) {
					targets.push([Math.floor(info('MM', server) / info('MSL', server)), server])
					targets = arraySort(targets)
				}
				await scanServers(current, server)
			}
		}
	}

	ns.tail()
	while (true) {
		targets = []
		await scanServers('', 'home')
		log()
		await ns.asleep(1000)
	}
}
