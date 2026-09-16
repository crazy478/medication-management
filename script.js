/* =========================
   DATA
========================= */

let residents =
    JSON.parse(localStorage.getItem("residents")) || [];

let medicines =
    JSON.parse(localStorage.getItem("medicines")) || [];

let schedules =
    JSON.parse(localStorage.getItem("schedules")) || [];

let history =
    JSON.parse(localStorage.getItem("history")) || [];


/* =========================
   LOGIN
========================= */

function login() {

    let username =
        document.getElementById("username").value;

    let password =
        document.getElementById("password").value;

    if (username === "admin" && password === "1234") {

        document
            .getElementById("loginPage")
            .classList.add("hidden");

        document
            .getElementById("app")
            .classList.remove("hidden");

        updateDashboard();

    } else {

        document.getElementById("loginMessage")
            .innerText =
            "Invalid username or password.";

    }
}


function logout() {

    document
        .getElementById("app")
        .classList.add("hidden");

    document
        .getElementById("loginPage")
        .classList.remove("hidden");

}


/* =========================
   PAGE NAVIGATION
========================= */

function showPage(pageId) {

    let pages =
        document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.add("hidden");
    });

    document
        .getElementById(pageId)
        .classList.remove("hidden");

    if (pageId === "dashboard") {
        updateDashboard();
    }

    if (pageId === "residents") {
        displayResidents();
    }

    if (pageId === "medicines") {
        displayMedicines();
        updateResidentDropdown();
    }

    if (pageId === "schedule") {
        displaySchedules();
        updateMedicineDropdown();
    }

    if (pageId === "history") {
        displayHistory();
    }
}


/* =========================
   RESIDENTS
========================= */

function addResident() {

    let name =
        document.getElementById("residentName").value;

    let age =
        document.getElementById("residentAge").value;

    let gender =
        document.getElementById("residentGender").value;

    let room =
        document.getElementById("residentRoom").value;

    let contact =
        document.getElementById("residentContact").value;


    if (!name || !age || !gender || !room) {

        alert("Please fill all required fields.");

        return;
    }


    let resident = {

        id: Date.now(),

        name: name,

        age: age,

        gender: gender,

        room: room,

        contact: contact

    };


    residents.push(resident);

    saveData();

    alert("Resident added successfully.");

    document.getElementById("residentName").value = "";
    document.getElementById("residentAge").value = "";
    document.getElementById("residentGender").value = "";
    document.getElementById("residentRoom").value = "";
    document.getElementById("residentContact").value = "";

    displayResidents();

    updateDashboard();
}


function displayResidents() {

    let container =
        document.getElementById("residentList");


    if (residents.length === 0) {

        container.innerHTML =
            "<p>No residents added yet.</p>";

        return;
    }


    let html = `
        <table>

        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Room</th>
            <th>Contact</th>
        </tr>
    `;


    residents.forEach(function(resident) {

        html += `

        <tr>

            <td>${resident.name}</td>

            <td>${resident.age}</td>

            <td>${resident.gender}</td>

            <td>${resident.room}</td>

            <td>${resident.contact}</td>

        </tr>

        `;

    });


    html += "</table>";

    container.innerHTML = html;
}


function updateResidentDropdown() {

    let dropdown =
        document.getElementById("medicineResident");


    dropdown.innerHTML =
        `<option value="">Select Resident</option>`;


    residents.forEach(function(resident) {

        dropdown.innerHTML += `

            <option value="${resident.id}">
                ${resident.name}
            </option>

        `;

    });
}


/* =========================
   MEDICINES
========================= */

function addMedicine() {

    let residentId =
        document.getElementById("medicineResident").value;

    let name =
        document.getElementById("medicineName").value;

    let dosage =
        document.getElementById("medicineDosage").value;

    let instructions =
        document.getElementById("medicineInstructions").value;


    if (!residentId || !name || !dosage) {

        alert("Please fill all required fields.");

        return;
    }


    let medicine = {

        id: Date.now(),

        residentId: residentId,

        name: name,

        dosage: dosage,

        instructions: instructions

    };


    medicines.push(medicine);

    saveData();

    alert("Medicine added successfully.");


    document.getElementById("medicineName").value = "";
    document.getElementById("medicineDosage").value = "";
    document.getElementById("medicineInstructions").value = "";


    displayMedicines();

    updateDashboard();
}


function displayMedicines() {

    let container =
        document.getElementById("medicineList");


    if (medicines.length === 0) {

        container.innerHTML =
            "<p>No medicines added yet.</p>";

        return;
    }


    let html = `

        <table>

        <tr>
            <th>Resident</th>
            <th>Medicine</th>
            <th>Dosage</th>
            <th>Instructions</th>
        </tr>

    `;


    medicines.forEach(function(medicine) {

        let resident =
            residents.find(
                r => r.id == medicine.residentId
            );


        let residentName =
            resident ? resident.name : "Unknown";


        html += `

            <tr>

                <td>${residentName}</td>

                <td>${medicine.name}</td>

                <td>${medicine.dosage}</td>

                <td>${medicine.instructions}</td>

            </tr>

        `;

    });


    html += "</table>";

    container.innerHTML = html;
}


function updateMedicineDropdown() {

    let dropdown =
        document.getElementById("scheduleMedicine");


    dropdown.innerHTML =
        `<option value="">Select Medicine</option>`;


    medicines.forEach(function(medicine) {

        let resident =
            residents.find(
                r => r.id == medicine.residentId
            );


        let residentName =
            resident ? resident.name : "Unknown";


        dropdown.innerHTML += `

            <option value="${medicine.id}">

                ${medicine.name}
                - ${residentName}

            </option>

        `;

    });
}


/* =========================
   SCHEDULE
========================= */

function addSchedule() {

    let medicineId =
        document.getElementById("scheduleMedicine").value;

    let time =
        document.getElementById("scheduleTime").value;

    let frequency =
        document.getElementById("scheduleFrequency").value;


    if (!medicineId || !time) {

        alert("Please select medicine and time.");

        return;
    }


    let schedule = {

        id: Date.now(),

        medicineId: medicineId,

        time: time,

        frequency: frequency

    };


    schedules.push(schedule);

    saveData();

    alert("Schedule created successfully.");

    displaySchedules();

    updateDashboard();
}


function displaySchedules() {

    let container =
        document.getElementById("scheduleList");


    if (schedules.length === 0) {

        container.innerHTML =
            "<p>No schedules created yet.</p>";

        return;
    }


    let html = `

        <table>

        <tr>
            <th>Resident</th>
            <th>Medicine</th>
            <th>Time</th>
            <th>Frequency</th>
        </tr>

    `;


    schedules.forEach(function(schedule) {

        let medicine =
            medicines.find(
                m => m.id == schedule.medicineId
            );


        if (!medicine) return;


        let resident =
            residents.find(
                r => r.id == medicine.residentId
            );


        let residentName =
            resident ? resident.name : "Unknown";


        html += `

        <tr>

            <td>${residentName}</td>

            <td>${medicine.name}</td>

            <td>${formatTime(schedule.time)}</td>

            <td>${schedule.frequency}</td>

        </tr>

        `;

    });


    html += "</table>";

    container.innerHTML = html;
}


/* =========================
   TODAY'S MEDICATION
========================= */

function displayTodayMedication() {

    let container =
        document.getElementById("todayMedication");


    if (schedules.length === 0) {

        container.innerHTML =
            "<p>No medication scheduled.</p>";

        return;
    }


    let html = `

        <table>

        <tr>
            <th>Resident</th>
            <th>Medicine</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
        </tr>

    `;


    schedules.forEach(function(schedule) {

        let medicine =
            medicines.find(
                m => m.id == schedule.medicineId
            );


        if (!medicine) return;


        let resident =
            residents.find(
                r => r.id == medicine.residentId
            );


        if (!resident) return;


        let today =
            new Date().toISOString().split("T")[0];


        let record =
            history.find(
                h =>
                h.scheduleId == schedule.id &&
                h.date === today
            );


        let status =
            record ? record.status : "DUE";


        let statusClass =
            status === "GIVEN"
                ? "status-given"
                : status === "MISSED"
                ? "status-missed"
                : "status-due";


        html += `

        <tr>

            <td>${resident.name}</td>

            <td>${medicine.name}
                (${medicine.dosage})
            </td>

            <td>${formatTime(schedule.time)}</td>

            <td class="${statusClass}">
                ${status}
            </td>

            <td>

                ${
                    status === "DUE"

                    ?

                    `
                    <button onclick="markMedicine(${schedule.id}, 'GIVEN')">
                        Given
                    </button>

                    <button onclick="markMedicine(${schedule.id}, 'MISSED')">
                        Missed
                    </button>
                    `

                    :

                    "Recorded"

                }

            </td>

        </tr>

        `;

    });


    html += "</table>";

    container.innerHTML = html;
}


/* =========================
   MARK MEDICINE
========================= */

function markMedicine(scheduleId, status) {

    let today =
        new Date().toISOString().split("T")[0];


    let schedule =
        schedules.find(
            s => s.id == scheduleId
        );


    let medicine =
        medicines.find(
            m => m.id == schedule.medicineId
        );


    let resident =
        residents.find(
            r => r.id == medicine.residentId
        );


    let existing =
        history.find(
            h =>
            h.scheduleId == scheduleId &&
            h.date === today
        );


    if (existing) {

        existing.status = status;

    } else {

        history.push({

            id: Date.now(),

            scheduleId: scheduleId,

            resident: resident.name,

            medicine: medicine.name,

            time: schedule.time,

            date: today,

            status: status

        });

    }


    saveData();

    displayTodayMedication();

    displayHistory();

    updateDashboard();

    alert(
        medicine.name +
        " marked as " +
        status
    );
}


/* =========================
   HISTORY
========================= */

function displayHistory() {

    let container =
        document.getElementById("historyList");


    if (history.length === 0) {

        container.innerHTML =
            "<p>No administration records yet.</p>";

        return;
    }


    let html = `

        <table>

        <tr>
            <th>Date</th>
            <th>Resident</th>
            <th>Medicine</th>
            <th>Time</th>
            <th>Status</th>
        </tr>

    `;


    history
        .slice()
        .reverse()
        .forEach(function(record) {

        let statusClass =
            record.status === "GIVEN"
                ? "status-given"
                : "status-missed";


        html += `

        <tr>

            <td>${record.date}</td>

            <td>${record.resident}</td>

            <td>${record.medicine}</td>

            <td>${formatTime(record.time)}</td>

            <td class="${statusClass}">
                ${record.status}
            </td>

        </tr>

        `;

    });


    html += "</table>";

    container.innerHTML = html;
}


/* =========================
   DASHBOARD
========================= */

function updateDashboard() {

    document.getElementById("residentCount")
        .innerText = residents.length;


    document.getElementById("medicineCount")
        .innerText = medicines.length;


    let today =
        new Date().toISOString().split("T")[0];


    let givenToday =
        history.filter(
            h =>
            h.date === today &&
            h.status === "GIVEN"
        ).length;


    let missedToday =
        history.filter(
            h =>
            h.date === today &&
            h.status === "MISSED"
        ).length;


    let due =
        schedules.length -
        givenToday -
        missedToday;


    if (due < 0) {
        due = 0;
    }


    document.getElementById("dueCount")
        .innerText = due;


    document.getElementById("missedCount")
        .innerText = missedToday;


    displayTodayMedication();
}


/* =========================
   SAVE DATA
========================= */

function saveData() {

    localStorage.setItem(
        "residents",
        JSON.stringify(residents)
    );

    localStorage.setItem(
        "medicines",
        JSON.stringify(medicines)
    );

    localStorage.setItem(
        "schedules",
        JSON.stringify(schedules)
    );

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );
}


/* =========================
   TIME FORMAT
========================= */

function formatTime(time) {

    if (!time) return "";

    let parts = time.split(":");

    let hour = parseInt(parts[0]);

    let minute = parts[1];

    let ampm =
        hour >= 12 ? "PM" : "AM";

    hour =
        hour % 12 || 12;

    return hour + ":" + minute + " " + ampm;
}


/* =========================
   INITIAL LOAD
========================= */

updateDashboard();