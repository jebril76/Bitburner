/** @param {NS} ns **/
export async function main(ns) {
	var servers =[]
	var files = ['grow.script', 'weak.script', 'hack.script']
	await ns.write(files[0], 'grow(args)', 'w')
	await ns.write(files[1], 'weaken(args)', 'w')
	await ns.write(files[2], 'hack(args)', 'w')
	async function scanServers(host, current) {
		for (let server of ns.scan(current)) {
			if (host != server) {
				servers.push(server)
				var tmax = Math.floor((ns.getServerMaxRam(server)-ns.getServerUsedRam(server))/1.7)
				if (tmax > 0 && ns.getServerNumPortsRequired(server)==0) {
					ns.nuke(server)
					ns.exec(files[2], server, tmax,'n00dles')
				}
				await scanServers(current, server)
			}
		}
	}
	while(true) {
		await scanServers('', 'home')
		ns.print(ns.getServerMoneyAvailable('n00dles'))
		await ns.asleep(1000)
	}
}
