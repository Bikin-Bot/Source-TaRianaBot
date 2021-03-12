var userVIP = [ 855538973, 1349919799];
 var tempatKhusus = [-1001310420564, -1001107644732]
 
 // User tertentu
function uVIP(id) {
        if (userVIP.indexOf(id) > -1) {
            return true;
        } else {
            return false;
        }        
    }
    
// Grup/Tempat Khusus
function tKhusus(id) {
        if (tempatKhusus.indexOf(id) > -1) {
            return true;
        } else {
            return false;
        }        
    }

//Pesan bantaun
function helpcommad() {
  var pesan = 
`
[1.01] HELP COMMAND
┣⊱ /about = Sedikit informasi bot
┣⊱ <code>/wiki (Hal Yang Ingin Dicari)</code>
┣⊱ <code>/admin (username/id grup)</code>
┣⊱ (Reply Pesan)<code>/debug = debug pesan</code>
┣⊱ (Reply Sticker)<code>/toimg</code>
┣⊱ (Reply photo)<code>/ocr</code>
┣⊱ /req = Untuk melihat limit kita
`;
return pesan
}


//Pesan start
function startmessage(msg){
var pesan =`
<b>Halo ${msg.from.first_name}</b>

Saya adalah bot yang dapat membantu banyak hal tapi tidak semua...
Untuk melihat hal yang bisa saya bantu silakan kirim /help ke saya

<i>©️Copyright @TaRianaBot</i>
`
var keypad = [
[tg.button.url('Update Bot⤴️', 'https://t.me/TaRianaUpdate'), 
tg.button.url('Feedback💠', 'https://t.me/TaRianaBicara')],
[tg.button.url('💬Bicara dengan dev', 'https://t.me/GASTestingGroup')]
]
tg.sendMsgKeyboardInline(msg, pesan, keypad, 'HTML')
}

//Pesan info
function pesanInfoBot(){
var pesan = "<i>Sedikit informasi bot</i>"
pesan += "\n\n🔰Versi bot : 1.01"
pesan += "\n⚙️Framework : Google App Script"
pesan += "\n⚜️Dibuat oleh @Oh_Yoon_Hee"
pesan += "\n\n<i>©️Copyright @TaRianaBot</i>"
pesan += "\n<b>Informasi ini dibuat pada 2 Maret 2021</b>"
return pesan
}
