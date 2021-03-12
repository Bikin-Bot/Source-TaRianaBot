function cariLagu(cari){
  var url = "https://afara.my.id/api/joox/search?q="+cari;
  var hasil = JSON.parse(UrlFetchApp.fetch(url));
  var result = [];
  if(hasil.songs.length < 5){
   for(var x = 0; x < hasil.songs.length; x++){
    var ini = hasil.songs[x]
    var judul = ini.title;
    var penyanyi = ini.singerName;
    var album = ini.albumName;
    var isi = ini.duration;
    var id = ini.id
    result.push('\n[------------------------]\nJudul Lagu : '+judul+'\nPenyanyi :'+penyanyi+'\nAlbum : '+album+'\nDurasi : '+isi+'\n\nId : <code>'+id+'</code>\n')
  }}else
  if(hasil.songs.length > 4){
  for(var x = 0; x < 5; x++){
    var ini = hasil.songs[x]
    var judul = ini.title;
    var penyanyi = ini.singerName;
    var album = ini.albumName;
    var isi = ini.duration;
    var id = ini.id
    result.push('\n[------------------------]\nJudul Lagu : '+judul+'\nPenyanyi :'+penyanyi+'\nAlbum : '+album+'\nDurasi : '+isi+'\n\nId : <code>'+id+'</code>\n')
  }}
  var inis = result.join('\n')
  return inis
}

function cekAdmin(cari){
  var pesan = []
  var init = {chat_id : cari}
  var all = tg.request('getChatAdministrators',init)
  var parsean = all.result
  for(var x = 0; x < parsean.length; x++){
  var awal = all.result[x]
  var userName = awal.user.username
  var link = '<a href=\"https://t.me/'+userName+'\">'+userName+'</a>'
   pesan.push('├'+link)
  }
  return '👥 Administrator : '+x+'\n'+pesan.join('\n')+'\n└Informasi ini didapat dari API telegram'
}

function brainly(cari){
  var result = [];
  var url = 'https://afara.my.id/api/brainly-scraper?q='+cari;
  try {
    var hasil = JSON.parse(UrlFetchApp.fetch(url));
  } catch(x){
    return false;
  }
  if(hasil.length < 6){
  for(var x = 0; x < hasil.length; x++){
    var tanya = parse_str(hasil[x].content);
    var jawab = parse_str(hasil[x].answers.join('\n\n'));
    result.push('Pertanyaan : '+tanya+'??\n\nJawaban :\n<code>'+jawab+'</code>\n');
  }
}else if(hasil.length > 5){
  for(var x = 0; x < 5; x++){
    var tanya = parse_str(hasil[x].content);
    var jawab = parse_str(hasil[x].answers.join('\n\n'));
    result.push('Pertanyaan : <b>'+tanya+'??</b>\nJawaban :\n<code>'+jawab+'</code>\n');
  }
}
  return result.join('\n');
}

function parse_str(x){
  return x
  .replace(/<\/* *br *\/*>|\$*(\\\\)+\$*/g, '\n')
  .replace(/<[^>]*>|\/*\[\/*tex\]|\{\s*\}/g, '')
  .replace(/(\\:)/g, ':')
  .replace(/\\[^ {]+/g, '')
  .replace(/Pelajari lebih lanjut.+/g, '')
  .replace(/Penjelasan: */gi, '\nPenjelasan:\n')
  .replace(/Jawaban: */gi, '\nJawaban: ')
  .replace(/^(\n)+|^(\s)+/g, '')
  .replace(/(\n)+$|(\s)+$/g, '')
  .replace(/(\s\s)+/g, ' ');
}

//buat dulu function inline query
function kirimInlineQuery(qid, result) {
 tg.request('answerInlineQuery', { inline_query_id: qid, results: JSON.stringify(result) });
}

function scanOCR(photo){
  var nyari = tg.getFile(photo)
  var path = 'https://api.telegram.org/file/bot'+TOKEN_BOT_RAHASIA_POKOKNYA+'/'+nyari.result.file_path
  return azkagsheet.ocr(path)
}

function debugPesan(update){
  var text = update.message.reply_to_message
  var document = tg.util.textBlob(tg.util.outToJSON(text), update.update_id)
  if(text.text){
    var tipe = 'Teks'
  }else if(text.photo){
    var tipe = 'Photo'
  }else if(text.sticker){
    var tipe = 'Sticker'
  }else if(text.video){
    var tipe = 'Video'
  }else if(text.audio){
    var tipe = 'Audio'
  }else if(text.document){
    var tipe = 'Document'
  }else if(text.voice){
    var tipe = 'Voice'
  }else if(text.dice){
    var tipe = 'Dice'
  }else if(text.game){
    var tipe = 'Game'
  }else if(text.poll){
    var tipe = 'Poll'
  }else if(text.video_note){
    var tipe = 'Video Note'
  }else if(text.location){
    var tipe = 'Lokasi'
  }else var tipe = 'Belum DiKetahui'
  var isi =
  `
DebugPesan......
    └Dari <code>${update.message.from.id}</code> (@${update.message.from.username})
Pesan yang direply :
   └Dari <code>${text.from.id}</code> (@${text.from.username})
      └✉️Pesan bertipe ${tipe}
     
<b>🤖Lebih jelasnya ada difile TXT</b>
  `
  var data ={
    'chat_id' : String(update.message.chat.id),
    'document': document,
    'caption': isi,
    'parse_mode': 'HTML',
    'reply_to_message_id': update.message.message_id,
  }
  return tg.requestForm('sendDocument', data)
}

function getPhoto(msg,id){
  var jub = tg.getFile(id)
  var hasil = jub.result.file_path
  var gasil = 'https://api.telegram.org/file/bot'+TOKEN_BOT_RAHASIA_POKOKNYA+'/'+hasil
  var dasil = UrlFetchApp.fetch(gasil).getBlob().setName('TaRianaBot.png')
  var data = {
    'chat_id':String(msg),
    'photo': dasil,
    'caption': 'Sticker -> Image\n@TaRianaBot'
  }
 return tg.requestForm('sendPhoto', data)
}

// Yg ini butuh lib Cheerio soalnya ini saya scraping ::))
// Gak ngerti scraping? ilangin aja yg ini
function caridrakor(query) {
var url = 'https://drakorasia.net/?s='+query+'&post_type=post'
var led = UrlFetchApp.fetch(url)
var konten = led.getContentText()
var $ = Cheerio.load(konten)
var jawaban = ''
$('.ct-tt').each((i, e)=>{
  var nomor = i+1
  var judul = $(e)
  .find('a')
  .attr('title');

  var link = $(e)
  .find('a')
  .attr('href');

  jawaban += "Drakor yang ditemukan\n"+nomor+". "+judul+" ("+link+")\n"
})
if(!jawaban){
  jawaban = "Tidak ditemukan"
}
return jawaban
}
