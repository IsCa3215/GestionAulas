import { create } from "zustand";
import { cardEntity } from "../entities/cardEntity";
import { UserEntity, UserEntityLogin } from "../entities/userEntity";
import { getEventsConnection, joinEvent, newEvent, userEvents } from "../services/connection";


interface eventStore {
    userEvents: cardEntity[];
    getEvents: () => Promise<cardEntity>;
    getUserEvents: (user: UserEntityLogin) => Promise<cardEntity>
    addEvent: (card: cardEntity) => Promise<cardEntity>;
    joinEventt: (id: number, user: UserEntity) => void;
}

const eventStore = create<eventStore>((set, get) => ({
    async getEvents() {
        return await getEventsConnection();
    },
    async addEvent(card: cardEntity){
        return await newEvent(card);
    },
    async joinEventt(id: number, user: UserEntity){
        await joinEvent(id, user);
    },
    async getUserEvents(user: UserEntityLogin) {
        const eventoUsuario = await userEvents(user);
    },
}))