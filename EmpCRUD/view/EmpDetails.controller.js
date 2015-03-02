sap.ui.controller("CURDNamespace.view.EmpDetails", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf CURDNamespace.view.EmpDetails
*/
	onInit: function() {
        var sServiceUrl = "/sap/opu/odata/sap/zemp_lk_srv";
        var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl,false);
        var oJsonModel = new sap.ui.model.json.JSONModel();
        oModel.read("/employeeSet?", null, null, true , function(oData, response){
                oJsonModel.setData(oData);
            });
        sap.ui.getCore().setModel(oJsonModel);
        
        var template = new sap.m.ColumnListItem({
            id: "first_template",
            type:"Navigation",
            visible: true,
            cells:[
                new sap.m.Label("lblID",{text: "{Empid}"}),
                new sap.m.Label("lblName",{text:"{Empname}"}),
                new sap.m.Label("lblAddress",{text:"{Empadd}"}),
                new sap.m.Label("lblDesignation",{text:"{Empdes}"})
                ]
        });
        
        var oFilter = null;
        var oTable = sap.ui.getCore().getControl("Employees");
        oTable.bindItems("/results",template,null,oFilter);
        var oPage = sap.ui.getCore().getControl("page1");
        oPage.addContent(oTable);
        return oPage;
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf CURDNamespace.view.EmpDetails
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf CURDNamespace.view.EmpDetails
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf CURDNamespace.view.EmpDetails
*/
//	onExit: function() {
//
//	}

    //Item press
    ItemPress: function(evt){
        sap.ui.getCore().byId("Dialog").open();
        sap.ui.getCore().byId("Update").setVisible(true);
        
        var oSelectedItem = evt.getParameter("listItem");
        var sId = oSelectedItem.getBindingContext().getProperty("Empid");
        var sName = oSelectedItem.getBindingContext().getProperty("Empname");
        var sAdd = oSelectedItem.getBindingContext().getProperty("Empadd");
        var sDes = oSelectedItem.getBindingContext().getProperty("Empdes");
        
         sap.ui.getCore().byId("Id").setValue(sId);
         sap.ui.getCore().byId("Name").setValue(sName);
         sap.ui.getCore().byId("Address").setValue(sAdd);
         sap.ui.getCore().byId("Designation").setValue(sDes);
         sap.ui.getCore().byId("Id").setEnabled(false);
           
    },
    //Item update
    Update: function(evt){
        var oEntry = {};
        oEntry.Empid = sap.ui.getCore().byId("Id").getValue();
        oEntry.Empname = sap.ui.getCore().byId("Name").getValue();
        oEntry.Empadd = sap.ui.getCore().byId("Address").getValue();
        oEntry.Empdes = sap.ui.getCore().byId("Designation").getValue();
        
        // OData.request({
        //     requestUri:"/sap/opu/odata/sap/zemp_lk_srv/employeeSet",
        //     method:"GET",
        //     headers:{
        //         "X-Requested-With":"XMLHttpRequest",
        //         "Content-Type":"application/atom+xml",
        //         "DataServiceVersion":"2.0",
        //         "X-CSRF-Token":"Fetch"
        //     }
        // },
        function(data, response){
            header_xcsrf_token = response.headers['x-csrf-token'];
            var oHeaders = {
                "x-csrf-token":header_xcsrf_token,
                'Accept': 'application/json'
            } };
        OData.request({
            requestUrl:"/sap/opu/odata/sap/zemp_lk_srv/employeeSet('"+oEntry.Empid+"')",
            method: "UPDATE",
            headers: oHeaders,
            data:oEntry
            
        },
        function(data,request){
            alert("Update Success");
            location.reload(true);
            
        },
        function(err){
            var request = err.request;
            var response = err.response;
            alert("Error in Get Request "+request+" Response "+response);
        });
        }
        // })
        
    }
});