(function () {
    var getColor = function (riskFactor) {
       
        var riskColor = "";
        switch (parseInt(riskFactor)) {
            case 25:
            case 24:
            case 23:
            case 22:
            case 21:
            case 20:
            case 19:
            case 18:
            case 17:
            case 16:
            case 15:
                riskColor = "#ff4500";
                break;
            case 14:
            case 13:
            case 12:
            case 11:
            case 10:
            case 9:
            case 8:
            case 7:
                riskColor = "#ffff00";
                break;
            case 6:
            case 5:
            case 4:
            case 3:
            case 2:
            case 1:
            case 0:
                riskColor = "#caff70";
                break;
            default:
                riskColor = "#caff70";
                break;
        }
        return riskColor;
    };
    var postRenderHandler = function (ctx) {
        var rows = ctx.ListData.Row;

        for (var i = 0; i < rows.length; i++) {
            var riskFactor = rows[i]["GtRiskFactor"];
            var status = rows[i]["GtIsRiskOpen"];
            var rowId = GenerateIIDForListItem(ctx, rows[i]);
            var row = document.getElementById(rowId);
            if(status==="LUKKET"){
                row.style.backgroundColor = "rgb(202, 225, 255)";
            }else{
                row.style.backgroundColor = getColor(riskFactor);
            }
           
        }
    };
    // This function provides the rendering logic for list view
    var riskFactorFiledTemplate = function (ctx) {

        var riskFactor = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
        var formCtx = SPClientTemplates
            .Utility
            .GetFormContextForCurrentField(ctx);
        // //Register GetValueCallback function for current field for when save is
        // clicked. formCtx.registerGetValueCallback(formCtx.fieldName, function () {
        //  return document         .getElementById(formCtx.fieldSchema.Id)
        // .value; }); //Register InitCallBack function for current field for when it
        // changes. formCtx.registerInitCallback(formCtx.fieldName, function () {
        // console.log("init function ran for " + formCtx.fieldName); }); Return html
        // element with appropriate color based on riskFactor value
        switch (riskFactor) {
            case 25:
            case 24:
            case 23:
            case 22:
            case 21:
            case 20:
            case 19:
            case 18:
            case 17:
            case 16:
            case 15:
                return "<span style='color :#ff0000'>" + riskFactor + "</span>";
            case 14:
            case 13:
            case 12:
            case 11:
            case 10:
            case 9:
            case 8:
            case 7:
                return "<span style='color :#f2ff00'>" + riskFactor + "</span>";
            case 6:
            case 5:
            case 4:
            case 3:
            case 2:
            case 1:
            case 0:
                return "<span style='color :#cab023'>" + riskFactor + "</span>";
            default:
                return "<span style='color :#cab023'>" + riskFactor + "</span>";
        }
    };

    // Create object that have the context information about the field that we want
    // to change it's output render
    var riskFactorFiledContext = {};
    // riskFactorFiledContext.Templates = {};
    // riskFactorFiledContext.Templates.Fields = {     // Apply the new rendering
    // for riskFactor field on List View     "GtRiskFactor": {         "View":
    // riskFactorFiledTemplate     } };
    riskFactorFiledContext.OnPostRender = postRenderHandler;

    SPClientTemplates
        .TemplateManager
        .RegisterTemplateOverrides(riskFactorFiledContext);

})();
