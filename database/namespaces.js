let  namespaces = localStorage.getItem("namespaces") ? JSON.parse(localStorage.getItem("namespaces")) : [
        {
            name:"videoDevice",
            title:"Video Device",
            backgroundColor:"purple"
        },
        {
            name:"hardDisk",
            title:"Hard Disk",
            backgroundColor:"blue"
        },
        {
            name:"ssd",
            title:"SSD",
            backgroundColor:"red"
        }
    ];


export { namespaces }
