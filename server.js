'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT || 8000
    });

    server.route([{
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'I am Hapi 1.0! name:'+process.env.NAME;
        }
    },
    {
        method: 'POST',
        path: '/redirect',
        handler: (request, h) => {
            return 'I am Hapi Redirect 1.0!';
        }
    },
    {
        method: 'POST',
        path: '/data',
        handler: async (request, h) => {
            const data = await checkMyNewMethod(request.payload);
            return `I am Hapi 2.0! ${JSON.stringify(data)}`;
        }
    }]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

const checkMyNewMethod = async (payload) => {
    const x = payload.x ? payload.x : 1;
    return new Promise((resolve) => {
        let count = 0;
        const intervalObject = setInterval(function () {
            count++;
            console.log(count, 'seconds passed'); 
            if (count == x) {
                console.log('exiting');
                clearInterval(intervalObject);
                resolve(payload)
            }
        }, 1000);
    });
}

init();