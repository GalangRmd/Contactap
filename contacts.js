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

const simpanContact = (nama, email, noHP) => {
    const contact = { nama, email, noHP };
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);

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

module.exports = {simpanContact}