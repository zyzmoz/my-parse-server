var app = require('express')();
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');

var allowInsecureHTTP = true;

var parseServer = new ParseServer({
    databaseURI: 'mongodb://localhost:27017/data_base',
    appId: 'AppId1',
    restAPIKey: 'restAPIKey',
    fileKey: 'MyFileKey',
    masterKey: 'masterKey',
    serverURL: 'http://localhost:3000/app'
});

var parseDashboardSettings = {
    "apps": [{
        "serverURL": "http://localhost:3000/app",
        "appId": "AppId1",
        "restAPIKey": "restAPIKey",
        "masterKey": "masterKey",
        "appName": "MyApp"
    }],
    "users": [{
        "user": "zyzmoz",
        "pass": "123",
        "masterKey": "masterKey",
        "apps": [{
            "appId": "AppId1"
        }]

    }]
}

var dashboard = new ParseDashboard(parseDashboardSettings, allowInsecureHTTP);

app.use('/app', parseServer,(req, res, next) => {
    return next();
});
app.use('/dashboard', dashboard);

// var httpServer = require('http').createServer(app);
// httpServer.listen(3000);
app.listen(3000, () =>{
    console.log('Server running at localhost:8080');
});