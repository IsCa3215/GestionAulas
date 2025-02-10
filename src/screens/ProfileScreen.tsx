import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStore from "../store/userStore";


const ProfileScreen: React.FC = () => {
    const {user} = useStore();

    const ProfileItem = ({ label, value }: { label: string; value: string | number }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Profile</Text>
                </View>
                <View style={styles.content}>
                    <ProfileItem label="Name" value={user?.name ?? ''} />
                    <ProfileItem label="Age" value={user?.age ?? ''} />
                    <ProfileItem label="Email" value={user?.email ?? ''} />
                    <ProfileItem label="Course" value={user?.course ?? ''} />
                    <ProfileItem label="Grade" value={user?.grade ?? ''} />
                    <ProfileItem label="Module" value={user?.module ?? ''} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    content: {
        padding: 20,
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
});

export default ProfileScreen;