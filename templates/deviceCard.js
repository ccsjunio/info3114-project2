// this function builds the markup for
// the skeleton of the namespace that will
// contain the markups of the devices

function buildDeviceCard(namespace){
    return `<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 card-col">
        <div class="card namespace-container" namespace="${namespace.name}">
            <div class="card-body">
                <h5 class="card-title">${namespace.title}</h5>
                <p class="card-text">
                    <div class="card device-contents" namespace="${namespace.name}" >

                    </div><!-- end of card -->
                </p>
                <div class="row action-buttons action-buttons-navigation" namespace="${namespace.name}" visibleDeviceIndex="0">
                    <div class="col">
                        <button class="btn btn-primary previousDeviceButton" namespace="${namespace.name}">previous</button>
                    </div><!-- endo of col -->
                    <div class="col">
                        <button class="btn btn-primary nextDeviceButton" namespace="${namespace.name}">next</button>
                    </div><!-- endo of col -->
                </div><!-- end of row -->
                <div class="row action-buttons action-buttons-data">
                    <div class="col">
                        <button href="#" class="btn btn-success newDeviceButton" namespace="${namespace.name}">new</button>
                    </div><!-- endo of col -->
                    <div class="col">
                        <button href="#" class="btn btn-warning updateDeviceButton" namespace="${namespace.name}">update</button>
                    </div><!-- endo of col -->
                    <div class="col">
                        <button href="#" class="btn btn-danger deleteDeviceButton" namespace="${namespace.name}">delete</button>
                    </div><!-- endo of col -->
                </div><!-- end of row -->
            </div><!-- end of card body -->
        </div><!-- end of card -->
    </div><!-- end of col -->
    `
}

export { buildDeviceCard };