import AsyncStorage from '@react-native-community/async-storage';

export default class LocalSetting {
    get settingKey() {
        return 'localSetting';
    }

    async save() {
        const jsonString = JSON.stringify(this);
        await AsyncStorage.setItem(this.settingKey, jsonString);
    }

    async load() {
        const jsonString = await AsyncStorage.getItem(this.settingKey);
        const jsonObject = jsonString ? JSON.parse(jsonString) : {};
        Object.assign(this, jsonObject);
    }
}
