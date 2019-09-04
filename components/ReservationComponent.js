import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button,Modal,Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };


    handleReservation() {
        const { date, guests, smoking } = this.state;
        Alert.alert(
          'Your Reservation OK?',
          `Number of guests: ${guests}\nSmoking? ${smoking ? 'Yes' : 'No'}\nDate and Time:${date}`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => this.resetForm(),
            },
            {
              text: 'OK',
              onPress: () => {
                  this.presentLocalNotification(this.state.date)
                  this.addReservationToCalendar(this.state.date)
                  this.resetForm()
                }
            },
          ],
          { cancelable: false },
        );
      }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        });
    }

    async obtainCalendarPermission() {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
          permission = await Permissions.askAsync(Permissions.CALENDAR);
          if (permission.status !== 'granted') {
            Alert.alert('Permission not granted to access the calendar');
          }
        }
        return permission; // not working properly
      }

      async addReservationToCalendar(date) {
        await this.obtainCalendarPermission();
        const startDate = new Date(Date.parse(date));
        const endDate = new Date(Date.parse(date) + (2 * 60 * 60 * 1000)); // masaa mawili
        Calendar.createEventAsync(
          Calendar.DEFAULT,
          {
            title: 'Con Fusion Table Reservation',
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
            startDate,
            endDate,
            timeZone: 'Asia/Hong_Kong',
          },
        );
        Alert.alert('Reservation has been added to your calendar'); // not working properly
      }

    async obtainNotificationPermission() {
        let permissions = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
        if( permissions.status !== "granted") {
            permissions = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if(permissions.status !== "granted") {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return Permissions;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }
    
    render() {
        return(
            <ScrollView>
            <Animatable.View animation="zoomIn" duration={2000}>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                </Picker>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                <Switch
                    style={styles.formItem}
                    value={this.state.smoking}
                    // onTintColor='#512DA8'
                    trackColor='#512DA8' // ilioelekezwa
                    onValueChange={(value) => this.setState({smoking: value})}>
                </Switch>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
                <DatePicker
                    style={{flex: 2, marginRight: 20}}
                    date={this.state.date}
                    format=''
                    mode="datetime"
                    placeholder="select date and Time"
                    minDate="2019-09-09"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys. 
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />
                </View>
                <View style={styles.formRow}>
                <Button
                    onPress={() => this.handleReservation()}
                    title="Reserve"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </Animatable.View>
            </ScrollView>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
});

export default Reservation;