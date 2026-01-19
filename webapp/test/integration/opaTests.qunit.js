/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["stickynotes/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
