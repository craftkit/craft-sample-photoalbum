
# Demo app

This application is a traditional stack navigation app, demonstrating Craft-UIkit, NavigationGroup and QuickTools.

![capture](https://user-images.githubusercontent.com/4404088/54261343-e4659780-45ae-11e9-8d64-95d89b9eed7a.gif)


## Quick start

Serve app by [local-web-server](https://www.npmjs.com/package/local-web-server).

``` 
npm i @craftkit/craft-uikit-demoapp
cd craft-uikit-demoapp

ws -v -p 8008 -d docs --spa index.html --spa.asset-test-fs
``` 

Then access to the displayed address from your device.  

It is good to add the app to your Home Screen, if you use mobile device.  


## How to use

You may need local certificate to test posting a comment.  
Use something like [mkcert](https://github.com/FiloSottile/mkcert), and pass it.

``` 
$ node server_local.js /path/to/cert /path/to/key
``` 

## License

* code: MIT
* included photo: see each license description in app


