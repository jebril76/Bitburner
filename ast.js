/** @param {NS} ns **/
export async function main(ns) {
	//let singlvl = ns.getOwnedSourceFiles().find(bitnode => bitnode.n === 4).lvl
	let singlvl = 1
	let nram = Math.pow(2, 7-2*singlvl)
	if (ns.getServerMaxRam('home') > nram ){
		if (!ns.fileExists('BruteSSH.exe')){
			ns.tprint('AutoTor started!')
			ns.run('ator.js')
			while(ns.getRunningScript('ator.js')){
				await ns.asleep(1000)
			}
			ns.tprint('AutoTor Done!')
		}
		ns.run('abuy.js')
	}
	else {
		ns.tprint('Need ' + 2*nram + ' Ram!')
	}
}
