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
    { nama: "biru", kelas: "XI", task: "ngoding", done: false },
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
    if (dataAnggota.length === 0) {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.colSpan = 4;
        td.textContent = "Belum ada anggota";
        tr.appendChild(td);
        tableAnggota.appendChild(tr);
        return;
    }

    data.forEach(function (item, index) {
        let tr = document.createElement("tr");
        let nama = document.createElement("td");
        let kelas = document.createElement("td");
        let action = document.createElement("td");
        action.style.textAlign = 'center'
        let buttonHapus = document.createElement("button");

        buttonHapus.classList.add('btnHapusAnggota');
        buttonHapus.classList.add('btn');
        buttonHapus.classList.add('btn--secondary');
        buttonHapus.textContent = 'Hapus';
        buttonHapus.dataset.index = index;
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
        action.style.textAlign = 'center'
        let buttonHapus = document.createElement("button");

        buttonHapus.classList.add('btnHapusTask');
        buttonHapus.classList.add('btn');
        buttonHapus.classList.add('btn--secondary');
        buttonHapus.textContent = 'Hapus';
        buttonHapus.dataset.index = index;

        let buttonFinish = document.createElement("button");
        buttonFinish.dataset.index = index;

        buttonFinish.classList.add('btnFinish');
        buttonFinish.classList.add('btn');
        buttonFinish.classList.add('btn--primary');
        buttonFinish.textContent = 'Selesai';

        nama.textContent = item.nama;
        if (item.done) {
            tr.classList.add("done");
            nama.classList.add("done");
            kelas.classList.add("done");
            tugas.classList.add("done");
        }
        kelas.textContent = item.kelas;
        tugas.textContent = item.task;

        tr.appendChild(nama);
        tr.appendChild(kelas);
        tr.appendChild(tugas);
        tr.appendChild(action);
        action.appendChild(buttonHapus);
        action.appendChild(buttonFinish);
        tableTask.appendChild(tr);
    });

    pasangListenerHapusTask();
    pasangListenerFinishTask();
}

function pasangListenerHapusTask() {
    document.querySelectorAll('.btnHapusTask').forEach(btn => {
        btn.addEventListener('click', function () {
            const index = btn.dataset.index;
            deleteTask(index);
        });
    });
}

function pasangListenerFinishTask() {
    document.querySelectorAll('.btnFinish').forEach(btn => {
        btn.addEventListener('click', function () {
            const index = btn.dataset.index;
            finishTask(index);
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

function finishTask(index) {
    dataTask[index].done = !dataTask[index].done;
    if (dataTask[index].done) {
        alert('Task selesai');
    }
    else {
        alert('Undo task');
    }

    displayTask();

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