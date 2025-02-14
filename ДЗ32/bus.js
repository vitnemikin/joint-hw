export class Bus {
  constructor(speed = 50) {
    this.speed = speed;
    this.currentStop = 0;
    this.passengers = 0;
    this.route = [];
    this.busElement = document.querySelector(".bus");  // VN: По заданию, класс Bus не должен взаимодействовать с интерфейсом.
                                                       // Но если уж взаимодействует, то логично в конструкторе создавать
                                                       // новый элемент интерфейса, а не использовать имеющийся. Если вам
                                                       // вдруг потребуются два экземпляра класса Bus, этот код приведёт к
                                                       // очень забавным результатам.
  }
  setRoute(route) {
    this.route = route;
    this.currentStop = 0;
  }
  async go() {
    if (this.currentStop >= this.route.length) {
      return "";
    }
  
    const distance = this.route[this.currentStop];
    const travelTime = (distance / this.speed) * 3600;
    this.busElement.style.transition = `left ${travelTime}ms linear`;
    const currentPosition = parseInt(this.busElement.style.left);
    const newPosition = currentPosition + distance * 100;
    this.busElement.style.left = `${newPosition}px`;    // VN: это причина странного перемещения элемента автобуса на странице -
                                                        // main.js и bus.js управляют одним и тем же объектом. При этом main.js
                                                        // "знает" о реальных координатах следующей остановки, а bus.js не знает
  
    await new Promise(resolve => setTimeout(resolve, travelTime));
  
    this.currentStop++;
    const passengersOut = Math.min(this.passengers, Math.floor(Math.random() * 6));
    const passengersIn = this.currentStop === this.route.length ? 0 : Math.floor(Math.random() * 6);
    this.passengers -= passengersOut;
    this.passengers += passengersIn;
    if (this.currentStop === this.route.length) {
      return `Остановка №${this.currentStop}. Конечная. Проехали ${distance} км за ${travelTime / 60000} минут. Вышло ${passengersOut} человек, текущее количество пассажиров: 0`;
    } else {
      return `Остановка №${this.currentStop}: проехали ${distance} км за ${travelTime / 60000} минут. Вышло ${passengersOut} человек, зашло ${passengersIn}, текущее количество пассажиров: ${this.passengers}`;
    }
  }

  isFinished() {
    return this.currentStop >= this.route.length;
  }
}

