module.exports = function() {
	return function tracker(req, res, next) {
	  if (req.url.indexOf('/api') > -1) {
			console.log('Request tracing middleware triggered on %s', req.url);
			var incoming_headers = [ 'x-request-id',
							'x-b3-traceid',
							'x-b3-spanid',
							'x-b3-parentspanid',
							'x-b3-sampled',
							'x-b3-flags',
							'x-ot-span-context'
							];
			var value;
			for (var i=0; i < incoming_headers.length; i++) {
				value = req.headers[incoming_headers[i]];
				if (value) res.setHeader(incoming_headers[i], value);
			}
		}
	  next();
	};
  };