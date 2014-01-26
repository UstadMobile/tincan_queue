module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), // the package file to use
 
        qunit: {
            all: {
                options: {
                    urls: ['tests/tincan_queue_tests.html'],
                    timeout: 120000
                }
            } 
        }
    });
    // load up your plugins
    grunt.loadNpmTasks('grunt-contrib-qunit');
  
    // register one or more task lists (you should ALWAYS have a "default" task list)
    grunt.registerTask('default', ['qunit']);
};