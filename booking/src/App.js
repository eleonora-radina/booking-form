import sanitizeHtml from 'sanitize-html';
import { React, useState, useEffect } from 'react';
import { AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Header from './components/Header/Header.js'
import Form from './components/Form/Form.js'
import api from './utils/api.js';


const App = () => {
  const [towers, setTowers] = useState([]);
  const [selectedTowerId, setSelectedTowerId] = useState("");
  const [floors, setFloors] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const [isFloorDisabled, setIsFloorDisabled] = useState(true);
  const [isRoomDisabled, setIsRoomDisabled] = useState(true);
  const [isDateDisabled, setIsDateDisabled] = useState(true);
  const [isButtonSubmitDisabled, setIsButtonSubmitDisabled] = useState(true);

  const [selectedDate, setSelectedDate] = useState(null);
  const [allHours, setAllHours] = useState([]);
  const [startTime, setStartTime] = useState([]);
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [endTime, setEndTime] = useState([]);
  const [selectedEndTime, setSelectedEndTime] = useState("");

  const [comment, setComment] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    setTowers(api.getTowers());

    const hours = api.getHours();
    setAllHours(hours);
  }, []);

  useEffect(() => {
    selectedTowerId ? setIsFloorDisabled(false) : setIsFloorDisabled(true);
    setFloors(api.getFloors(selectedTowerId));
  }, [selectedTowerId]);

  useEffect(() => {
    selectedFloor ? setIsRoomDisabled(false) : setIsRoomDisabled(true);
    setRooms(api.getRooms(selectedTowerId, selectedFloor));
  }, [selectedTowerId, selectedFloor]);

  useEffect(() => {
    selectedRoomId ? setIsDateDisabled(false) : setIsDateDisabled(true);
  }, [selectedRoomId]);

  useEffect(() => {
    const indexOfFirst = allHours.indexOf(selectedStartTime);
    setEndTime(allHours.slice(indexOfFirst + 1));
  }, [allHours, selectedStartTime]);

  useEffect(() => {
    const today = new Date();
    let currentHour = today.toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric" });

    let hours = selectedDate?.toDateString() === today.toDateString()
      ? allHours.filter(h => h > currentHour)
      : allHours;
    setStartTime(hours.slice(0, allHours.length - 1))
    setEndTime(hours.slice(1, allHours.length))
    setSelectedStartTime("");
    setSelectedEndTime("");
  }, [allHours, selectedDate])

  useEffect(() => {
    selectedTowerId && selectedFloor && selectedRoomId && selectedDate && selectedStartTime && selectedEndTime
      ? setIsButtonSubmitDisabled(false)
      : setIsButtonSubmitDisabled(true);
  }, [selectedDate, selectedEndTime, selectedFloor, selectedRoomId, selectedStartTime, selectedTowerId])

  const onTowerSelect = (e) => {
    setSelectedTowerId(parseInt(e.target.value));
  }

  const onFloorSelect = (e) => {
    setSelectedFloor(parseInt(e.target.value));
  }

  const onRoomSelect = (e) => {
    setSelectedRoomId(parseInt(e.target.value));
  }

  const onStartTimeSelect = (e) => {
    setSelectedStartTime(e.target.value);
    setSelectedEndTime("");
    setIsSuccess(true);
  }

  const onEndTimeSelect = (e) => {
    setSelectedEndTime(e.target.value);
    setIsSuccess(true);
  }

  const onCommentSelect = (e) => {
    setComment(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const booking = {
      "tower": {
        "id": selectedTowerId,
        "name": towers.find(tower => tower.id === selectedTowerId).name,
      },
      "floor": selectedFloor,
      "room": {
        "id": selectedRoomId,
        "name": rooms.find(room => room.id === selectedRoomId).name,
      },
      "dateInfo": {
        "date": selectedDate.toDateString(),
        "startTime": selectedStartTime,
        "endTime": selectedEndTime,
      },
      "Comment": sanitizeHtml(comment)
    }

    if (api.addBooking(booking)) {
      console.log(JSON.stringify(booking, null, 4));
      console.log('Отправлено!');
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  }

  function handleResetClick() {
    setSelectedTowerId("");
    setSelectedFloor("");
    setSelectedRoomId("");

    setFloors([]);
    setRooms([]);

    setSelectedDate(null);
    setStartTime([]);
    setSelectedStartTime("");
    setEndTime([]);
    setSelectedEndTime("");
    setComment("");
    setIsSuccess(true);
  }

  return (
    <AppRoot mode="Partial">
      <Header />
      <Form
        handleSubmit={handleSubmit}
        towers={towers}
        onTowerSelect={onTowerSelect}
        selectedTowerId={selectedTowerId}
        floors={floors}
        onFloorSelect={onFloorSelect}
        selectedFloor={selectedFloor}
        isFloorDisabled={isFloorDisabled}
        rooms={rooms}
        onRoomSelect={onRoomSelect}
        selectedRoomId={selectedRoomId}
        isRoomDisabled={isRoomDisabled}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isDateDisabled={isDateDisabled}
        startTime={startTime}
        onStartTimeSelect={onStartTimeSelect}
        selectedStartTime={selectedStartTime}
        endTime={endTime}
        onEndTimeSelect={onEndTimeSelect}
        selectedEndTime={selectedEndTime}
        onCommentSelect={onCommentSelect}
        comment={comment}
        isButtonSubmitDisabled={isButtonSubmitDisabled}
        handleResetClick={handleResetClick}
        isSuccess={isSuccess}
      />

    </AppRoot>
  );
};

export default App;
