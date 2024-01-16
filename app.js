if ("serviceWorker" in navigator) {
    //window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("mfcv2.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    //})
}

//private
let ctrl = (_name_) => { return document.querySelector(_name_);}; 
let get = (f) => { return document.querySelector(f).value; };
let set = (f,v) => { document.querySelector(f).value = v; }
let isEmpty = (str) => { return (!str || str.length === 0 ); };

/*
class Ctrl {
    constructor(_name_) {
      this._ = document.querySelector(_name_);
    }
  
    get Value() {
      return this._.value;
    }
  
    set Value(x) {
      this._.value = x;
    }

    setHandler(_evnt_,_handle_){
         this._.addEventListener(_evnt_, _handle_,false); 
    }

    setStyle(_styl_){
        this._.style = _styl_;
    }
}
*/



//functions
//var btn_login = ctrl("#bt_login");

//////////////////////////////////////

/* MPW app script*/
var mpw, fullname, masterpassword, version, sitename, counter, context, template, type, resulttype, password, error, id = 0;



function updateMPW() {
    //error.textContent = password.value = "";

    if (!fullname.value ||
        !masterpassword.value ||
        !fullname.validity.valid ||
        !masterpassword.validity.valid ||
        !version.validity.valid) {
        return mpw = null;
    }

    mpw = new MPW(fullname.value, masterpassword.value, version.valueAsNumber);
   //EnableFields();
   try{ 
   updatePassword();
   }
   catch(e){
    error.textContent = e.message;
   }
}

function updatePassword() {

    error.textContent = "";

    if(mpw == undefined)
        mpw = new MPW(fullname.value, masterpassword.value, 3);

    if(password)
        password.value = "Master Password...|";

    if (!mpw || !sitename.value ||
        !sitename.validity.valid ||
        !counter.validity.valid ||
        !context.validity.valid ||
        !template.validity.valid ||
        !type.validity.valid) {
        return;
    }

    var cid = ++id;

    var Type = type.value[0].toUpperCase() + type.value.slice(1).toLowerCase();
    var value = mpw["generate" + Type](sitename.value, counter.valueAsNumber, context.value, template.value);

    value.then(function (pass) {
        if (cid === id) {
            password.value = pass;
            checkPassword(pass);
        }
    }, function (err) {
        if (cid === id) {
            error.textContent = err.message;
        }

        console.error(err);
    });
}

function updateType() { 
    resulttype.textContent = type.selectedOptions[0].textContent;

    switch (type.value) {
        case "identification":
            template.value = "name";
            break;
        case "authentication":
            template.value = "long";
            break;
        case "recovery":
            template.value = "phrase";
            break;
    }

    updatePassword();
}

function EnableFields()
{
    if(fullname.value != null || !masterpassword.value != null)
    {
        sitename.disabled = false;
        counter.disabled = false;
        context.disabled = false;
        template.disabled = false;
        type.disabled = false;
    }
    else{
        alert("Fullnam/Master password missing");
    }


}


//=========================


function Load()
{ 
}

function Login()
{
    var modal = ctrl('#loginmod');
    var tf_username = ctrl("#tf_uname");
    var tf_password = ctrl("#tf_psw");
    //tf_username.checkValidity();
    if(isEmpty(tf_username.value) || isEmpty(tf_password.value))
    {
        ctrl("#status").innerText = "username/password is mandatory";
    }
    else
    {
        //sessionStorage["mpwver"] = 3;
        //fullname = tf_username.value;
        //sessionStorage["mstrpswd"] = tf_password.value;

       

        //hide dialog  
        modal.style.display = "none";

        //page2Load();

        page1Load();
        updateMPW();
    }
}

function copyClipboard()
{
    var copyText = document.getElementById("genPass");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
  
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
    
    // Alert the copied text
    alert("Copied the text");
}


function toLower(field)
{
    var string = field.value;
    string = string.toLowerCase();
    field.value = string;
}



function page1Load()
{
    fullname = document.querySelector("#tf_uname");
    masterpassword = document.querySelector("#tf_psw");
    version = document.querySelector("#mpwver");
    calculatekey = document.querySelector("#bt_login");
    error = document.querySelector(".error");
    
    calculatekey.addEventListener("click", updateMPW, false);
    
    sitename = document.querySelector("#site");
    counter = document.querySelector("#counter");
    context = document.querySelector("#context");
    template = document.querySelector("#template");
    type = document.querySelector("#type");
    resulttype = document.querySelector(".resulttype");
    password = document.querySelector("#genPass");
    error = document.querySelector(".error");

    updateMPW();

    sitename.addEventListener("input", updatePassword, false);
    counter.addEventListener("input", updatePassword, false);
    context.addEventListener("input", updatePassword, false);
    template.addEventListener("change", updatePassword, false);
    type.addEventListener("change", updatePassword, false);

    updateType();
    type.addEventListener("change", updateType, false);


}

// Paswd

