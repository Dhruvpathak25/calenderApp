import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';

class HotelBookingCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookedDates: [
        {
          start_date: '2024-02-29',
          end_date: '2024-03-01',
          start_period: 2,
          end_period: 1,
        },
        {
          start_date: '2024-03-01',
          end_date: '2024-03-01',
          start_period: 1,
          end_period: 2,
        },
        {
          start_date: '2024-03-03',
          end_date: '2024-03-04',
          start_period: 1,
          end_period: 1,
        },
        {
          start_date: '2024-03-19',
          end_date: '2024-03-19',
          start_period: 1,
          end_period: 2,
        },
        {
          start_date: '2024-03-01',
          end_date: '2024-03-10',
          start_period: 1,
          end_period: 2,
        },
      ],
      selectedDate: null,
    };
  }

  isSlotBooked(dateString, period) {
    const {bookedDates} = this.state;
    return bookedDates.some(booking => {
      const selectedDate = new Date(dateString);
      const bookingStartDate = new Date(booking.start_date);
      const bookingEndDate = new Date(booking.end_date);
      return (
        selectedDate >= bookingStartDate &&
        selectedDate <= bookingEndDate &&
        booking.start_period <= period &&
        booking.end_period >= period
      );
    });
  }

  renderMorningSlot(dateString) {
    const booked = this.isSlotBooked(dateString, 1);
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: booked ? '#ff474c' : 'white',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          borderBlockColor: 'black',
          borderWidth: 1,
          marginRight: 20,
          borderRadius: 20,
        }}
        onPress={() => this.setState({selectedDate: dateString})}>
        <Text>Morning Slot</Text>
      </TouchableOpacity>
    );
  }

  renderEveningSlot(dateString) {
    const booked = this.isSlotBooked(dateString, 2);
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: booked ? '#ff474c' : 'white',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          borderBlockColor: 'black',
          borderWidth: 1,
          borderRadius: 20,
        }}
        onPress={() => this.setState({selectedDate: dateString})}>
        <Text>Evening Slot</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const {selectedDate} = this.state;
    const markedDates = {};

    this.state.bookedDates.forEach(booking => {
      const startDate = booking.start_date;
      const endDate = booking.end_date;
      const startPeriod = booking.start_period;
      const endPeriod = booking.end_period;
      const color = booking.start_period === 1 ? 'orange' : 'purple';

      let currentDate = new Date(startDate);
      while (currentDate <= new Date(endDate)) {
        const dateString = currentDate.toISOString().split('T')[0];
        markedDates[dateString] = {
          period: true,
          startingDay: currentDate.toISOString().split('T')[0] === startDate,
          endingDay: currentDate.toISOString().split('T')[0] === endDate,
          color: color,
        };
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    return (
      <View style={{flex: 1, backgroundColor: 'white', marginTop: 70}}>
        <Text
          style={{
            alignSelf: 'center',
            paddingVertical: 20,
            fontSize: 20,
            fontWeight: '600',
          }}>
          Check-IN
        </Text>
        <Calendar
          markingType="period"
          onDayPress={day => this.setState({selectedDate: day.dateString})}
          markedDates={markedDates}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          {this.renderMorningSlot(selectedDate)}
          {this.renderEveningSlot(selectedDate)}
        </View>
      </View>
    );
  }
}

export default HotelBookingCalendar;
