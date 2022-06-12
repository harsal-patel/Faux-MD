const patients = [
    {
        "id": "jdoe061278",
        "password": "password1",
        "firstname": "John",
        "lastname": "Doe",
        "birthdate": "06/12/1978",
        "street": "153 N Pine St",
        "citystatezip": "Los Angeles, CA 91775",
        "phone": "626-493-5838",
        "height": "5'11",
        "weight": "187",
        "sex": "male",
        "medication": [["Atorvastatin", "40mg"], ["Hydrochlorothiazide", "25mg"], ["Folic Acid", "1mg"], ["Metformin", "850mg"], ["Glipizide", "10mg"], ["Lovastatin", "50mg"]],
        "visitdate": "4/03/2022",
        "doctor": "Dr. Jason Merritt",
        "visitnotes": "Blood pressure: 132/84. Pulse 74 bpm. Patient came in for routine checkup. Blood pressure is marginally lower compared to previous visit. This is a sign that the medication has been helping in regards to patient's high blood pressure. Blood pressure is still higher than would like. Patient is advised to return for another checkup in 6 months to make sure medication is still lowering blood pressure. Results of lab report show higher than normal cholesterol and blood sugar levels. Patient is advised to alter diet to reduce these levels. Rest of report is normal. Medication dosages unchanged.",
        "labtestdate": "03/23/2022",
        "nextvisit": "10/12/2022"
    },
    {
        "id": "mjohnson112486",
        "password": "password2",
        "firstname": "Mary",
        "lastname": "Johnson",
        "birthdate": "11/24/1986",
        "street": "972 Prospect St",
        "citystatezip": "Camden, NJ 08102",
        "phone": "856-703-5519",
        "height": "5'3",
        "weight": "142",
        "sex": "female",
        "medication": [["Azithromycin", "250mg"], ["Naproxen", "500mg"], ["Alprazolam", "0.5mg"], ["Ferrous Sulfate", "300mg"]],
        "visitdate": "2/24/22",
        "doctor": "Dr. Jason Merritt",
        "visitnotes": "Blood pressure: 120/75. Pulse 68 bpm. Patient came in with cold symptoms, fever, and irritation in back of throat. Further analysis showed swollen lymph nodes in the neck. Conclusions is that patient has strep throat. Prescribed antibiotics to be taken over a 5 day period. Patient is advised to check back in with clinic if symptoms do not improve over the next 48 hours.",
        "labtestdate": "12/18/21",
        "nextvisit": "10/04/22"
    }
]

let index = sessionStorage.getItem("index");
let patientFound = sessionStorage.getItem("patientFound");
let physicianFound = sessionStorage.getItem("physicianFound");

function validatePatient(form) {
    let username = document.getElementById("patientID").value;
    let password = document.getElementById("patientPassword").value;
    patientFound = false;
    for (let i = 0; i < patients.length; i++) {
        if (username === patients[i].id && password === patients[i].password) {
            patientFound = true;
            sessionStorage.setItem("patientFound", patientFound);
            sessionStorage.setItem("index", i);
        }
    }
    console.log(patientFound);
    if (!patientFound) {
        alert("Incorrect username and/or password!");
    }
    else {
        form.action = "patientview.html";
        return true;
    }
}

function validatePhysician(form) {
    let username = document.getElementById("physicianID").value;
    let password = document.getElementById("physicianPassword").value;
    if (username === "jmerritt76" && password === "password0") {
        sessionStorage.setItem("physicianFound", true);
        form.action = "physicianview.html";
        return true;
    }
    else {
        alert("Incorrect username and/or password!");
    }
}

function flagMedicine() {
    if (confirm("Would you like to flag this medication as incorrect?")) {
        alert("Medication has been successfully flagged!");
    }
}

if (patientFound) {
    document.getElementById('patientid').innerHTML = patients[index].id;
    document.getElementById('patientname').innerHTML = `${patients[index].firstname} ${patients[index].lastname}`;
    document.getElementById('patientbirthdate').innerHTML = patients[index].birthdate;
    document.getElementById('patientaddress').innerHTML = `${patients[index].street}, ${patients[index].citystatezip}`;
    document.getElementById('patientphone').innerHTML = patients[index].phone;
    document.getElementById('patientsex').innerHTML = patients[index].sex;
    document.getElementById('patientheight').innerHTML = patients[index].height;
    document.getElementById('patientweight').innerHTML = patients[index].weight;
    document.getElementById('patientlabdate').innerHTML = patients[index].labtestdate;
    document.getElementById('patientvisitdate').innerHTML = patients[index].visitdate;
    document.getElementById('patientnextdate').innerHTML = patients[index].nextvisit;
    for (let i = 0; i < patients[index].medication.length; i++) {
        let temp = document.createElement("div");
        temp.classList.add("container");
        temp.classList.add("medication-box");
        let p = document.createElement("p");
        p.innerHTML = `${patients[index].medication[i][0]} (${patients[index].medication[i][1]})`;
        let span = document.createElement("span");
        span.classList.add("flag");
        let flag = document.createElement("img");
        flag.src = "images/flag.svg";
        let button = document.createElement("button");
        button.classList.add("flag-button");
        button.onclick = flagMedicine;
        button.appendChild(flag);
        span.appendChild(button);
        temp.appendChild(p);
        temp.appendChild(span);
        document.getElementById('medication').appendChild(temp);
    }
    document.getElementById('patientdoctor').innerHTML = patients[index].doctor;
    document.getElementById('patientnotes').innerHTML = patients[index].visitnotes;
}