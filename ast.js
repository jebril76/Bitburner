/** @param {NS} ns **/
export async function main(ns) {
	//let singlvl = ns.getOwnedSourceFiles().find(bitnode => bitnode.n === 4).lvl
	let singlvl = 1
	let nram = Math.pow(2, 7-2*singlvl)
	if (ns.getServerMaxRam('home') > nram ){
		ns.scriptKill('jeb.js', 'home')
		ns.run('ator.js')
		ns.run('abuy.js')
		ns.run('jeb.js')
	}
	else {
		ns.tprint('Need ' + 2*nram + ' Ram!')
	}
}
