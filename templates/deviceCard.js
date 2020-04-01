function buildDeviceCard(namespace){
    return `<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 card-col">
        <div class="card" namespace="${namespace.name}">
            <div class="card-body">
                <h5 class="card-title">${namespace.title}</h5>
                <p class="card-text">
                    <div class="card device-contents" namespace="${namespace.name}" >

                    </div><!-- end of card -->
                </p>
                <div class="row action-buttons action-buttons-navigation" namespace="${namespace.name}" visibleDeviceIndex="0">
                    <div class="col">
                        <a href="#" class="btn btn-primary previousDeviceButton" namespace="${namespace.name}">previous</a>
                    </div><!-- endo of col -->
                    <div class="col">
                        <a href="#" class="btn btn-primary nextDeviceButton" namespace="${namespace.name}">next</a>
                    </div><!-- endo of col -->
                </div><!-- end of row -->
                <div class="row action-buttons action-buttons-data">
                    <div class="col">
                        <a href="#" class="btn btn-success newDeviceButton" namespace="${namespace.name}">new</a>
                    </div><!-- endo of col -->
                    <div class="col">
                        <a href="#" class="btn btn-warning updateDeviceButton" namespace="${namespace.name}">update</a>
                    </div><!-- endo of col -->
                    <div class="col">
                        <a href="#" class="btn btn-danger deleteDeviceButton" namespace="${namespace.name}">delete</a>
                    </div><!-- endo of col -->
                </div><!-- end of row -->
            </div><!-- end of card body -->
        </div><!-- end of card -->
    </div><!-- end of col -->
    `
}

export {buildDeviceCard};