# ASINC WordPress Webpack Compiler
This package handles compilation of TypeScript and SASS files in a WordPress context.  It can be used for custom themes and plugins.

## WordPress Setup
You will need to update your plugin or theme to point to the script.

After running `npm run build` this package will create two primary entry points (along with related assets):
 * `./build/app.js`
 * `./build/app.css`

These need to be enqueued appropriately in production (abbreviated for example purposes).

```php 
add_action( 'wp_enqueue_scripts', function() {
  wp_enqueue_script( 'production-script', '/wp-content/themes/your-theme/build/app.js' );

  wp_enqueue_style( 'production-style', '/wp-content/themes/your-theme/build/app.css' );
});
```

For development, running `npm start` will run webpack with live reloading and drop a `.webpack-process.json` file in the root of your plugin/theme.
 
You will need to check for the presence of this file and parse it to construct the URL to the JS file on the Webpack Development server.  When this is running you should *not* include the build files.  You only need to enqueue the main app.js file (abbreviated for example purposes):

```php
add_action( 'wp_enqueue_scripts', function() {
  wp_register_script( 'webpack-script', "http://$hostname:$port/wp-content/themes/your-theme/build/app.js", null, null, true );
});
```

# Known issues

- With SCSS's intruction of `@use` and the assumption that this package is being used on many legacy SCSS projects, we have locked the version to `1.77.6"`

- sort-css-media-queries dependency is locked to 2.4.0 as the maintainers decided to change how exports work. Don't try to use other versions for now or you will get a:

````
Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: No "exports" main defined in /Users/stoufa/projects/wp-webpack/node_modules/sort-css-media-queries/package.json
```

# Building 
 
1. Ensure you have a valid NPM token that has access to deploy to `@asinc/wp-webpack`.  Email dw@largeinc.com if not.
2. Commit your work and tag it to a new version: `git tag v1.x.x`.  You can run `git tag` to review current versions.
3. Push your tag to ensure others can tack versions: `git push origin v1.x.x`
4. Publish to NPM: `npm publish`