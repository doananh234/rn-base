import { useState } from 'react';

export const useSwitch = initValue => {
    const [onOff, setOnOff] = useState(initValue);
    const setOn = () => {
        setOnOff(true);
    };
    const setOff = () => {
        setOnOff(false);
    };
    return [onOff, setOn, setOff, setOnOff];
};
