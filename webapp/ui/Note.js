sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/ColorPalette",
    "sap/m/Input",
    "sap/m/TextArea"
], function (Control, ColorPalette, Input, TextArea) {
    "use strict";

    return Control.extend("stickynotes.ui.Note", {
        metadata: {
            properties: {
                editMode: { type: "boolean", defaultValue: false },
                color: { type: "string", defaultValue: "#fff68b" },
                deletable: { type: "boolean", defaultValue: true },

                width: {
                    type: "sap.ui.core.CSSSize",
                    defaultValue: "150px"
                },
                height: {
                    type: "sap.ui.core.CSSSize",
                    defaultValue: "250px"
                },


            },
            aggregation: {
                content: {


                }

            },
            events: {
                press: {},
                delete: {}
            }

        },

        // renderer
        renderer: function (oRM, oControl) {
            const sWidth = oControl.getWidth();
            const sHeight = oControl.getHeight();

            // Main note
            oRM.openStart("div", oControl);
            oRM.class("stickyNote");
            oRM.style("background-color", oControl.getColor());
            oRM.style("width", sWidth);
            oRM.style("height", sHeight);
            oRM.openEnd();


            // Color Palette
            oRM.openStart("div");
            oRM.class("noteColorBar");
            oRM.openEnd();
            oRM.renderControl(oControl.oPalette);
            oRM.close("div");

            // Title
            oRM.openStart("div");
            oRM.class("noteTitle");
            oRM.openEnd();
            oRM.renderControl(oControl.oTitle);
            oRM.close("div");

            // Body
            oRM.openStart("div");
            oRM.class("noteBody");
            oRM.openEnd();
            oControl.oText.setHeight("100%");
            oRM.renderControl(oControl.oText);
            oRM.close("div");

            oRM.openStart("div");
            oRM.class("noteDeleteIcon");
            oRM.openEnd();
            oRM.renderControl(oControl.oDeleteButton);
            oRM.close("div");
            oRM.close("div");
        },


        init: function () {

            this.oPalette = new ColorPalette({
                colors: [
                    "#fff68b",
                    "#FFD3A8",
                    "#ce81ff",
                    "#A8DAFF",
                    "#cdfc93"
                ],
                colorSelect: this.onColorSelect.bind(this)
            });

            this.oTitle = new Input({
                placeholder: "Title",
                editable: true,
                valueState: "Error",
                valueStateText: " Input required",
                liveChange: this.onTitleChange.bind(this)

            });

            this.oText = new TextArea({
                placeholder: "Notes...",
                editable: true,
                valueState: "Information",
                valueStateText: " Min 50 character",
                liveChange: this.onTextChange.bind(this)

            });

            //icon rengi

            this.oDeleteButton = new sap.m.Button({
                icon: "sap-icon://delete",
                type: "Reject",
                press: this.onDeletePress.bind(this)
            });

        },


        onColorSelect: function (oEvent) {
            const sColor = oEvent.getParameter("value");
            this.setColor(sColor);
        },
        ontap: function (oEvent) {
            // oEvent.preventDefault();
            this.firePress();
        },

        onBeforeRendering: function () {
            const bEdit = this.getEditMode();

            this.oTitle.setEditable(bEdit);
            this.oText.setEditable(bEdit);
        },

        onDeletePress: function () {

            this.fireEvent("delete", {
                note: this
            });
        },

        onTitleChange: function (oEvent) {
            const sTitle = oEvent.getParameter("value");

            if (!sTitle || sTitle.trim() === "") {
                this.oTitle.setValueState("Error");
                this.oTitle.setValueStateText("Input required");
                this.oTitle.openValueStateMessage();

            } else {
                this.oTitle.setValueState("None");
                this.oTitle.setValueStateText("");
                this.oTitle.closeValueStateMessage();

            }
        },

        onTextChange: function (oEvent) {
            const sText = oEvent.getParameter("value") || "";
            const iLength = sText.trim().length;

            if (iLength < 50) {
                this.oText.setValueState("Information");
                this.oText.setValueStateText(`Min 50 character (${iLength}/50)`);
                this.oText.openValueStateMessage();
            } else {
                this.oText.setValueState("None");
                this.oText.setValueStateText("");
                this.oText.closeValueStateMessage();
            }
        }



    });
});
