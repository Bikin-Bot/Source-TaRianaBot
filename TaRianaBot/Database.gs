// Inget pake library bang azka!
// Sesuaikan ya beberapa kalo gak mau error

var sheet_id = 'SHEET_ID_SPREADSHEET';

///////////Ini getlimit//////////
function getLimit(msg, jumblah){
  if(!jumblah){
    var jumblah = 1
  }
  var angka = Number(limitHarian(msg.from.id))
  var range_name = 'limitDB!A2:B';
  var list_data_save = [
    msg.from.id, 1
  ];
  var list_update_savedata = [
    msg.from.id, angka+jumblah
  ];
  var range_name_update = "limitDB!A";
  var range_name_update0 = "B";
  var save = azkagsheet.db_saveUser(msg.from.id, sheet_id, range_name, list_data_save, list_update_savedata, range_name_update, range_name_update0)
  return save
}
///////////////////////////////////////


function limitHarian(msg){
  var rangeName = 'limitDB!A2:Z';
  var hasil = azkagsheet.db_GetRow(sheet_id, rangeName, 0, msg, 1)
  return hasil
}

function userDB(msg) {
  var rangeName = 'NyobaDB!A2:C';
  var list_data_save = [
    msg.from.id, msg.from.first_name, msg.from.username
  ];
  var list_update_savedata = [
    msg.from.id, msg.from.first_name, msg.from.username
  ];

  var range_name_update = "NyobaDB!A";
  var range_name_update0 = "C";
  var save = azkagsheet.db_saveUser(msg.from.id, sheet_id, rangeName, list_data_save, list_update_savedata, range_name_update, range_name_update0)
  return save
}

function cekUser(msg){
  var rangeName = 'NyobaDB!A2:A1000';
  var hasil = azkagsheet.db_GetRow(sheet_id, rangeName, 0, msg, 0)
  return hasil
}

function cekUsername(msg){
  var rangeName = 'NyobaDB!A2:Z';
  var hasil = azkagsheet.db_GetRow(sheet_id, rangeName, 2, msg, 0)
  return hasil
}

function penggunaBot(){
  var range_name = 'NyobaDB!2:1000000'
  var hasil = azkagsheet.db_GetALL(sheet_id, range_name)
  var jumlah = hasil.length
  return jumlah
}

// Ini isiin pemicunya sehari sekali biar limitnya bisa ke reset
function cleardatabase() {
    var sheet_name = "limitDB";
    var sheet = SpreadsheetApp.openById(sheet_id).getSheetByName(sheet_name);
    sheet.getRange("A2:I").clear();
    sheet.getRange("A2:J").clear();
}
