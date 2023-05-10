class Api {
  constructor() {
    this._towers = [
      { id: 1, name: "A", floors: Array.from({length: 25}, (_, i) => i + 3), meetingRoomsCount: 10 },
      { id: 2, name: "B", floors: Array.from({length: 25}, (_, i) => i + 3), meetingRoomsCount: 10 }
    ];
    this._hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
    this._meetingRooms = [];
    this._bookings = [];

    this._towers.forEach(tower => {
      tower.floors.forEach((floor) => {
        for (let i = 1; i <= tower.meetingRoomsCount; i++ ) {
          this._meetingRooms.push({
              id: this._meetingRooms.length+1,
              name: tower.name + "-" + floor + "-" + i,
              towerId: tower.id,
              floor: floor
          });
        }
      })
  });
  }
  
  getTowers() {
    return this._towers;
  }
  
  getFloors(towerId) {
    const found = this._towers.find((tower) => tower.id === towerId);
    return found?.floors ?? [];
  }

  getRooms(towerId, floor) {
    return this._meetingRooms.filter((room) => room.towerId === towerId && room.floor === floor);
  }

  getHours() {
    return this._hours;
  }

  getRoomBookings(roomId, date) {
    return this._bookings.filter((booking) => booking.room.id === roomId && booking.dateInfo.date === date);
  }

  addBooking(booking) {
    let existingBookings = this.getRoomBookings(booking.room.id, booking.dateInfo.date);
    if (existingBookings.some((x) => {
      return x.dateInfo.startTime === booking.dateInfo.startTime || x.dateInfo.endTime === booking.dateInfo.endTime
      || (booking.dateInfo.startTime < x.dateInfo.startTime && booking.dateInfo.endTime > x.dateInfo.startTime)
      || (booking.dateInfo.endTime > x.dateInfo.endTime && booking.dateInfo.startTime < x.dateInfo.endTime);
    }))
    {
      return false;
    } else {
      this._bookings.push(booking);
      return true;
    }
  }  
}

const api = new Api();

export default api;