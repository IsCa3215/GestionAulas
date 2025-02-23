import { ScrollView, Text} from "react-native";
import eventStore from "../store/eventStore"
import { Button, Card } from "react-native-paper";
import useStore from "../store/userStore";
import { useState } from "react";



export const EventScreen: React.FC = () => {
    const { getEvents, globalEvents, joinEventStore: joinEventt, userEvents } = eventStore();
    const { user } = useStore();
    const [isEnabled, setEnabled] = useState(false);
    if (globalEvents == null)
        getEvents();

    return (
        <ScrollView>
        {globalEvents.map((event, index) => (
            <Card key={index} style={{ margin: 10 }}>
              <Card.Title title={event.title} subtitle={event.grade} style={{ backgroundColor: 'grey', borderTopLeftRadius: 14, borderTopRightRadius: 14}}></Card.Title>
              <Text style={{fontSize: 18, padding: 10}}>{event.description}</Text>
              <Card.Cover source={{ uri: `${event.image}`}}></Card.Cover>
              <Card.Actions>
                <Button onPress={async () => {if(user) joinEventt(event, user); console.log(event)}}>Unirse</Button>
              </Card.Actions>
            </Card>
          ))}
          </ScrollView>
    )
}