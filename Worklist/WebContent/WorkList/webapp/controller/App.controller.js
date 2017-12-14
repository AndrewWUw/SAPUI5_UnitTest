sap.ui.define([
  'worklist/controller/BaseController',
  'sap/ui/model/json/JSONModel'
], function(BaseController, JSONModel) {
  "use strict";

  return BaseController.extend("worklist.controller.App", {

    onInit: function() {
      var oViewModel = new JSONModel({
        busy: true,
        delay: 0
      });

      this.setModel(oViewModel, "appView");

      this.getOwnerComponent().getModel().metadataLoaded().then(function() {
        oViewModel.setProperty("/busy", false);
      });
    }
  });

});
