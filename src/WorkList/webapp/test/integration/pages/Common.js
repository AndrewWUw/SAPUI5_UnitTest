sap.ui.define([
    'sap/ui/test/Opa5'
  ],
  function(Opa5) {
    "use strict";

    function getFrameUrl(sHash, sUrlParameters) {
      sHash = sHash || "";
      var sUrl = jQuery.sap.getResourcePath("sap/ui/demo/bulletinboard/app", ".html");

      if (sUrlParameters) {
        sUrlParameters = "?" + sUrlParameters;
      }

      return sUrl + sUrlParameters + "#" + sHash;
    }

    return Opa5.extend("sap.ui.demo.bulletinboard.test.integration.pages.Common", {

      constructor: function(oConfig) {
        Opa5.apply(this, arguments);

        this._oConfig = oConfig;
      },

      iStartMyApp: function(oOptions) {
        var sUrlParameters;
        oOptions = oOptions || {
          delay: 0
        };

        sUrlParameters = "serverDelay=" + oOptions.delay;

        var sFrameUrl = getFrameUrl(oOptions.hash, sUrlParameters)
        this.iStartMyAppInAFrame(sFrameUrl);
      },

      iLookAtTheScreen: function() {
        return this;
      }

    });
  });
