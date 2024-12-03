import * as Device from 'expo-device';
import * as Localization from 'expo-localization';
import * as Speech from 'expo-speech';

let selectedVoice: string | undefined
const setSelectedVoice = (str: string | undefined) => {
    selectedVoice = str;
}
let thingToSay: string="";
let hasChanged = false;
let hasStarted = false;
let isSpeaking: boolean = false;
const setIsSpeaking = (value: boolean) => {
    isSpeaking = value;
}
let isPaused;
const setIsPaused = (value: boolean) => {
    isPaused = value
}
let vozes: Speech.Voice[]
const setVozes = (voice: Speech.Voice[]) => {
    vozes = voice;
}
let deviceLanguage: string
const setDeviceLanguage = (lang: string) => {
    deviceLanguage = lang
}
let velocidade: number = 1;
const setVelocidade = (n: number) => {
    velocidade = n;
}
let pitch: number = 1;
const setPitch = (n: number) => {
    pitch = n;
}
let loading: boolean = true
const setLoading = (value: boolean) => {
    loading = value;
}
let deviceType: string | null
const setDeviceType = (device: string | null) => {
    deviceType = device;
}

const changeTheVoice = (itemValue: string) => {
    setSelectedVoice(itemValue);
    if (selectedVoice) {
        console.log("Changing voice to " + itemValue);
        setIsSpeaking(true);
        Speech.speak(thingToSay, {
            voice: itemValue.toString(),
            onDone: () => setIsSpeaking(false),
            onStopped: () => setIsSpeaking(false),
            rate: velocidade,
            pitch: pitch
        });
    }
}
const AddTextToSay = (text: string) => {
    if (!hasStarted) {
        initSpeech().then(() => { hasStarted = true; AddTextToSay(text) });
    } else {
        if (hasChanged) {
            thingToSay = text;
        } else {
            thingToSay += " " + text
        }
    }
}
const getThingToSay = () => {
    return thingToSay;
}
const setThingToSay = (text: string) => {
    if (!hasStarted) {
        initSpeech().then(() => { hasStarted = true; });
    }
    thingToSay = text;
}

const speak = async () => {
    if(isSpeaking===false){
        if (!hasStarted) {
            initSpeech().then(() => hasStarted = true);
        }
        setIsSpeaking(true);
        Speech.speak(thingToSay, {
            voice: selectedVoice,
            onDone: () => setIsSpeaking(false),
            onStopped: () => setIsSpeaking(false),
            rate: velocidade,
            pitch: pitch
        });
    }
};

const initSpeech = async () => {
    definingVoice().then(() => definindoVozes()).then(()=>hasStarted=true)
}
const definingVoice = async () => {
    setDeviceLanguage(Localization.getLocales()[0].languageTag);
    setDeviceType(Device.osName);
};

const definindoVozes = async () => {
    const voices = await Speech.getAvailableVoicesAsync().then((voices) => {
        setVozes(voices)
    }).then(() => {
        const selected = vozes.find((vozes) => 
            vozes.name.toLowerCase().includes(deviceLanguage.toLowerCase()) && 
            !vozes.name.toLowerCase().includes('network')
        )?.identifier;
        setSelectedVoice(selected ? selected : undefined);
        setLoading(false);
    }).catch((error) => { alert('Erro ao pegar as vozes disponíveis: ' + error) });;
};


const stopSpeaking = () => {
    Speech.stop();
    setIsSpeaking(false);
};

const pauseSpeaking = () => {
    if (deviceType === 'Android') {
        console.log("Ação não disponível para o seu dispositivo")
    } else {
        setIsPaused(true)
        Speech.pause();
    }
}

const resumeSpeaking = () => {
    if (deviceType === 'Android') {
        console.log("Ação não disponível para o seu dispositivo")
    } else {
        setIsPaused(false)
        Speech.resume();
    }
}
export {
    AddTextToSay,
    changeTheVoice,
    getThingToSay, initSpeech, isPaused,
    isSpeaking,
    pauseSpeaking,
    pitch,
    resumeSpeaking,
    setPitch,
    setThingToSay,
    setVelocidade,
    speak,
    stopSpeaking,
    thingToSay,
    velocidade,
    vozes
};

