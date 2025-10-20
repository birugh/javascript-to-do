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
let tableTask = document.getElementById("dataTask");

// ! Data Dummy
data = [
    { nama: "biru", kelas: "XI" },
]

dataTask = [
    { nama: "biru", kelas: "XI", task: "ngoding" },
]

readAnggota();
loadComponent();
displayAnggota();
displayTask();


function loadComponent() {
    let optionPlaceholder = document.createElement("option");
    optionPlaceholder.value = '';
    optionPlaceholder.textContent = "Pilih nama Anggota";
    optionPlaceholder.setAttribute('selected', '');
    optionPlaceholder.setAttribute('disabled', '');
    optionPlaceholder.setAttribute('hidden', '');
    selectAnggota.appendChild(optionPlaceholder);
}


// ! CRD Anggota
formAnggota.addEventListener('submit', (e) => {
    e.preventDefault();
})

function ResetInputAnggota() {
    txtCreateNama.value = '';
    selectCreateKelas.value = '';
}

function pasangListenerHapus() {
    document.querySelectorAll('.btnHapusAnggota')
        .forEach(btn => {
            btn.addEventListener('click', function () {
                const index = btn.dataset.index;
                deleteAnggota(index);
            });
        });
}

function createAnggota(data) {
    const namaAnggotaValue = txtCreateNama.value;
    const kelasValue = selectCreateKelas.value;

    if (!namaAnggotaValue || !kelasValue) {
        alert("Lengkapi semua input anggota");
        return;
    }

    const newAnggota = {
        nama: namaAnggotaValue,
        kelas: kelasValue
    };

    data.push(newAnggota);
    alert('Anggota berhasil ditambahkan');
    ResetInputAnggota();
    readAnggota();
    displayAnggota();
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

    if (dataTask.length === 0) {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.colSpan = 4;
        td.textContent = "Belum ada anggota";
        tr.appendChild(td);
        tableTask.appendChild(tr);
        return;
    }

    data.forEach(function (item, index) {
        let tr = document.createElement("tr");
        let nama = document.createElement("td");
        let kelas = document.createElement("td");
        let action = document.createElement("td");
        let buttonHapus = document.createElement("button");

        buttonHapus.classList.add('btnHapusAnggota');
        buttonHapus.textContent = 'Hapus';
        buttonHapus.dataset.index = index;

        nama.textContent = item.nama;
        kelas.textContent = item.kelas;

        tr.appendChild(nama);
        tr.appendChild(kelas);
        tr.appendChild(action);
        action.appendChild(buttonHapus);
        tableAnggota.appendChild(tr);
    });

    pasangListenerHapus();
}

function deleteAnggota(index) {
    data.splice(index, 1);
    readAnggota();
    displayAnggota();
    alert('Anggota dihapus');
}

btnSubmitAnggota.addEventListener("click", function () {
    createAnggota(data, { nama: txtCreateNama.value, kelas: selectCreateKelas.value })
})

// ! CRD Task
formTask.addEventListener('submit', (e) => {
    e.preventDefault();
});

function ResetInputAnggotaTask() {
    txtTugas.value = '';
    selectAnggota.value = '';
    selectKelas.value = '';
}

function displayTask() {
    tableTask.innerHTML = '';

    if (dataTask.length === 0) {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.colSpan = 4;
        td.textContent = "Belum ada task";
        tr.appendChild(td);
        tableTask.appendChild(tr);
        return;
    }

    dataTask.forEach(function (item, index) {
        let tr = document.createElement("tr");
        let nama = document.createElement("td");
        let kelas = document.createElement("td");
        let tugas = document.createElement("td");
        let action = document.createElement("td");
        let buttonHapus = document.createElement("button");

        buttonHapus.classList.add('btnHapusTask');
        buttonHapus.textContent = 'Hapus';
        buttonHapus.dataset.index = index;

        nama.textContent = item.nama;
        kelas.textContent = item.kelas;
        tugas.textContent = item.task;

        tr.appendChild(nama);
        tr.appendChild(kelas);
        tr.appendChild(tugas);
        tr.appendChild(action);
        action.appendChild(buttonHapus);
        tableTask.appendChild(tr);
    });

    pasangListenerHapusTask();
}

function pasangListenerHapusTask() {
    document.querySelectorAll('.btnHapusTask').forEach(btn => {
        btn.addEventListener('click', function () {
            const index = btn.dataset.index;
            deleteTask(index);
        });
    });
}

function createTask() {
    const anggotaValue = selectAnggota.value;
    const kelasValue = selectKelas.value;
    const tugasValue = txtTugas.value.trim();

    if (!anggotaValue || !kelasValue || !tugasValue) {
        alert("Lengkapi semua input task");
        return;
    }

    const newTask = {
        nama: anggotaValue,
        kelas: kelasValue,
        task: tugasValue
    };

    dataTask.push(newTask);
    alert("Task berhasil ditambahkan");
    ResetInputAnggotaTask();
    displayTask();
    
    data.find(function (item) {
        return item.nama === anggotaValue;
    })
    anggota ? selectKelas.value = anggota.kelas : selectKelas.value = "";
}

function deleteTask(index) {
    dataTask.splice(index, 1);
    displayTask();
    alert('Task dihapus');
}

btnSubmitTask.addEventListener("click", function () {
    createTask();
});


selectAnggota.addEventListener("change", function () {
    let anggotaValue = selectAnggota.value;
    const anggota = data.find(function (item) {
        return item.nama === anggotaValue;
    })
    anggota ? selectKelas.value = anggota.kelas : selectKelas.value = "";
});