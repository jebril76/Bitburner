/** @param {NS} ns **/
//WIP
export async function main(ns) {
	let bado = ['CSEC','avmnite-02h','I.I.I.I','run4theh111z', 'The-Cave']
	for (let target of bado) {
		let path = ['home']
		let deepth = 0
		let done=false
		ns.connect('home')
		async function scanServers(host, current) {
			for (let server of ns.scan(current)) {
				if (!done){
					deepth++;
					path[deepth] = server
					ns.connect(server)
					if (host != server) {
						if (server == target) {
							ns.tprint('Backdoor to ' + target)
							await ns.installBackdoor()
							done=true
						}
						else {
							await scanServers(current, server)
						}
					}
					if (!done){
						deepth--;
						ns.connect(path[deepth])
					}
				}
			}
		}
		await scanServers('', 'home')
	}
	ns.connect('home')
}
