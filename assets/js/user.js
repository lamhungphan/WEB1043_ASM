var users = [];
var user = {
    id: "",
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    position: 1,
    khoitao: function (id, fullname, email, password, password, phone, address, position) {
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.position = position;
    }
}

let usr1 = new khoitao("usr01", "Nguyen Van A", "A@gmail.com", "4444", "090909009", "Q12", 0);
users.push(usr1);
let usr2 = new khoitao("usr02", "Nguyen Van B", "B@gmail.com", "5555", "090909009", "Q2", 0);
users.push(usr2);
console.log(users);
