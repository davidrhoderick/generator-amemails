# generator-amemails
This generator provides scaffolding for a maleable Bootstrap 4 email template.  It includes a build task that minifies and purifies the CSS, minifies the JS, and adds it all into the HTML file.  There is also a separate build task for CSS building.

## How to use

Type `yo amemails` and you should be prompted for the necessary settings.  This is just used in-house at the moment so if your setup varies from mine, it may not work, and feel free to let me know and I'll try to take a look.

## To Do

* Implement image treatment (packaging and optimization).
* Implement more frameworks for grid etc.
* Test Javascript capabilities.
* Include oft used settings (such as different container widths and responsive widths for Bootstrap)