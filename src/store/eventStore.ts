import { create } from "zustand";
import { cardEntity } from "../entities/cardEntity";
import { UserEntity, UserEntityLogin } from "../entities/userEntity";
import { getEventsConnection, joinEvent, newEvent, userEvents } from "../services/connection";


interface eventStore {
    userEvents: cardEntity[];
    globalEvents: cardEntity[];
    getEvents: () => Promise<cardEntity[]>;
    getUserEvents: (user: UserEntityLogin) => Promise<cardEntity[]>
    addEvent: (card: cardEntity) => Promise<cardEntity>;
    joinEventt: (card: cardEntity, user: UserEntity) => void;
}

const eventStore = create<eventStore>((set, get) => ({
    userEvents: [],
    globalEvents: [],
    async getEvents() {
        const globalEventos = await getEventsConnection();
        set({ globalEvents: Array.isArray(globalEventos) ? globalEventos: [globalEventos]})
        console.log(this.globalEvents)
        return get().globalEvents;
    },
    async addEvent(card: cardEntity){
        return await newEvent(card);
    },
    async joinEventt(card: cardEntity, user: UserEntity){
        await joinEvent(card, user);
        const events = await userEvents({ email: user.email, password: user.token });
        set({ userEvents: Array.isArray(events) ? events : [events] });
    },
    async getUserEvents(user: UserEntityLogin): Promise<cardEntity[]> {
        const eventoUsuario: cardEntity | cardEntity[] = await userEvents(user);
        set({ userEvents: Array.isArray(eventoUsuario) ? eventoUsuario : [eventoUsuario] });
        return get().userEvents;
    },
}));
export default eventStore;