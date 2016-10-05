SystemJS.config({
    transpiler: 'plugin-babel',

    map: {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',        
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',        
        'jquery': './bower_components/jquery/dist/jquery.js',
        'sammy': './bower_components/sammy/lib/sammy.js',
        'handlebars': './bower_components/handlebars/handlebars.js',
        'main': './js/sammyApp.js',
        'getTemplates': './js/utils/getTemplates.js',
        'userControllers': './js/controllers/userControllers.js',       
        'requester': './js/utils/requester.js',      
        'data': './js/data.js',
        'toastr': './bower_components/toastr/toastr.js',
    }
});

System.import('main');