koars-basepath
==============
This module provides koa middleware to prefix your applications routes with a fixed string. This is useful if you want to run your application behind a reverse proxy.

The basepath is taken by the `BASEPATH` environment variable.

ctx.path
--------
By replacing `ctx.path` with your unprefixed path, this should work with all other middleware without a hitch. In addition we provide `ctx.originalpath` with the full path, as well as `ctx.basepath` with the base path.

ctx.redirect()
--------------
This middleware monkeypatches the `ctx.redirect()` method, prefixing any absolute paths with your basepath.

	//Set our basepath programmatically
	process.env.BASEPATH = '/prefixed';

	//This now redirects to `/prefixed/path`
	app.use(function *() {
		this.redirect('/path');
	});