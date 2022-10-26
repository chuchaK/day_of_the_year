Date.prototype.getWeek = function () {
    let start  = new Date(this.valueOf());
    let dayNr   = (this.getDay() + 7) % 7;
    start.setDate(start.getDate() - dayNr + 3);
    let first = start.valueOf();
    start.setMonth(0, 1);
    if (start.getDay() != 4) {
        start.setMonth(0, 1 + ((4 - start.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((first - start) / 604800000);
}

Date.prototype.getDay = function () {
    let dano  = new Date(this.valueOf());
    let start = new Date(dano.getFullYear(), 0, 0);
    let diff = dano - start;
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);
    return day;
}

Date.prototype.getTime = function () {
    let dano  = new Date(this.valueOf());
    let end_late = new Date(dano.getFullYear(), dano.getMonth(), dano.getDate(), 0, 0, 0);
    let now = new Date();
    let diff = end_late - now;
    let res = new Date(diff);
    let str_timer = `${res.getUTCFullYear() - 1970}.${res.getUTCMonth()}.${res.getUTCDate() - 1} ${res.getUTCHours()}:${res.getUTCMinutes()}:${res.getUTCSeconds()}` ;
    return str_timer;
}

let dateIn = document.querySelector('input');
let week = document.querySelector("#week");
let day = document.querySelector("#day");
let timer = document.querySelector("#timer");
let mistake = document.querySelector("#mistake");
let today = new Date();
let max = new Date(2032, 10, 20);
console.log(today);



dateIn.oninput = function() {
    vvod = new Date(dateIn.value);
    if (vvod < today) {
        mistake.innerHTML = 'Дата уже наступила';
        week.innerHTML = '';
        day.innerHTML = '';
        timer.style.visibility = "hidden";
    } else if (vvod > max) {
        mistake.innerHTML = 'Введите дату меньше, чем 20.10.2032';
        week.innerHTML = '';
        day.innerHTML = '';
        timer.style.visibility = "hidden";
    }  else {
        mistake.innerHTML = '';    
        week.innerHTML = 'Номер недели в году : '+ new Date(dateIn.value).getWeek();
        day.innerHTML = 'Номер дня в году: '+ new Date(dateIn.value).getDay();
        timer.style.visibility = "visible";
        setInterval( func = () => {
            timer.innerHTML ='До введенной даты: ' + new Date(dateIn.value).getTime();
        }, 1000);
    }
}