// login
function showLogin() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
}

function showRegister() {
    document.getElementById('registerModal').style.display = 'block';
}

function closeRegister() {
    document.getElementById('registerModal').style.display = 'none';
}

function showCart(){
    var x = document.getElementById("show-cart")
    if(x.style.display == "none" || x.style.display === ""){
        x.style.display = "block"
    }else{
        x.style.display = 'none'
    }
}
