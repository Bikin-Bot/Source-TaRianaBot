// fungsi buat handle hanya menerima pesan berupa POST, kalau GET keluarkan pesan error

function doGet(e) {
  
  return tg.util.outputJSON("TaRi ya ana");
}

// fungsi buat handle pesan POST
function doPost(e) {  
  // data e kita verifikasi
  var update = tg.doPost(e);

  // jika data valid proses pesan
  if (update) {
    prosesPesan(update);
  }

  
}
