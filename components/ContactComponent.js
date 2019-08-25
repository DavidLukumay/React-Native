import React, {Component} from 'react';
import { Card } from 'react-native-elements';
import { Text,StyleSheet,View,ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';


class Contact extends Component{
    static navigationOptions = {
      title: 'Contact Us'
    };
    render(){
        return(
            <View>
              <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                  <Card title="Contact Information" style={styles.paragraph}>
                      <Text style={styles.paragraph}>121, Clear Water Bay Road</Text>
                      <Text style={styles.paragraph}>Clear Water Bay, Kowloon</Text>
                      <Text style={styles.paragraph}>HONG KONG</Text> 
                      <Text style={styles.paragraph}>Tel: +852 1234 5678</Text> 
                      <Text style={styles.paragraph}>Fax: +852 8765 4321</Text>
                      <Text style={styles.paragraph}>Email:confusion@food.net</Text>
                  </Card>
                </Animatable.View>
            </ScrollView>
            </View>
        );
    }
}
// Hii haikua ya lazima kwenye quiz1 ni kwa ajili ya kujifunzia tuu.

/** <<Text>> zote zenye style pamoja na <<VIEW>> 
 * havikua viki hitajika kwenye quiz1
 * ni kwa ajili ya kujifunzia tuu.
 */
const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      paddingTop: 30,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    paragraph: {
      paddingTop: 5,
    },
  });

export default Contact;