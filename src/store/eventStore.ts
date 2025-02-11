import { create } from "zustand";
import { cardEntity } from "../entities/cardEntity";
import { UserEntity, UserEntityLogin } from "../entities/userEntity";
import { getEventsConnection, joinEvent, newEvent, userEvents } from "../services/connection";


interface eventStore {
    userEvents: cardEntity[];
    getEvents: () => Promise<cardEntity[]>;
    getUserEvents: (user: UserEntityLogin) => Promise<cardEntity[]>
    addEvent: (card: cardEntity) => Promise<cardEntity>;
    joinEventt: (id: String, user: UserEntity) => void;
}

const eventStore = create<eventStore>((set, get) => ({
    userEvents: [],
    async getEvents() {
        return await getEventsConnection();
    },
    async addEvent(card: cardEntity){
        return await newEvent(card);
    },
    async joinEventt(id: String, user: UserEntity){
        await joinEvent(id, user);
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