var koars = require('koars-utils')();

module.exports = function *(next) {
	//Save full path
	this.basepath = koars.basepath();
	this.originalpath = this.path;

	//Monkeypatch redirect to prefix if absolute.
	var redirect = this.redirect;
	this.redirect = function(path, alt) {
		path = path[0] === '/' ? koars.basepath() + path : path;
		redirect.call(this, path, alt);
	};

	//Throw 404 if basepath not there. Otherwise override `this.path`.
	if(this.path.substring(0, koars.basepath().length+1) !== koars.basepath()+'/') {
		this.status = 404;
		this.body = 'Not Found! Request does not start with "'+koars.basepath()+'/"';
	} else {
		this.path = this.path.substring(koars.basepath().length);
		yield next;
	}
};