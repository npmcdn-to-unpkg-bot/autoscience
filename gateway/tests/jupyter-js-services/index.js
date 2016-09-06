
require(['jquery', 'jupyter-js-services'], function ($, services) {
  'use strict';
  var startNewKernel = services.startNewKernel;

  var kernelOptions = {
    name: 'python',
  };

  // start a single kernel for the page
  startNewKernel(kernelOptions).then(function (kernel) {
    console.log('Kernel started:', kernel);

    kernel.kernelInfo().then(function (reply) {
      var content = reply.content;
      console.log('Kernel info:', content);
    })

    window.execute_code = function(code) {

        $(".execute_code").prop("disabled", true)
        var future = kernel.execute({ code: code });

        future.onIOPub = function (msg) {
            console.log(msg);
            console.log(msg.header.msg_type);
            console.log(msg.content);

            if(msg.header.msg_type == 'display_data') {
                var image_data = 'data:image/png;base64,' + msg.content.data["image/png"];
                $('#output').append($('<img>').attr('src', image_data));
            }
        };

        future.onReply = function (reply) {
            // console.log('Got execute reply');
        };

        future.onDone = function () {
            // console.log('Future is fulfilled');

            $(".execute_code").prop("disabled", false)
        };
    }

      $(".execute_code").on('click', function() {
            window.execute_code($(this).data("code"));
      });
  });
});
