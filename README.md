
# Photo album

Craft-UIKit sample application

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

## Using:

* [craft-uikit](https://github.com/craftkit/craft-uikit)
* [craft-widget-navigationgroup](https://github.com/craftkit/craft-widget-navigationgroup)
* [craft-widget-quicktools](https://github.com/craftkit/craft-widget-quicktools)


## How to use

You need to pass your local ssl cert and key, like by using [mkcert](https://github.com/FiloSottile/mkcert).

There are two server scripts.

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


