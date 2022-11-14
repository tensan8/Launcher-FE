import * as React from 'react'
import axios from 'axios'

function BookingTableForm(){
    
    const Send = async(data: any) =>{
        const body = {
            content: "Message Received",
            tts: false,
            color: 'white',
            embeds:[
                {
                    title: 'Booking Form',
                    description: data
                },
            ],
        };

        try{
            const data = await axios.post(
                "https://discord.com/api/webhooks/1041017207863382098/6b1QNGyQa_VH91U5KZH15j67pzEZf89WPET5llbHh0oIZJe2hgI5fyU_kreVcWuYDORt",
                body
            );
            console.log(data);
        }catch (error){
            console.error(error);
        }
    };

    return{
        Send,
    }
}

export default BookingTableForm;