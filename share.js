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
				await ns.scp(files, 'home', server)
				await scanServers(current, server)
			}
		}
	}
	await scanServers('', 'home')
}
