cordova.define("com.intel.xdk.stub.intelxdkstub", function(require, exports, module) {(function () {

    var isCordovaPlugin = typeof require === 'function' && typeof exports === 'object'; // function parms of cordova

    function notSupported(prop) {
        // FIXME: hardcoding the version here is wrong (HTML-2145)
        alert('Intel XDK API is not supported by this version of the Crosswalk container (v1.29.4.7) or App Analyzer (v0.10)');
    }

    // device is special because it has one function that is empty
    var deviceApiStub = {
        _cordovaDeviceReady: false,
        addRemoteScript: function () { notSupported('device.addRemoteScript'); },
        addVirtualPage: function () { notSupported('device.addVirtualPage'); },
        blockRemotePages: function () { notSupported('device.blockRemotePages'); },
        closeRemoteSite: function () { notSupported('device.closeRemoteSite'); },
        getRemoteData: function () { notSupported('device.getRemoteData'); },
        getRemoteDataExt: function () { notSupported('device.getRemoteDataExt'); },
        getRemoteDataWithID: function () { notSupported('device.getRemoteDataWithID'); },
        hideSplashScreen: function () { },
        hideStatusBar: function () { notSupported('device.hideStatusBar'); },
        launchExternal: function () { notSupported('device.launchExternal'); },
        mainViewExecute: function () { notSupported('device.mainViewExecute'); },
        managePower: function () { notSupported('device.managePower'); },
        removeVirtualPage: function () { notSupported('device.remoteVirtualPage'); },
        runInstallNativeApp: function () { notSupported('device.runInstallNativeApp'); },
        scanBarcode: function () { notSupported('device.scanBarcode'); },
        sendEmail: function () { notSupported('device.sendEmail'); },
        sendSMS: function () { notSupported('device.sendSMS'); },
        setAutoRotate: function () { notSupported('device.sendAutoRotate'); },
        setBasicAuthentication: function () { notSupported('device.setBasicAuthentication'); },
        setRotateOrientation: function () { notSupported('device.setRotateOrientation'); },
        showRemoteSite: function () { notSupported('device.showRemoteSite'); },
        showRemoteSiteExt: function () { notSupported('device.showRemoteSiteExt'); },
        updateConnection: function () { notSupported('device.updateConnection'); },
        get connection() { notSupported('device.connection'); },
        get hasCaching() { notSupported('device.hasCaching'); },
        get hasStreaming() { notSupported('device.hasStreaming'); },
        get initialOrientation() { notSupported('device.initialOrientation'); },
        get lastStation() { notSupported('device.lastStation'); },
        get model() { notSupported('device.model'); },
        get orientation() { notSupported('device.orientation'); },
        get osversion() { notSupported('device.osversion'); },
        get phonegapversion() { notSupported('device.phonegapversion'); },
        get platform() { notSupported('device.platform'); },
        get queryString() { notSupported('device.queryString'); },
        get uuid() { notSupported('device.uuid'); }
    };

    var intelXdkApiStub = {
        // top level properties
        get app() { notSupported('app'); },
        get isamazon() { notSupported('isamazon'); },
        get ischrome() { notSupported('ischrome'); },
        get isfacebook() { notSupported('isfacebook'); },
        get isgoogle() { notSupported('isgoogle'); },
        get isintel() { notSupported('isintel'); },
        get ismozilla() { notSupported('ismozilla'); },
        get isnative() { notSupported('isnative'); },
        get isnook() { notSupported('isnook'); },
        get isphone() { notSupported('isphone'); },
        get istablet() { notSupported('istablet'); },
        get istest() { notSupported('istest'); },
        get isweb() { notSupported('isweb'); },
        get iswin8() { notSupported('iswin8'); },
        get iswp8() { notSupported('iswp8'); },
        get isxdk() { notSupported('isxdk'); },
        get jsVersion() { notSupported('jsVersion'); },
        get oauthAvailable() { notSupported('oauthAvailable'); },
        get webRoot() { notSupported('webRoot'); },

        // objects
        get accelerometer() { notSupported('accelerometer'); },
        get cache() { notSupported('cache'); },
        get camera() { notSupported('camera'); },
        get canvas() { notSupported('canvas'); },
        get contacts() { notSupported('contacts'); },
        get device() { return deviceApiStub; },
        get display() { notSupported('display'); },
        get facebook() { notSupported('facebook'); },
        get file() { notSupported('file'); },
        get geolocation() { notSupported('geolocation'); },
        get multitouch() { notSupported('multitouch'); },
        get notification() { notSupported('notification'); },
        get oauth() { notSupported('oauth'); },
        get player() { notSupported('player'); },
        get playingtrack() { notSupported('playingtrack'); }
    };

    if (isCordovaPlugin) {
        var cordova = require('cordova'),
            channel = require('cordova/channel'),
            exec = require('cordova/exec');

        deviceApiStub._cordovaDeviceReady = true;

        channel.onCordovaReady.subscribe(function () {
            cordova.fireDocumentEvent('intel.xdk.device.ready');
            cordova.fireDocumentEvent('appMobi.device.ready');
        });

        module.exports = intelXdkApiStub;
    } else {  // sourced as intelxdk.js
        if (!window.intel) {
            window.intel = { xdk: intelXdkApiStub };

            var xdkDeviceReadyEvent = new Event('intel.xdk.device.ready');

            window.addEventListener('load', function () {
                if (window.intel.xdk.device._cordovaDeviceReady) return;
                document.dispatchEvent(xdkDeviceReadyEvent);
            });
        }

        if (!window.AppMobi) {
            window.AppMobi = intelXdkApiStub;

            var appMobiDeviceReadyEvent = new Event('appMobi.device.ready');

            window.addEventListener('load', function () {
                if (window.intel.xdk.device._cordovaDeviceReady) return;
                document.dispatchEvent(appMobiDeviceReadyEvent);
            });
        }
    }

})();
});
