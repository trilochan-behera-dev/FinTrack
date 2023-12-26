import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

export const getMonth = () => {
    return [
        { id: 1, name: "January" },
        { id: 2, name: "February" },
        { id: 3, name: "March" },
        { id: 4, name: "April" },
        { id: 5, name: "May" },
        { id: 6, name: "June" },
        { id: 7, name: "July" },
        { id: 8, name: "August" },
        { id: 9, name: "September" },
        { id: 10, name: "October" },
        { id: 11, name: "November" },
        { id: 12, name: "December" }
    ];
}

export const getYear = () => {
    const presentYear = moment().year();
    return Array.from({ length: 3 }, (_, index) => presentYear - 2 + index);
}

export const getSampleArray = (length: number) => {
    const sampleArray = Array.from({ length: length }, () => 0);
    return sampleArray;
}

export const getDateArray = (month = moment().month() + 1, year = moment().year()) => {
    var dateArray = [];
    for (var i = 1; i <= moment(month ? month : "01", "MM").daysInMonth(); i++) {
        dateArray.push(i < 10 ? "0" + i.toString() : i.toString());
    }
    if (((0 == year % 4 && 0 != year % 100) || 0 == year % 400) && dateArray.length == 28) {
        dateArray.push("29");
    }

    return dateArray
}


export const getDataFromAPI = async (request: string, endPoint: string, data: any = null) => {
    try {
        const url = process.env.NEXT_PUBLIC_BACKEND_URL;
        const localStorageData = localStorage.getItem('login-user');
        const { token } = localStorageData ? JSON.parse(localStorageData) : "";
        let headers;
        // If the token exists, set it in the request header
        if (token) {
            headers = {
                'Authorization': `Bearer ${token}`,
            };
        }

        let response: any;
        const res = {
            status: false,
            message: 'Invalid request',
            data: []
        }
        if (request === "get") {
            if (data) {
                response = await axios.get(`${url}/${endPoint}`, { params: data, headers });
            } else {
                response = await axios.get(`${url}/${endPoint}`, { headers });
            }
        } else if (request === "post") {
            response = await axios.post(`${url}/${endPoint}`, data, { headers })
        } else if (request === "put") {
            response = await axios.put(`${url}/${endPoint}`, data, { headers })
        } else if (request === "patch") {
            response = await axios.patch(`${url}/${endPoint}`, data, { headers })
        } else if (request === "delete") {
            response = await axios.delete(`${url}/${endPoint}`, { headers })
        } else {
            return res
        }
        return {
            status: true,
            message: response?.data.message,
            data: response?.data.data || []
        }
    } catch (error: any) {
        return {
            status: false,
            message: error?.response?.data?.message,
            data: []
        }
    }

}

export const GetDeviceType = () => {
    const [DeviceType, setDeviceType] = useState(window?.innerWidth < 768 ? "Mobile" : window?.innerWidth < 1280 ? "Tablet" : "Desktop")

    useEffect(() => {
        const handleResize = () => {
            if (window?.innerWidth < 768) {
                setDeviceType("Mobile");
            } else if (window?.innerWidth < 1280) {
                setDeviceType("Tablet");
            } else {
                setDeviceType("Desktop");
            }
        };
    
        // Initial call to set the device type based on the initial window size
        handleResize();
    
        window.addEventListener('resize', handleResize);
    
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return DeviceType
}