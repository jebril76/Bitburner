/** @param {NS} ns **/
export async function main(ns) {
//	let singlvl = ns.getOwnedSourceFiles().find(bitnode => bitnode.n === 4).lvl
	let singlvl = 3
	let exes = ['brutessh', 'ftpcrack', 'relaysmtp', 'httpworm', 'sqlinject', 'DeepscanV1', 'DeepscanV2', 'Autolink', 'ServerProfiler']
	let nram = Math.pow(2, 7-2*singlvl)
	ns.run('share.js')
	ns.run('jeb.js')
	if (ns.getServerMaxRam('home') > nram ){
		let i = 0
		while (ns.fileExists(exes[i] + '.exe')){
			i++
		}
		if (i<exes.length-1){
			ns.run('test.js')
			ns.tprint('AutoTor started!')
			ns.run('ator.js')
			while(ns.getRunningScript('ator.js')){
				await ns.asleep(1000)
			}
			ns.tprint('AutoTor Done!')
		}
		if (!ns.fileExists('ServerProfiler.exe')){
			ns.run('abuy.js')
			while(ns.getRunningScript('abuy.js')){
				await ns.asleep(1000)
			}
			ns.run('cyber.js')
			ns.run('afac.js')		
		}
	}
	else {
		ns.tprint('Need ' + 2*nram + ' Ram!')
	}
}
