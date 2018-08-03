// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

function runcmd(cmd, args, res_callback){
	console.log("run..." + cmd + " " + args);
	var spawn = require('child_process').spawn;
	var child = spawn(cmd, args , {
	  shell: true
	});
	child.stderr.on('data', function (data) {
	  //console.error("STDERR:", data.toString());
	  res_callback(data.toString(), true)
	});
	child.stdout.on('data', function (data) {
	  //console.log("STDOUT:", data.toString());
	  res_callback(data.toString(), false);
	});
	child.on('exit', function (exitCode) {
	  console.log("Child exited with code: " + exitCode);
	});
}
