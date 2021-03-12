/*

PASTIKAN ZONA WAKTUNYA UDH BERUBAH BIAR BENER DIMATA PEMILIK WKAKAKA

*/

var rebahan = new Date()
let uBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
let uHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
var menit = rebahan.getMinutes()
var hariS = rebahan.getDay()
var hari = uHari[hariS]
var jam = rebahan.getHours()
if(jam < 10){
  var jam = '0'+rebahan.getHours()
}
var bulans = rebahan.getMonth()
var bulan = uBulan[bulans]
var tahun = rebahan.getFullYear()
var tanggal = rebahan.getDate()

function waktu(){
  var init = jam+' : '+menit
  Logger.log(init)
  return init
}

function saatIni(){
  var init = hari+', '+tanggal+' '+bulan+' '+tahun
  Logger.log(init)
  return init
}
