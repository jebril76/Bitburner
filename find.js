/** @param {NS} ns **/
export async function main(ns) {
	let path = ['']
	let deepth = -1
	async function scanServers(host, current) {
		for (let server of ns.scan(current)) {
			deepth++;
			path[deepth] = server
			if (host != server) {
				if (server == ns.args[0]) {
					if (ns.connect(server)) {
						ns.tprint("ok");
					}
					else {
						ns.tprint("no");
					}
					let str = ''
					for (let i = 0; i <= deepth; i++) {
						if (i==9){
							str +="**";
						}
						str += path[i] + " -> ";
					}
					ns.tprint((deepth +1) +": " + str + ": " + server)
					break;
				}
				await scanServers(current, server)
			}
			deepth--;
		}
	}
	await scanServers('', 'home')
}
