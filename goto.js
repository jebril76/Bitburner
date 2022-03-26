/** @param {NS} ns **/
export async function main(ns) {
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
					if (server == ns.args[0]) {
						ns.tprint('Welcome to ' + ns.args[0])
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
