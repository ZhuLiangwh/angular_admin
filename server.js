var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    cors = require('cors'),
    logger = require('morgan'),
    errorHandler = require('errorhandler');

var app = express(),
    router = express.Router();

//all environments
app.set('port', process.env.PORT || 8003);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(compression());
app.use(cors());
app.use(logger('dev'));
app.use('/', express.static(path.join(__dirname)));

router.use(function (req, res, next) {
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
