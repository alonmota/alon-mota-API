const pick = (props) => (o) => props.reduce((a, e) => {
	if (o[e]) return { ...a, [e]: o[e] };
	return a;
}, {});
module.exports = pick;
