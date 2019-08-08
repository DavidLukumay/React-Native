import React, {Component} from 'react';
import { LEADERS } from '../shared/leaders';
import { Card,ListItem } from 'react-native-elements';
import { Text,FlatList,ScrollView,View } from 'react-native';

function History(){
    return(
        <Card title="Our History" titleStyle={{fontWeight: 'bold'}}>
            <Text>
                Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong.
                With its unique brand of world fusion cuisine that can be found nowhere else,
                it enjoys patronage from the A-list clientele in Hong Kong.
                Featuring four of the best three-star Michelin chefs in the world,
                you never know what will arrive on your plate the next time you visit us.
                {'\n\n'}
                The restaurant traces its humble beginnings to The Frying Pan,
                a successful chain started by our CEO, Mr. Peter Pan,
                that featured for the first time the world's best cuisines in a pan.
            </Text>
        </Card>
    );
}

function LeadersCard(props){
    const leaders = props.leaders;

    if(leaders != null){
    const renderLeaders = ({item, index}) => {

            return (
                <ListItem
                    key={index}
                    title={item.name}
                    titleStyle={{fontWeight: 'bold'}}
                    subtitle={item.description}
                    subtitleStyle={{color: '#1B2631'}}
                    hideChevron={true}
                    leftAvatar={{ source: require('./images/alberto.png')}}
                />
            );
        };
            return (
                <Card title='Corporate Leadership'>
                <FlatList 
                    data={leaders}
                    renderItem={renderLeaders}
                    keyExtractor={item => item.id.toString()}
                />
                </Card>  
            );
    }

    else{
        return(
            <View></View>
        );
    }
}

class About extends Component {
    constructor(props){
        super(props);

        this.state = {
            leaders: LEADERS
        };
    }

    static navigationOptions = {
        title: 'About Us'
    };

    render(){
        return(
           <View>
                <ScrollView>
                    <History />
                    <LeadersCard leaders={this.state.leaders} />
                </ScrollView>
           </View>
        );
    }

}

export default About;