# generator-amemails
This generator provides scaffolding for a maleable Bootstrap 4 email template.  It includes a build task that minifies and purifies the CSS, minifies the JS, and adds it all into the HTML file.  There is also a separate build task for CSS building.

## How to use

Type `yo amemails` and you should be prompted for the necessary settings.  This is just used in-house at the moment so if your setup varies from mine, it may not work, and feel free to let me know and I'll try to take a look.

Use `gulp` or `gulp serve` to run the preview server.  This will build SCSS into CSS and concatenate Javascript and show all your code in a Google Chrome (change the gulpfile.js to change the browser) with LiveReload.

The build tasks are to be used once you are ready to deploy.  They will produce an index.html file in a build folder that is ready to be dropped into the EMS of your choosing; although, you will have to handle the image linking after that.

To build only CSS (most of the time, this is sufficient), use the `gulp build-css` task. This will process the SCSS into CSS, purify the CSS based on index.html and any Javascript files, minify it, and contatenate it into index.html. 

To build everything (CSS and JS), use the `gulp build` task.  This will do the same as `gulp build-css` plus it will concatenate the Javascript files, minify them, and inject them into index.html. 

## To Do

* Properly link images in build folder (or see next issue for potential solution).
* Implement image treatment (packaging and optimization) and output to build folder (makes redundant issue above).
* Implement more frameworks for grid etc.
* Test Javascript capabilities (haven't used it much yet).
* Include oft used settings (such as different container widths and responsive widths for Bootstrap).