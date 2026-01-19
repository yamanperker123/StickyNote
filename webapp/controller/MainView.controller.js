sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "stickynotes/ui/Note",
    "sap/m/MessageToast"
], (Controller, Note, MessageToast) => {
    "use strict";

    return Controller.extend("stickynotes.controller.MainView", {
        onInit() {
        },

        onAddButtonPress: function (oEvent) {
            const oNote = new Note({
                editMode: false,
                deletable: true,
                
            });

            oNote.attachPress(this.onNotePress, this);
            oNote.attachDelete(this.onNoteDelete, this);

            this.byId("noteContainer").addContent(oNote);

            MessageToast.show("Note created", {duration: 500});
        },


        onNotePress: function (oEvent) {
            const oNote = oEvent.getSource();
            oNote.setEditMode(true);
            
        },

        onNoteContainerPress: function () {
            const oContainer = this.byId("noteContainer");

            oContainer.getAggregation("content").forEach(function (oNote) {
                oNote.setEditMode(false);
            });
        },

        onNoteDelete: function (oEvent) {
            const oNote = oEvent.getParameter("note");
            const oContainer = this.byId("noteContainer");

            oContainer.removeContent(oNote);
            oNote.destroy();

        },


    });
});