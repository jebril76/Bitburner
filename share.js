/** @param {NS} ns **/
export async function main(ns) {
	var servers =[]
	var files = ['grow.js', 'weak.js', 'hack.js']
    	await ns.write(files[0], '/** @param {NS} ns **/ export async function main(ns) {await ns.grow(ns.args[0])}', 'w')
    	await ns.write(files[1], '/** @param {NS} ns **/ export async function main(ns) {await ns.weaken(ns.args[0])}', 'w')
   	await ns.write(files[2], '/** @param {NS} ns **/ export async function main(ns) {await ns.hack(ns.args[0])}', 'w')
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
