export const create = xs => xs
	.map((x, i) => [ i, trigrams(x)])
	.reduce((xs, x) => {
		for (const t of x[1]) {
			if (xs[t] === undefined) xs[t] = []
			xs[t].push(x[0])
		}
		return xs
	}, {})

export const search = (xs, q) => {
	const ts = trigrams(q)
	const len = ts.length
	return change(x => x/len,
		count
		(flatten
		(map(get_from(xs),
		(filter(inside(xs), ts))))))
}

const trigrams = (x) => {
	if (x.length <= 3) return [x]
	const ts = []
	for (let i = 0; i < x.length - 2; i++)
		ts.push(x[i] + x[i+1] + x[i+2])
	return ts
}

const count = (xs) => {
	const c = {}
	for (const x of xs) {
		if (c[x] === undefined) c[x] = 1
		else c[x]++
	}
	return c
}

function* filter(f, xs) { for (const x of xs) if (f(x)) yield x }

function* map(f, xs) { for (const x of xs) yield f(x) }

const inside = xs => x => xs.hasOwnProperty(x)

function* flatten(xs, n=1) {
	if (n === 0) yield* xs
	else for (const x of xs) yield* flatten(x, n-1)
}

const change = (f, o) => {
	for (const k of Object.keys(o)) o[k] = f(o[k])
	return o
}

const get_from = xs => x => xs[x]
