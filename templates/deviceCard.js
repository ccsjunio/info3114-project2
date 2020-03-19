function buildDeviceCard(device){
    return `<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 card-col">
        <div class="card" namespace="${device.namespace}">
            <div class="card-body">
                <h5 class="card-title">${device.title}</h5>
                <p class="card-text">
                    <div class="card device-contents">

                    </div><!-- end of card -->
                </p>
                <div class="row action-buttons action-buttons-navigation">
                    <div class="col">
                        <a href="#" class="btn btn-primary">previous</a>
                    </div><!-- endo of col -->
                    <div class="col">
                        <a href="#" class="btn btn-primary">next</a>
                    </div><!-- endo of col -->
                </div><!-- end of row -->
                <div class="row action-buttons action-buttons-data">
                    <div class="col">
                        <a href="#" class="btn btn-success">new</a>
                    </div><!-- endo of col -->
                    <div class="col">
                        <a href="#" class="btn btn-warning">update</a>
                    </div><!-- endo of col -->
                    <div class="col">
                        <a href="#" class="btn btn-danger">delete</a>
                    </div><!-- endo of col -->
                </div><!-- end of row -->
            </div><!-- end of card body -->
        </div><!-- end of card -->
    </div><!-- end of col -->
    `
}

export {buildDeviceCard};