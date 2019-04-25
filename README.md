
# Photo album

This is a traditional stack navigation photo album web app demonstrating Craft-UIkit.

You can try online demo, hosted by this repository docs folder.  
Add the following page to your home screen, and try it out!

[https://craftkit.dev/craft-sample-photoalbum/](https://craftkit.dev/craft-sample-photoalbum/)

![capture](https://user-images.githubusercontent.com/4404088/54261343-e4659780-45ae-11e9-8d64-95d89b9eed7a.gif)

``` 
npm install
npm run serve /path/to/cert /path/to/key

go: http(s)://127.0.0.1:10088/
``` 

To rebuild:

``` 
webpack --config config/webpack.config.min.js
``` 

## This demo using:

* [craft-uikit](https://github.com/craftkit/craft-uikit)
* [craft-widget-navigationgroup](https://github.com/craftkit/craft-widget-navigationgroup)
* [craft-widget-quicktools](https://github.com/craftkit/craft-widget-quicktools)


## How to run on your local machine

You need to pass your local ssl cert and key, by using something like [mkcert](https://github.com/FiloSottile/mkcert).

There are two server scripts in this repository.

One is `server_dummy.js` simulating github pages: 

``` 
$ npm run serve /path/to/cert /path/to/key

or 

$ node server_dummy.js /path/to/cert /path/to/key

``` 

One is `server_local.js` you can post a comment.


``` 
$ node server_local.js /path/to/cert /path/to/key
``` 

## License

* code: MIT
* included photo: see each license description in app


