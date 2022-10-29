// The event to header menu open and close
let headerMenu = document.getElementById("open-menu");
headerMenu.onclick = () => {
  headerMenu.classList.toggle("active");
  document.querySelector("header nav").classList.toggle("open-menu");
  document.querySelector("section").classList.toggle("no-touch");
  document.querySelector("footer").classList.toggle("no-touch");
};


// this is parent class, The are Attribute to Element
class CreateCoin {
  constructor(countryName, coinName, symbol, img) {
    this.countryN = countryName;
    this.coinN = coinName;
    this.symbol = symbol;
    this.img = img;
  }
}
//  Secondary class, there is method return first Class
class push {
  create(countryName, coinName, symbol, img) {
    return new CreateCoin(countryName, coinName, symbol, img);
  }
}
// add class to the new Array
const coinsNew = new push();
const coinsList = [];
addFeaturesCoin(coinsNew, coinsList);
CreateElemntInMenu(coinsList);

function addFeaturesCoin(pushClass, array) {
  array.push(pushClass.create("الولايات المتحدة","دولار الأمريكي","USD","https://flagcdn.com/40x30/us.png"));
  array.push(pushClass.create("أوربا","يورو الأوربي","EUR","images/Flag_of_Europe.svg.png"));
  array.push(pushClass.create('سوريا', "ليرة السورية", "SYP", 'https://flagcdn.com/w40/sy.webp'));
  array.push(pushClass.create('تركيا', "ليرة تركية", "TRY", 'https://flagcdn.com/w40/tr.webp'));
  array.push(pushClass.create('لبنان', "ليرة البنانية", "LBP", 'https://flagcdn.com/w40/lb.webp'));
  array.push(pushClass.create('السويد', "كرونة السويدية", "SEK", 'https://flagcdn.com/w40/se.webp'));
  array.push(pushClass.create("مصر","الجنية","EGP","https://flagcdn.com/w40/eg.webp"));
  array.push(pushClass.create("السعودية","ريال","SAR","https://flagcdn.com/w40/sa.webp"));
  array.push(pushClass.create("قطر","ريال","KWD","https://flagcdn.com/w40/qa.webp"));
  array.push(pushClass.create("السودان","جنية","SDG","https://flagcdn.com/w40/sd.webp"));
}

function CreateElemntInMenu(array) {
  let content = document.querySelector("#menu-new-coin .content");
  content.innerHTML = "";
  let coin = "";
  array.forEach((i) => {
    coin += `
        <div data-symbols="${i.symbol}" class="coin-option">
        <input id="${i.symbol}" type="checkbox" />
        <label for="${i.symbol}">
            <img src="${i.img}" alt="${i.coinN}" />
            <div class="info">
            <h4>${i.coinN}</h4>
            <span>${i.countryN}</span>
            </div>
        </label>
    </div>`;
  });
  content.innerHTML = coin;

  // add first to window Coin to page
  let firsElement = content.children[0].firstElementChild;
  let secondElement = content.children[1].firstElementChild;
  firsElement.checked = true;
  secondElement.checked = true;
  let awls = [firsElement, secondElement];
  toLandingPage(awls);
}

// the array in the localStorage
let parentMenuNewCoin = document.getElementById("menu-new-coin");

document.getElementById("add-coin").onclick = () => {
  parentMenuNewCoin.classList.add("active");

  if(parentMenuNewCoin.classList.contains("active")){
    document.body.style.overflow = 'hidden'
  }

};

document.getElementById("close-menu").onclick = () => {
  parentMenuNewCoin.classList.remove("active");

  if(!parentMenuNewCoin.classList.contains("active")){
    document.body.style.overflow = 'auto'
  }

};

document.getElementById("save-coin").onclick = () =>{

  if(parentMenuNewCoin.classList.contains("active")){
    document.body.style.overflow = 'auto'
  }

  let inputs = Array.from(document.querySelectorAll("coin-option, input"));
  // the in array there are element checked=true
  let checkedInput = inputs.filter(i => i.checked);
  parentMenuNewCoin.classList.remove("active");
  toLandingPage(checkedInput);
};

function toLandingPage(elementsChecked) {
  let box = '';
  let boxControl = document.querySelector("section .control-box");
  elementsChecked.forEach((el)=>{
    coinsList.forEach((coin)=>{
      if (coin.symbol == el.getAttribute("id")){
        box += `
        <div data-symbols="${coin.symbol}" class="box">
            <div class="info">
              <img src="${coin.img}" alt="" />
              <p id="title" class="title">${coin.coinN}</p>
            </div>
            <div class="control">
              <input type="number" />
              <span>1 دولار أمريكي = 0.0939 يورو</span>
            </div>
            <div class="analytics">
              <i class="fa-solid fa-chart-simple"></i>
            </div>
        </div>`;
        boxControl.innerHTML= box;
      };
    })
  });
  controlElmentinPage(boxControl);
}

function controlElmentinPage(controlBox){
  // All Children in the landing page
  let listBoxes = Array.from(controlBox.children),
    analytics = Array.from(document.querySelectorAll(".box .analytics"));

  listBoxes.forEach((box) => {
    box.addEventListener("click", (e) => {
      // remove class (opacity-div) from all Elements
      analytics.forEach((ana) => ana.classList.remove("opacity-div"));
      // add class (opacity-div). remove analytics section from the box
      e.currentTarget.children[2].classList.add("opacity-div");

      listBoxes.forEach((box) => box.classList.remove("active"));
      box.classList.add("active");

      filterAndEventInput();

      function filterAndEventInput() {
        // is box has class (active)
        let activeBoxes = listBoxes.filter((box) =>box.classList.contains("active"));
        // get the input from the parent (box)
        let inputParentActive = activeBoxes[0].children[1].firstElementChild;
        // get data attribute
        let from = activeBoxes[0].dataset.symbols;
        // boxes don't have active
        let remnantInput = listBoxes.filter((box) => !box.classList.contains("active"));

        inputParentActive.onkeyup = () => {
          let userValue = inputParentActive.value;

          if (userValue == "" || userValue.startsWith("0")) {
            return false;
          } else {
            amount = Number(inputParentActive.value);
          }

          remnantInput.forEach((input) => {
            let to = input.dataset.symbols;

            dataAPI(to, from, amount, input);
          });
        };
      }
    });
  });
}

function dataAPI(to, from, amount, remnantInput) {
  let myHeaders = new Headers();
  myHeaders.append("apikey", "QQCnlJtbRQI1I12OsG4d7iGLAWPb39Kt");

  let requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,requestOptions)
    .then((response) => {
      let myData = response.json();
      return myData;
    })
    .then((result) => {
      console.log(result)
      let resultValue = Number(result.result).toFixed(2);

      remnantInput.children[1].firstElementChild.value = resultValue;
    })
    .catch((error) => console.log("error", error));
}
