let  namespaces = localStorage.getItem("namespaces") ? JSON.parse(localStorage.getItem("namespaces")) : [
        {
            name:"videoDevice",
            title:"Video Device"
        },
        {
            name:"hardDisk",
            title:"Hard Disk"
        },
        {
            name:"ssd",
            title:"SSD"
        }
    ];


export { namespaces }
