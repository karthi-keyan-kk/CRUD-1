let fname = document.getElementById('fname')
let mname = document.getElementById('mname')
let lname = document.getElementById('lname')
let gender = document.getElementById('opt')
let contact = document.getElementById('contact')
let dob = document.getElementById('dob')
let eMail = document.getElementById('mail')

let saveBtn = document.getElementById('but')

let tableBody = document.getElementById('result')

let clearBtn = document.getElementById('clear')
clearBtn.addEventListener('click',function(){
    clear()
})

function  save() {

    let personalDetails = {
        Fn: fname.value,
        Mn: mname.value,
        Ln: lname.value,
        gen: gender.value,
        contactNo: contact.value,
        date: dob.value,
        mail: eMail.value
    }
    
    let jsonString = JSON.stringify(personalDetails)
    
    localStorage.setItem(fname.value, jsonString)

    let row = document.createElement('tr')
    row.innerHTML = `
    <td>${fname.value}</td>
    <td>${mname.value}</td>
    <td>${lname.value}</td>
    <td>${gender.value}</td>
    <td>${contact.value}</td>
    <td>${dob.value}</td>
    <td>${eMail.value}</td>
    <button onclick=Edit(this);>Edit</button>
    `
    tableBody.appendChild(row)

    clear()
}

function clear() {
    fname.value = ""
    mname.value = ""
    lname.value = ""
    gender.value = ""
    contact.value = ""
    dob.value = ""
    eMail.value = ""
}

function Edit(button) {
    let row = button.parentNode
    let cells = row.getElementsByTagName('td')

    let key = ""

    for(let i=0; i<cells.length; i++){
        if(i == 0){
            key = cells[i].innerText
            cells[i].innerText = ""
        }
        else{
            cells[i].innerText = ""
        }
    }

    let data = localStorage.getItem(key)

    let jsonData = JSON.parse(data)

    fname.value = jsonData.Fn
    mname.value = jsonData.Mn
    lname.value = jsonData.Ln
    gender.value = jsonData.gen
    contact.value = jsonData.contactNo
    dob.value = jsonData.date
    eMail.value = jsonData.mail

    saveBtn.innerText = "Update"
    saveBtn.onclick = function(){
        let fName = fname.value
        let mName = mname.value
        let lName = lname.value
        let gender2 = gender.value
        let con2 = contact.value
        let dob2 = dob.value
        let mail = eMail.value
        let fields = [fName,mName,lName,gender2,con2,dob2,mail]
        for(let j=0; j<cells.length; j++){
            cells[j].innerText = fields[j]
            let updateData = {
                Fn: fName,
                Mn: mName,
                Ln: lName,
                gen: gender2,
                contactNo: con2,
                date: dob2,
                mail: mail
            }

            let jsonString = JSON.stringify(updateData)
            localStorage.setItem(fName, jsonString)
            fields[j].value = ""
        }
        clear()
        saveBtn.innerText = "Save"
        saveBtn.onclick = function(){
            save()
        }
    }
}