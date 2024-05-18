import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
     
      if (status !== 'granted') {
        return;
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails],
      });

      if (data.length > 0) {
        const contact = data[0];
        console.log(contact);
      }

      const contact = {
        [Contacts.Fields.FirstName]: 'Problematic',
        [Contacts.Fields.LastName]: 'Contact',
        [Contacts.Fields.Company]: 'Young Money',
        [Contacts.Fields.PhoneNumbers]: [{
          label: Contacts.Fields.PhoneNumbers,
          number: '0123456789',
        }],
        [Contacts.Fields.Department]: 'Engineering',
      };
      const contactId = await Contacts.addContactAsync(contact); 

      // This line will crash the app with `CNPropertyNotFetchedException` on iOS
      const { crashData } = await Contacts.getContactByIdAsync(contactId);
      console.log(crashData);

    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Contacts Module Example</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});