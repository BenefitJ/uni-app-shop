function isEmpty(val) {
	if (val !== '' && val !== undefined && val !== 'undefined' && val !== null && val !== 'null') {
		return val
	}else {
		return ''
	}
}

export default {
	isEmpty
}
