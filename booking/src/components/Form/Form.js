import './form.css';
import {
  FormItem,
  Select,
  LocaleProvider,
  DateInput,
  Textarea,
  Button,
  CellButton,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

function Form(props) {
  return (
    <form className='form' onSubmit={props.handleSubmit}>

      <FormItem top="Башня">
        <Select
          placeholder="Не выбрана"
          options={props.towers.map((tower) => ({
            label: tower.name,
            value: tower.id
          }))}
          onChange={props.onTowerSelect}
          value={props.selectedTowerId}
        />
      </FormItem>

      <FormItem top="Этаж">
        <Select
          placeholder="Не выбран"
          options={props.floors.map((floor) => ({
            label: floor,
            value: floor
          }))}
          onChange={props.onFloorSelect}
          value={props.selectedFloor}
          disabled={props.isFloorDisabled}
          style={{cursor: "default"}}
        />
      </FormItem>

      <FormItem top="Переговорная комната">
        <Select
          placeholder="Не выбрана"
          options={props.rooms.map((room) => ({
            label: room.name,
            value: room.id
          }))}
          onChange={props.onRoomSelect}
          value={props.selectedRoomId}
          disabled={props.isRoomDisabled}
          style={{cursor: "default"}}
        />
      </FormItem>

      <div className='form__date'>
        <FormItem top='Дата' style={{width: "100%", boxSizing: "border-box"}}>
          <LocaleProvider value={'ru'}>
            <DateInput
              value={props.selectedDate}
              onChange={props.setSelectedDate}
              enableTime={false}
              disablePast={true}
              closeOnChange={true}
              required
              disabled={props.isDateDisabled}
              style={{cursor: "default"}}
            />
          </LocaleProvider>
        </FormItem>

        <FormItem 
          top='Начало' 
          style={{width: "100%", boxSizing: "border-box"}}
          status={props.isSuccess ? '' : 'error'}
          bottom={
            props.isSuccess ? '' : 'Данное время уже забронировано. Выберете другое время.'
          }
        >
          <Select
            placeholder="Не выбран"
            options={props.startTime?.map((hour) => ({
              label: hour,
              value: hour
            }))}
            onChange={props.onStartTimeSelect}
            value={props.selectedStartTime}
            disabled={props.isDateDisabled}
            style={{cursor: "default"}}
          />
        </FormItem>
        <FormItem top='Конец' style={{width: "100%", boxSizing: "border-box"}}>
          <Select
            placeholder="Не выбран"
            options={props.endTime?.map((hour) => ({
              label: hour,
              value: hour
            }))}
            onChange={props.onEndTimeSelect}
            value={props.selectedEndTime}
            disabled={props.isDateDisabled}
            style={{cursor: "default"}}
            status={props.isSuccess ? '' : 'error'}
          />
        </FormItem>
      </div>

      <FormItem top="Комментарий">
        <Textarea
          onChange={props.onCommentSelect}
          value={props.comment}
        />
      </FormItem>

      <FormItem>
        <Button
          size="l"
          stretched
          type="submit"
          value="Отправить"
          disabled={props.isButtonSubmitDisabled}
        >
          Отправить
        </Button>
      </FormItem>

      <FormItem
        style={{paddingTop: "0"}}
      >
        <CellButton 
          centered 
          type="reset" 
          value="Сбросить значение" 
          onClick={props.handleResetClick}
          style={{padding: "0", margin: "0"}}
        >
          Очистить форму
        </CellButton>
      </FormItem>
      
    </form>
  )
}

export default Form;