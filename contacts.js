const { rejects } = require('assert');
const fs = require('fs');

// membuat folder data jika belum ada
const dirpath = './data';
if (!fs.existsSync(dirpath)) {
  fs.mkdirSync(dirpath);
}

// membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}
const loadContact = () => {
  const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
  const contacts = JSON.parse(fileBuffer);
  return contacts;
}

const simpanContact = (nama, email, noHP) => {
    const contact = { nama, email, noHP };
    // const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    // const contacts = JSON.parse(fileBuffer);
    const contacts = loadContact();

//cek duplikat
const duplikat = contacts.find((contact) => contact.nama === nama);
if(duplikat){
  console.log('Contact sudah terdaftar, gunakan nama lain!');
  return false;
}

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log('terimakasih sudah memasukkan data.');

};

const listContact = () => {
const contacts = loadContact();
console.log('daftar nama dan nomor handphone');
contacts.forEach((contact, i) =>{
  console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
})
};

//menampilkan sebuah detail contact
const detailContact = (nama) => {
const contacts = loadContact();

const contact = contacts.find(
  (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

if(!contact){
  console.log(`${nama} tidak ditemukan`); 
  return false;
}
 console.log(contact.nama);
 console.log(contact.noHP);
 if(contact.email){
  console.log(contact.email);
 }

};

const deleteContact = (nama) => {
 const contacts = loadContact();
 const newContacts = contacts.filter(
  (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
 );
 if(contacts.length === newContacts.length){
  console.log(`${nama} tidak ditemukan`);
  return false;
 }
 fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));

 console.log(`data contact ${nama} Sudah terhapus`);
};

module.exports = {simpanContact, listContact, detailContact, deleteContact}