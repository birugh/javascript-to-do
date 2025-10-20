
data = [
    // { nama: "biru", kelas: "XI" },
]

dataTask = [
    // { nama: "biru", kelas: "XI", task: "ngoding" },
]

let formAnggota = document.getElementById("formAnggota");
let txtCreateNama = document.getElementById("nama");
let selectCreateKelas = document.getElementById("kelas");
let btnSubmitAnggota = document.getElementById("btnAnggota");
let tableAnggota = document.getElementById("dataAnggota");

let selectAnggota = document.getElementById("namaAnggota");
let selectKelas = document.getElementById("kelasAnggota");
let txtTugas = document.getElementById("tugas");
let btnHapusTask = document.getElementById("btnHapusTask");
let btnSubmitTask = document.getElementById("btnTask");
let formTask = document.getElementById("formTask");

readAnggota();
loadComponent();

formAnggota.addEventListener('submit', (e) => {
    e.preventDefault();
})
formTask.addEventListener('submit', (e) => {
    e.preventDefault();
})

function loadComponent() {
    let optionPlaceholder = document.createElement("option");
    optionPlaceholder.value = '';
    optionPlaceholder.textContent = "Pilih nama Anggota";
    optionPlaceholder.setAttribute('selected', '');
    optionPlaceholder.setAttribute('disabled', '');
    optionPlaceholder.setAttribute('hidden', '');
    selectAnggota.appendChild(optionPlaceholder);
}

function ResetInputAnggota() {
    txtCreateNama.value = '';
    selectCreateKelas.value = '';
}

// ! CRUD Anggota
function createAnggota(data, anggota) {
    data.push(anggota);
    ResetInputAnggota();
    alert('Data berhasil ditambahkan');
    displayAnggota();

    let anggotaValue = selectAnggota.value;
    data.find(function (item) {
        return item.nama === anggotaValue;
    })
    anggota ? selectKelas.value = anggota.kelas : selectKelas.value = "";
}

function readAnggota() {
    selectAnggota.innerHTML = '';
    if (data !== null) {
        data.forEach(function (item, index) {
            let option = document.createElement("option");
            option.value = item.nama;
            option.textContent = item.nama;
            selectAnggota.appendChild(option);
        });
    }
}

function displayAnggota() {
    tableAnggota.innerHTML = '';
    if (data !== null) {
        data.forEach(function (item, index) {
            let tr = document.createElement("tr");
            let nama = document.createElement("td");
            let kelas = document.createElement("td");

            nama.textContent = `${item.nama}`;
            kelas.textContent = `${item.kelas}`;

            tableAnggota.appendChild(tr);
            tableAnggota.appendChild(nama);
            tableAnggota.appendChild(kelas);
        });
    }
}

function deleteAnggota(data, index) {
    let anggotaValue = selectAnggota.value;
    const anggotaIndex = data.findIndex(function (item) {
        return item.nama === anggotaValue;
    })
    data.splice(anggotaIndex, 1);
}

selectAnggota.addEventListener("change", function () {
    let anggotaValue = selectAnggota.value;
    const anggota = data.find(function (item) {
        return item.nama === anggotaValue;
    })
    anggota ? selectKelas.value = anggota.kelas : selectKelas.value = "";
});


btnHapusTask.addEventListener("click", function () {
    deleteAnggota(data);
})

btnSubmitAnggota.addEventListener("click", function () {
    createAnggota(data, { nama: txtCreateNama.value, kelas: selectCreateKelas.value })
    console.log(data);
    readAnggota();
})
