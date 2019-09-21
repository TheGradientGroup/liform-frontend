import XLSX from 'xlsx'

var wbk = null
var curFile = null

var drgProcessor = {}


drgProcessor.isAmbiguous = function(wbk) {
    var sheetNames = wbk.SheetNames

    return (sheetNames.length > 1)
}

drgProcessor.getSheetNames = function(wbk) {
    return wbk.SheetNames
}

drgProcessor.extract = function(wbk, sheet) {
    var sheetNames = wbk.SheetNames

    // if (sheetNames.length > 1 && sheet === null) {
    //     console.log('ambiguous')
    //     return null
    // }

    var csvContent = XLSX.utils.sheet_to_csv(wbk.Sheets[sheetNames[0]])
    csvContent = csvContent.trim()
    return csvContent
}

export default drgProcessor