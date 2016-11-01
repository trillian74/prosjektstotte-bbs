;(function () {
  var onDataRetrieved = function (response) {
    console.log(response)
    $.each(response.d.results, function (index, item) {
      // volatil hardkode - men forsiden skal hete dette...
      if (item.File.Name === 'Forside.aspx') {
        var container = document.getElementById('GtProjectNumber')
        container.innerHTML = ['<input type="text" disabled id="', 'GtProjectNumber', '" value="', item.GtProjectNumber, '" />'].join('')
      }
    })
  }

  var onError = function (response) {
    console.log('failed :', response)
  }
  var initiateAjaxCall = function (ctx) {
    var restUrl = _spPageContextInfo.webAbsoluteUrl
    $.ajax({
      url: restUrl + "/_api/web/lists/getbytitle('Områdesider')/Items?$select=Id,GtProjectNumber,Title" +
        ',File/Name,File&$expand=File, File/Name',
      type: 'GET',
      headers: {
        'accept': 'application/json;odata=verbose'
      },
      success: onDataRetrieved,
      error: onError
    })
  }

  var projectNumberTemplate = function (ctx) {
    var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(ctx)
    formCtx.registerGetValueCallback(formCtx.fieldName, function () {
      return $('input#GtProjectNumber').val()
    })

    var loadingImg = _spPageContextInfo.webAbsoluteUrl + '/_layouts/images/loadingcirclests16.gif'
    var containerId = 'GtProjectNumber'
    initiateAjaxCall(ctx)
    return ['<div id="', containerId, '"><img src="', loadingImg, '" /></div>'].join('')
  }

  // Create object that have the context information about the field that we want
  // to change it's output render
  var projectNumberCtx = {}
  projectNumberCtx.Templates = {}
  projectNumberCtx.Templates.Fields = {
    // Apply the new rendering for GtProjectNumber field on List View
    'GtProjectNumber': {
      'EditForm': projectNumberTemplate
    }
  }

  SPClientTemplates
    .TemplateManager
    .RegisterTemplateOverrides(projectNumberCtx)
})()
