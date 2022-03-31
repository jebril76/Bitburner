/** @param {NS} ns**/
export async function main(ns) {
	ns.disableLog('ALL')
	var vserverspeed=5 //lower= lower money reserver.
	var namelength = 18
 	var files = ['grow.js', 'weak.js', 'hack.js']
	await ns.write(files[0], '/** @param {NS} ns **/ export async function main(ns) {await ns.grow(ns.args[0])}', 'w')
	await ns.write(files[1], '/** @param {NS} ns **/ export async function main(ns) {await ns.weaken(ns.args[0])}', 'w')
	await ns.write(files[2], '/** @param {NS} ns **/ export async function main(ns) {await ns.hack(ns.args[0])}', 'w')
	var exclude = [''] 
	var servers
	var hosts
	var targets
	var exes = 0
	var tarIndex 
	var loop
	var hType
	var tmp
	var act
	var serverManager = false
	var vservers
	var vtmp
	if (false) { brutessh(); ftpcrack(); relaysmtp(); httpworm(); sqlinject() }

	const checkM = (c, d) => eval(c < ns.getPlayer().money / d)
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
		if (t == 'UR') { 
			return ns.getServerUsedRam(s) 
		}
		if (t == 'NPR') { 
			return ns.getServerNumPortsRequired(s) 
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

	async function scanExes() { 
		for (let hack of ['brutessh', 'ftpcrack', 'relaysmtp', 'sqlinject', 'httpworm']) {
			if (ns.fileExists(hack + '.exe')) {
				exes.push(hack) 
			} 
		} 
	}

	function log() {
		ns.clearLog()
		tmp = targets.slice(0, 12)
		for (let t of tmp) {
			ns.print(`${act[t[1]]} ${str(t[1])}` + `${ns.nFormat(info('MA', t[1]) / info('MM', t[1]), '0%')} / ${ns.nFormat(info('SL', t[1]) / info('MSL', t[1]), '0%')} `.padStart(31 - str(t[1]).length))
		}
		tmp = ''
		if (serverManager) {
			if (ns.getPurchasedServers().length == 25) {
				tmp += ' SER: ' + vservers[0] + "/" + Math.log2(vservers[1])
			}
			else {
				tmp += ' SER: ' + ns.getPurchasedServers().length
			}
		}
		ns.print(`EXE: ${exes.length} HOS: ${hosts.length} TAR: ${targets.length}` + tmp)
	}

	async function scanServers(host, current) {
		for (let server of ns.scan(current)) {
			if ((ns.getPurchasedServers().includes(server) || info('NPR', server) <= exes.length) && host != server) {
				if (!ns.getPurchasedServers().includes(server)) { 
					for (let hack of exes) { 
						ns[hack](server) 
					}
					ns.nuke(server) 
				}
				if (info('MM', server) != 0 && info('RHL', server) <= ns.getHackingLevel() && info('MSL', server) < 100) {
					targets.push([Math.floor(info('MM', server) / info('MSL', server)), server])
					targets = arraySort(targets)
				}
				if (info('MR', server) > 4 && !exclude.includes(server)) { 
					hosts.push([info('MR', server), server])
					hosts = arraySort(hosts) 
				}
				servers.push(server)
				await ns.scp(files, 'home', server)
				await scanServers(current, server)
			}
		}
	}

	async function hackAll() {
		for (let host of hosts) {
			if (tarIndex > targets.length - 1) { 
				tarIndex = 0
				loop = true 
			}
			let target = targets[tarIndex][1]
			function fRam() { 
				return info('MR', host[1]) - info('UR', host[1]) 
			}
			if (info('MA', target) < info('MM', target) * .80) { 
				hType = 0 
			}
			else if (info('SL', target) > info('MSL', target) + 5 || loop) {
				hType = 1
				if (fRam() / info('MR', host[1]) > .13 && fRam() > 4) {
					tmp = Math.floor(fRam() / 1.75)
					if (tmp > 0) { 
						ns.exec(files[1], host[1], tmp, target) 
					}
				}
			} 
			else {
				hType = 2
				for (let h of hosts) { 
					if (ns.isRunning(files[2], h[1], target) && h[1] != host[1]) { 
						hType = 0
						break
					} 
				}
				if (hType == 2 && !ns.scriptRunning(files[2], host[1])) {
					if (fRam() < 2) { 
						ns.killall(host[1]) 
					}
					tmp = [1, Math.floor(fRam() / 1.7)]
					while (ns.hackAnalyze(target) * tmp[0] < .7 && tmp[0] < tmp[1]) {
						tmp[0]++ 
					}
					ns.exec(files[2], host[1], tmp[0], target)
				}
			}
			if ((hType == 0 || hType == 2) && fRam() > 3.9) {
				tmp = [Math.ceil(info('MR', host[1]) / 1.75 * .14), Math.floor(info('MR', host[1]) / 1.75 * .79)]
				if (tmp[1] > 0 && fRam() / info('MR', host[1]) >= .80) { 
					ns.exec(files[0], host[1], tmp[1], target) 
				}
				if (tmp[0] > 0 && fRam() / info('MR', host[1]) >= .15) { 
					ns.exec(files[1], host[1], tmp[0], target) 
				}
			}
			if (!loop) { 
				if (hType == 0) { 
					act[target] = 'G' 
				} 
				if (hType == 1) { 
					act[target] = 'W' 
				}
				if (hType == 2) {
					act[target] = 'H'
				}
			}
			tarIndex++
		}
	}
	async function pServerManager() {
		vservers = [0, 0]
		let ram = 0
		let ramList = [8]
		for (let num of ramList) {
			if (num <= 1048576 && checkM(ns.getPurchasedServerCost(num), vserverspeed)) { 
				ramList.push(num * 2)
				ram = num
			} 
			else { 
				break 
			}
		}
		vservers[1] = ramList[ramList.length - 1]
		function buyServer(r) { 
			ns.purchaseServer('SERVER-' + ns.nFormat(r * 1000000000, '0.0b'), r) 
		}
		if (ns.getPurchasedServers().length < 25 && ram > 0) { 
			buyServer(ram) 
		}
		for (let i = ns.getPurchasedServers().length - 1; i >= 0; i--) {
			tmp = ns.getPurchasedServers()[i]
			vtmp = tmp.split("-")
			if (vtmp[1] == ns.nFormat(vservers[1] * 1000000000, '0.0b')) {
				vservers[0]++
			}
			if (info('MR', tmp) < ram && checkM(ns.getPurchasedServerCost(ram), vserverspeed) && !exclude.includes(tmp)) {
				ns.killall(tmp)
				ns.deleteServer(tmp)
				buyServer(ram)
			}
		}
	}
	ns.tail()
	while (true) {
		servers = []
		targets = []
		hosts = [[Math.max(info('MR', 'home') - 50, 0), 'home']]
		exes = []
		tarIndex = 0
		loop = false
		act = {}
		await scanExes()
		await scanServers('', 'home')
		await hackAll()
		if (serverManager) { await pServerManager() }
		log()
		if (exes.length == 5) {
			serverManager = true
		}
		else {
			serverManager = false
		}
		await ns.asleep(1000)
	}
}
