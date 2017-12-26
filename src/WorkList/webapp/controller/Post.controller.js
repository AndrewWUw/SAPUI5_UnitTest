sap.ui.define([
  'worklist/controller/BaseController',
  'sap/ui/model/json/JSONModel',
  'worklist/model/formatter'
], function(BaseController, JSONModel, formatter) {
  "use strict";
  return BaseController.extend("worklist.controller.Post", {
    formatter: formatter,
    /* =========================================================== */
    /* lifecycle methods                                           */
    /* =========================================================== */
    /**
     * Called when the worklist controller is instantiated.
     * @public
     */
    onInit: function() {
      // Model used to manipulate control states. The chosen values make sure,
      // detail page is busy indication immediately so there is no break in
      // between the busy indication for loading the view's meta data
      var oViewModel = new JSONModel({
        busy: false
      });
      this.setModel(oViewModel, "postView");
      this.getRouter().getRoute("post").attachPatternMatched(this._onPostMatched, this);
    },
    /* =========================================================== */
    /* event handlers                                              */
    /* =========================================================== */
    /**
     * Navigates back to the worklist
     * @function
     */
    onNavBack: function() {
      this.myNavBack("worklist");
    },
    /* =========================================================== */
    /* internal methods                                            */
    /* =========================================================== */
    /**
     * Binds the view to the post path.
     *
     * @function
     * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
     * @private
     */
    _onPostMatched: function(oEvent) {
      var oViewModel = this.getModel("postView"),
        oDataModel = this.getModel();
      this.getView().bindElement({
        path: "/Posts('" + oEvent.getParameter("arguments").postId + "')",
        events: {
          dataRequested: function() {
            oDataModel.metadataLoaded().then(function() {
              // Busy indicator on view should only be set if metadata is loaded,
              // otherwise there may be two busy indications next to each other on the
              // screen. This happens because route matched handler already calls '_bindView'
              // while metadata is loaded.
              oViewModel.setProperty("/busy", true);
            });
          },
          dataReceived: function() {
            oViewModel.setProperty("/busy", false);
          }
        }
      });
    }
  });
});
