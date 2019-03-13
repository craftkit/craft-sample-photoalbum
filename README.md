
# Photo album

Craft-UIKit sample application

![capture](https://user-images.githubusercontent.com/4404088/54261343-e4659780-45ae-11e9-8d64-95d89b9eed7a.gif)

``` 
npm install
npm run serve

go: http(s)://127.0.0.1:10088/
``` 

./src: usual ES6 application, can be build by:

``` 
webpack --config config/webpack.config.min.js
``` 

./lib: can be run as is via `server/web/index.lib.html`.


## Using:

* [craft-uikit](https://github.com/craftkit/craft-uikit)
* [craft-widget-navigationgroup](https://github.com/craftkit/craft-widget-navigationgroup)
* [craft-widget-quicktools](https://github.com/craftkit/craft-widget-quicktools)


## How to use

Run unsecure server.

``` 
npm run serve
``` 

Run with your certificate.

``` 
npm run serve /path/to/cert /path/to/key
``` 

above are all run with ./src

To run with ./lib:

``` 
npm run serve /path/to/cert /path/to/key lib
``` 


## License

MIT

