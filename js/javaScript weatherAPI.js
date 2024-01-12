//weather api
const icon = document.querySelector(".img-weather");

const getLoc = async () => {
  const url =
    "http://ip-api.com/json/?fields=status,country,city,lat,lon,timezone";

  const response = await fetch(url);

  const data = await response.json();

  return data;
};

const getWeather = async (lat, lon) => {
  api = "3d195d3993bf788d2777c1e98309cc84";
  url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;

  const responsee = await fetch(url);
  const dataa = responsee.json();

  return dataa;
};

function getIcon(weMain) {
  if (weMain == "Rain") {
    icon.src = "img/rainy.png";
  } else if (weMain == "Snow") {
    icon.src = "img/Snow.png";
  } else if (weMain == "Clouds") {
    icon.src = "img/windy.png";
  } else if (weMain == "Clear") {
    icon.src = "img/cloudy.png";
  } else if (weMain == "Drizzle") {
    icon.src = "img/clodybomb.png";
  }
}

const secLeft = document.querySelector(".secleft");
function getDayOrNight() {
  // let DayOrNight;
  let d = new Date();

  if (d.getHours() >= 6 && d.getHours() <= 19) {
    // DayOrNight = "day";

    document.body.style.backgroundColor ="radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)";
  } else {
    // DayOrNight = "Night";
    document.body.style.backgroundColor = "black";
  }
}

setInterval(timeHnadler, 1000);
let showDateWeek = document.querySelector(".date-week");
let showdate = document.querySelector(".date");
let showHour = document.querySelector(".dhour");
function timeHnadler() {
  let D = moment();
  let DWatch = D.format("HH:mm:ss");
  let DMonthDate = D.format("DD MMM YYYY");
  let DateWeek = D.format("dddd");

  showDateWeek.textContent = DateWeek;
  showdate.textContent = DMonthDate;
  showHour.textContent = DWatch;
}

const WheatherMain = document.querySelector(".h-wheather");

const locDom = document.querySelector(".locDom");
const degreW = document.querySelector(".degre-weather");
const desW = document.querySelector(".des");

window.addEventListener("load", () => {
  getLoc()
    .then((locData) => {
      console.log(locData);
      const timeZone = locData.timezone;
      locDom.textContent = timeZone;
      return getWeather(locData.lat, locData.lon);
    })
    .then((weData) => {
      const weTemp = weData.main.temp;
      const weMain = weData.weather[0].main;
      const weDes = weData.weather[0].description;

      const weTemporg = Math.floor(weTemp) - 273;

      degreW.textContent = `${weTemporg}C`;
      WheatherMain.textContent = weMain;
      desW.textContent = weDes;

      getIcon(weMain);
      getDayOrNight();
    });
});
