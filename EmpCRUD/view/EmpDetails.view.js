sap.ui.jsview("CURDNamespace.view.EmpDetails", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf CURDNamespace.view.EmpDetails
	*/ 
	getControllerName : function() {
		return "CURDNamespace.view.EmpDetails";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf CURDNamespace.view.EmpDetails
	*/ 
	createContent : function(oController) {
		var oPage = new sap.m.Page(
		    "page1",
			{title: "Employee Details"
		});
		

		
		var oTable = new sap.m.Table({
		    id: "Employees",
		    itemPress: [ oController.ItemPress, oController ],
		    columns:[
		        new sap.m.Column({
		            width: "1em",
		            header: new sap.m.Label({
		                text:"Employee ID"
		            })
		        }),
		        new sap.m.Column({
		            width:"1em",
		            header: new sap.m.Label({
		                text:"Employee Name"
		            })
		        }),
		        new sap.m.Column({
		            width:"1em",
		            header: new sap.m.Label({
		                text:"Address"
		            })
		        }),
		        new sap.m.Column({
		            width:"1em",
		            header: new sap.m.Label({
		                text:"Designation"
		            })
		        })
		        ]
		});
		oPage.addContent(oTable);
		
		var oBtnUpd = new sap.m.Button("Update",{
		    text:"Update",
		    press:[oController.Update,oController]
		});
		
		var oDialog = new sap.m.Dialog("Dialog", {
		    title:"Add/Modify Employee",
		    modal:true,
		    contentWidth:"1em",
		    content:[
		        new sap.m.Label({text:"Employee ID"}),
		        new sap.m.Input({
		            maxLength: 20,
		            id: "Id"
		        }),
		        new sap.m.Label({text:"Employee Name"}),
		        new sap.m.Input({maxLength:20, id: "Name"}),
		        new sap.m.Label({text:"Address"}),
		        new sap.m.Input({maxLength:20,id:"Address"}),
		        new sap.m.Label({text:"Designation"}),
		        new sap.m.Input({maxLength:20, id:"Designation"}),oBtnUpd
		        ]
		});
		
		return oPage;
	}

});
