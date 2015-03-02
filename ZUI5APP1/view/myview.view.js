sap.ui.jsview("ZUI5Namespace.view.myview", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf ZUI5Namespace.view.myview
	*/ 
	getControllerName : function() {
		return "ZUI5Namespace.view.myview";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf ZUI5Namespace.view.myview
	*/ 
	createContent : function(oController) {
		       
			    var aControls = [];
			 //   var label = new sap.ui.commons.Label("l1");
		  //     label.setText("My First UI App");
		        
				var oButton = new sap.ui.commons.Button({
				    id: this.createId("MyButton"),
				    text: "Hello JS View"
                     
				});
			//aControls.push(label);
			aControls.push(oButton.attachPress(oController.doIt));
			
			var oImg = new sap.ui.commons.Image();
			oImg.setSrc("https://avatars.githubusercontent.com/u/2531208?v=3");
			aControls.push(oImg.attachPress(oController.doIt));
			
			
			return aControls;
		}
});
