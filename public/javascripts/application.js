$(function  () {
  var adjustment
  
  $("ol.simple_with_animation").sortable({
    group: 'simple_with_animation',
    handle: 'i.icon-move',
    //pullPlaceholder: false,
    // animation on drop
    onDrop: function  (item, targetContainer, _super) {
      var clonedItem = $('<li/>').css({height: 0})
      item.before(clonedItem)
      clonedItem.animate({'height': item.height()})
      
      item.animate(clonedItem.position(), function  () {
        clonedItem.detach()
        _super(item)
      })
    },
  
    // set item relative to cursor position
    onDragStart: function ($item, container, _super) {
      var offset = $item.offset(),
      pointer = container.rootGroup.pointer
  
      adjustment = {
        left: pointer.left - offset.left,
        top: pointer.top - offset.top
      }
  
      _super($item, container)
    },
    onDrag: function ($item, position) {
      $item.css({
        left: position.left - adjustment.left,
        top: position.top - adjustment.top
      })
    }
  });


  function readURL(input) {
  
      if (input.files && input.files[0]) {
          var reader = new FileReader();
          input_node = input;
  
          reader.onload = function (e) {
              $($(input_node).closest("li").find("form")).addClass("hidden");
              $($(input_node).closest("li").find("div.pic-preview")).removeClass("hidden");
              $($(input_node).closest("li").find("img")).attr('src', e.target.result);
          }
  
          reader.readAsDataURL(input.files[0]);
      }
  }
  
  $(".imgInp").change(function(){
      readURL(this);
  });
  
  $(".attach-pic").click(function(){
      $($(this).closest("li").find("form")).removeClass("hidden");
  });
  
  
  $('.editable-title').editable({
    type:  'text',
  });

  $('.editable-date').editable({
    type:  'date',
    placement: 'right',
  });

  $('.editable-select').editable({
    type:  'select',
    value: 1,    
    source: [
              {value: 1, text: 'Congestive Heart Failure'},
              {value: 2, text: 'COPD'},
              {value: 3, text: 'Dimensia'}
           ],
    placement: 'right',
  });

  $('a#new-task').click( function() {
    $('#popover_content_wrapper').show(350);
  });

  $('button#new-task-submit').click( function() {
    $('#popover_content_wrapper').hide(350);
    var clone = $($('ol.task_group_in li')[0]).clone();
    clone.find('span').text($(':input','.form-inline').not(':button, :submit, :reset, :hidden').val());
    $('ol.task_group_in').prepend(clone);
    $(':input','.form-inline')
    .not(':button, :submit, :reset, :hidden')
    .val('')
    .removeAttr('checked')
    .removeAttr('selected');
  });

  $('button#new-task-cancel').click( function() {
    $('#popover_content_wrapper').hide(350);
    $(':input','.form-inline')
    .not(':button, :submit, :reset, :hidden')
    .val('')
    .removeAttr('checked')
    .removeAttr('selected');
  });

    $('#popover_content_wrapper').hide();
})
