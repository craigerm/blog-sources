$(function() {
  var url = 'https://docs.google.com/forms/d/1I1UfuYYeARjchJoX74gHQv4hEO50LuAQs_pkDQJBk4Y/formResponse';

  var map = {
    name: 'entry.332890845',
    email: 'entry.1568442043',
    subject: 'entry.732406790',
    message: 'entry.958745593'
  };

  $('#cf button').click(function() {
    var f = $('#cf');
    var inputs = f.find('input,textarea');
    f.find('.error').hide();

    var valid = true;
    var data = {};

    inputs.each(function() {
      var self = $(this);
      var value = $.trim(self.val());
      if(value == '') {
        console.log('SETTING TO FALSE!');
        self.siblings('.error').show();
        valid = false;
      }
      var name = map[self.attr('name')];
      data[name] = self.val();
    });

    if(valid) {

      try{
        $.ajax({
          url: url,
          method: 'POST',
          dataType: 'jsonp',
          crossDomain: true,
          data: data
        });
      } catch(e) {
        console.log(e);
      }
      f.hide();
      $('#cfFin').fadeIn();
    }
  });
});
