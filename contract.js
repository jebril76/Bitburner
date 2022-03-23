/** @param {NS} ns **/
export async function main(ns) {
	let path = ['']
	let deepth = -1
	async function scanServers(host, current) {
		for (let server of ns.scan(current)) {
			deepth++;
			path[deepth] = server
			if (!ns.getPurchasedServers().includes(server) && host != server) {
				if (ns.ls(server, ".cct") != '') {
					let str = ''
					for (let i = 0; i <= deepth; i++) {
						str += path[i] + " -> ";
					}
					ns.tprint((deepth +1) +": " + str + ": " + ns.ls(server, ".cct"))
				}
				await scanServers(current, server)
			}
			deepth--;
		}
	}
	await scanServers('', 'home')
}
