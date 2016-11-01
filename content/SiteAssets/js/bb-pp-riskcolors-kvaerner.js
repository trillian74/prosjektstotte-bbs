(function () {
    // This function provides the rendering logic for list view
    var riskFactorFiledTemplate = function (ctx) {

        var riskFactor = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];

        // Return html element with appropriate color based on riskFactor value
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
                return "<span style='color :##ffa5a5'>" + riskFactor + "</span>";
            case 14:
            case 13:
            case 12:
            case 11:
            case 10:
            case 9:
            case 8:
            case 7:
                return "<span style='color :#f9a5ff'>" + riskFactor + "</span>";
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
    riskFactorFiledContext.Templates = {};
    riskFactorFiledContext.Templates.Fields = {
        // Apply the new rendering for riskFactor field on List View
        "GtRiskFactor": {
            "View": riskFactorFiledTemplate
        }
    };

    SPClientTemplates
        .TemplateManager
        .RegisterTemplateOverrides(riskFactorFiledContext);

})();
