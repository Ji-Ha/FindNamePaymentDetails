function view() {
    console.log('request handler called --> view');
}

function create() {
    console.log('request handler called --> create');
}

var handle = {};

handle['/'] = view;
handle['/view'] = view;
handle['/create'] = create;

exports.handle = handle;