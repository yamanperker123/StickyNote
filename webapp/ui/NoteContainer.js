sap.ui.define([
    "sap/ui/core/Control"
], function (Control) {
    "use strict";

    return Control.extend("stickynotes.ui.NoteContainer", {

        metadata: {
            defaultAggregation: "content",
            aggregations: {
                content: {
                    type: "sap.ui.core.Control",
                    multiple: true
                }
            },
            events: {
                press: {}
            }
        },


        renderer: function (oRM, oControl) {
            oRM.openStart("div", oControl);
            oRM.class("noteContainer");
            oRM.openEnd();

            oControl.getContent().forEach(function (oChild) {
                oRM.renderControl(oChild);
            });

            oRM.close("div");
        },

        onclick: function (oEvent) {
            this.firePress({
                originalEvent: oEvent
            });
        }
    });
});
