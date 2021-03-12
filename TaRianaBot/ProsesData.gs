// fungsi utama untuk memproses segala pesan yang masuk
// Note : Pastikan mengerti ya :V ini open source jadi yg ada cuman source bot gak ada editan
function prosesPesan(update) {
if (update.message) { 
    
    // penyederhanaan variable
    var msg = update.message;
    var herat = tg.request('getChatMember', {chat_id : msg.chat.id, user_id : msg.from.id});
    var siapaSeh = herat.result.status;
    var daftaran = cekUser(msg.from.id)
    var limit = limitHarian(msg.from.id)
    if(!limit){
      var limit = '0'
    }
    if(uVIP(msg.from.id)){
      var limit = 'Unlimited'
    }

  
   if(/^\/daftar((?:@TaRianaBot)?)$/i.exec(msg.text)){
      var pesan = 'Terima Kasih telah mendaftar';
      if(daftaran !== false){
        return userDB(msg)
    }else
      if(daftaran == false){
        tg.sendMsg(msg, pesan)
        userDB(msg)
        }
      }

    
    if(/^\/req((?:@TaRianaBot)?)$/i.exec(msg.text)){
     if(limit > 29){
      return false
    }
      var waktu = saatIni()
      var pesan =
`
======<b>LIMIT HARIAN</b>======
[I]${waktu}
[I]User Id : ${msg.from.id}
[I]Name : ${msg.from.first_name}
[I]Limit : ${limit}/30
`
     getLimit(msg)
     tg.sendMsg(msg, pesan, 'HTML')
   }
  
      // jika ada pesan berupa text
  if (msg.text) {
       if(limit > 30){
         return false
       }
    
      // jika user klik start, bot akan menjawab
    var pola = /^\/help((?:@TaRianaBot)?)$/i
       if ( pola.exec(msg.text) ){
        if(daftaran == false){
          return tg.sendMsg(msg, 'Silakan daftar dengan mengirim pesan /daftar ke bot (Ini hanya untuk keperluan menghitung pengguna bot)')
   }
     
      var pesan = helpcommad();
      getLimit(msg)
      return tg.sendMessage(msg.chat.id, pesan, 'HTML');
      }

      var pola = /^\/drakor (.*)/i 
      if(cocok = pola.exec(msg.text)){
        var nyari = cocok[1]
        var jawaban = caridrakor(nyari)
        return bot.sendMsg(msg, jawaban, "HTML", true)
      }
    
    if(/^\/about((?:@TaRianaBot)?)$/i.exec(msg.text)){
      var pesan = pesanInfoBot()
      var keyboard =[
        [tg.button.url('Info lebih banyak📢', 'https://t.me/TaRianaUpdate')]
      ]
      getLimit(msg)
      return bot.sendMsgKeyboardInline(msg, pesan, keyboard, "HTML")
    }

    var pola = /^\/ocr((?:@TaRianaBot)?)$/i
    if ( pola.exec(msg.text) ){
      if(daftaran == false){
    return tg.sendMsg(msg, 'Silakan daftar dengan mengirim pesan /daftar ke bot (Ini hanya untuk keperluan menghitung pengguna bot)')
   }
    if(!msg.reply_to_message.photo){
      getLimit(msg)
      return tg.sendMsg(msg, 'Harus mereply foto!')
    }
    try{
    getLimit(msg)
    var msgr = msg.reply_to_message
    var text = scanOCR(msgr.photo[msgr.phote - 1].file_id)
    return tg.sendMessage(msg.chat.id, text, 'HTML');
    }catch(err){
      tg.sendMsg(msg, err)
    }
        
        
      }
      


    var pola = /^\/start((?:@TaRianaBot)?)$/i
     if ( pola.exec(msg.text) ){
      if(daftaran == false){
    return tg.sendMsg(msg, 'Silakan daftar dengan mengirim pesan /daftar ke bot (Ini hanya untuk keperluan menghitung pengguna bot)')
   }
    getLimit(msg)
    return startmessage(msg)
        }

      var pola = /^([\/!]wiki((?:@TaRianaBot)?))/i;
if ( cocok = pola.exec ( msg.text ) ) {
  if(daftaran == false){
    return tg.sendMsg(msg, 'Silakan daftar dengan mengirim pesan /daftar ke bot (Ini hanya untuk keperluan menghitung pengguna bot)')
   }
  var nyari = msg.text.replace(cocok[1],'');
  var respon = UrlFetchApp.fetch("https://id.wikipedia.org/w/api.php?action=query&list=search&srsearch="+nyari+"&format=json");
  var hasil = JSON.parse(respon);
  var wiki = hasil.query.search;
  var jumblah = hasil.query.searchinfo.totalhits;
  var isiPesan = ["Ditemukan "+jumblah+" hasil dari pencarian "+nyari+"\n"]
  for(var ix = 0; ix < wiki.length; ix++) {
isiPesan.push("Judul ditemukan : "+"<b>"+wiki[ix].title+"</b>");
isiPesan.push("<code>"+wiki[ix].snippet.replace(/<span class="searchmatch">/g,'').replace(/<\/span>/g,''),''+"</code>");
}
getLimit(msg)
tg.kirimPesan(msg.chat.id, isiPesan.join("\n")+"\nSumber : Wikipedia lah :)", "HTML");
}

if(/^\/pengguna((?:@TaRianaBot)?)$/i.exec(msg.text)){
  var aktif = penggunaBot()
  var pesan = "Pengguna @TaRianaBot saat ini adalah "+aktif
  tg.sendMsg(msg, pesan)
}

/* FUNGSI INI DIKARANTINA

var pola = /^([\/!]carilagu)/i;
if ( cocok = pola.exec ( msg.text ) ) {
  if(daftaran == false){
    return tg.sendMsg(msg, 'Silakan daftar dengan mengirim pesan /daftar ke bot (Ini hanya untuk keperluan menghitung pengguna bot)')
   }
  var nyari = msg.text.replace(cocok[1],'');
  var keypad = [
    [tg.button.inline('Fungsi ID lagu', 'fungsiIdLagu')]
  ];
  var ini = cariLagu(nyari)
  getLimit(msg)
  tg.sendMessageKeyboardInline(msg.chat.id, "Beberapa Hasil Yang Ditemukan Dari Pencarianmu\n"+ini+"\nSumber : JOOX", keypad)
  
  
}*/

var pola = /^[!\/]admin (.*)$/i;
if (cocok = pola.exec(msg.text)){
  if(daftaran == false){
    return tg.sendMsg(msg, 'Silakan daftar dengan mengirim pesan /daftar ke bot (Ini hanya untuk keperluan menghitung pengguna bot)')
   }
   getLimit(msg)
  try{
  var nyari = cocok[1]
  var gini = cekAdmin(nyari)
  tg.sendMsg(msg, gini, 'HTML', true, msg.message_id)
  }catch(err){
    tg.sendMsg(msg, 'Tidak ditemukan')
  }
}
if(msg.reply_to_message.sticker){
if(/^\/toimg((?:@TaRianaBot)?)$/i.exec(msg.text)){
  var file = msg.reply_to_message.sticker.file_id
  getLimit(msg, 2)
  return getPhoto(msg.chat.id, file)
  }
}



      // kalau mau kembangin sendiri menjadi bot interaktif, code nya taruh di bawah ini
      // -- mulai custom text --

      // akhir deteksi pesan text
    }
if(msg.reply_to_message){
  if(/^\/debug((?:@TaRianaBot)?)$/i.exec(msg.text)){
    if(!msg.reply_to_message){
        return false
      }
    getLimit(msg)
    return debugPesan(update)
      }
    }

    // jika butuh welcome, bisa copas dari script sebelumnya
    // deteksi event taruh di sini juga
    
    // akhir update message
  }
  if (update.inline_query) {
    var iq = update.inline_query;
    var text = iq.query;
    var query_id = iq.id
    var laguCid = 0;
    var daftaran = cekUser(iq.from.id)
    if(daftaran == false){
      var kId = 0;
      var hasil = [{
    'type': 'article',
    'id': kId.toString(),
    'title': 'Tidak bisa menggunakan BOT!!!!!!!!!',
    'input_message_content': {
      'message_text':'Silakan daftar dengan mengirim pesan /daftar ke bot (Ini hanya untuk keperluan menghitung pengguna bot)',
      'parse_mode': 'html'
    },
    'description': 'Error Kamu Belum daftar',
  }];
  return kirimInlineQuery(query_id ,hasil);
}kId++


   var pola = /(carilagu)/i;
if ( cocok = pola.exec(text) ){
          var nyari = text.replace(cocok[1], " ");
          var url = 'https://mnazria.herokuapp.com/api/jooxnich?search='+nyari
var respon = UrlFetchApp.fetch(url)
var json = JSON.parse(respon)
var sudar = json.result.mp3Url
  var hasil = [{
    'type': 'audio',
    'id': laguCid.toString(),
    'audio_url': sudar,
    'title': json.result.msong,
    'performer': json.result.msinger,
    'caption': '@TaRianaBot',
       'thumb_url':'https://cdn2-joox.isanook.com/static/di/icons/icon-192x192.png',
  }];
  return kirimInlineQuery(query_id ,hasil);
}laguCid++

var pola = /(brainly)/i;
if ( cocok = pola.exec(text) ){
          var nyari = text.replace(cocok[1], " ");
          var jawaban = brainly(nyari)
          var idBrainly = 0;
  var hasil = [{
    'type': 'article',
    'id': idBrainly.toString(),
    'title': 'Pertanyaan',
    'input_message_content': {
      'message_text':jawaban,
      'parse_mode': 'HTML'
    },
    'description' : nyari,
       'thumb_url':'https://media-exp1.licdn.com/dms/image/C4E0BAQHikz3Y7XA2iw/company-logo_200_200/0/1597053642460?e=2159024400&v=beta&t=6lspz-mhAUhHYtJrhs7aH4oVtNNLbyM5hVckdhNxTmE',
  }];
  return kirimInlineQuery(query_id ,hasil);
  }idBrainly++
}


//Akhir script
}
